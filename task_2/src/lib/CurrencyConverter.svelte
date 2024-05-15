<script lang="ts">
  import { onMount } from 'svelte';
  import { writable } from 'svelte/store';

  let amountFrom: number = 1;
  let amountTo: number = 1;
  let currencyFrom: string = 'USD';
  let currencyTo: string = 'EUR';
  let rates = writable({});
  let currencies: string[] = [];

  // Функция для получения курсов валют с API
  async function fetchRates() {
    try {
      const response = await fetch('https://open.er-api.com/v6/latest/USD');
      const data = await response.json();
      rates.set(data.rates);
      currencies = Object.keys(data.rates);
      convert();
    } catch (error) {
      console.error('Error fetching exchange rates:', error);
    }
  }

  // Функция для конвртации валют
  function convert() {
    rates.subscribe(r => {
      if (r && r[currencyFrom] && r[currencyTo]) {
        amountTo = (amountFrom * r[currencyTo]) / r[currencyFrom];
      }
    });
  }

  // Инициализация получения курсов при загрузке компонента
  onMount(async () => {
    await fetchRates();
  });
</script>

<style>
  .converter {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 600px;
    margin: auto;
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 8px;
  }

  .row {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
  }

  .row input,
  .row select {
    margin: 0 0.5rem;
  }

  .row label {
    flex: 1;
  }
</style>

<div class="converter">
  <div class="row">
    <label for="amountFrom">Amount:</label>
    <input type="number" id="amountFrom" bind:value={amountFrom} on:input={convert} />
    <select bind:value={currencyFrom} on:change={convert}>
      {#each currencies as currency}
        <option value={currency}>{currency}</option>
      {/each}
    </select>
  </div>
  <div class="row">
    <label for="amountTo">Converted Amount:</label>
    <input type="number" id="amountTo" bind:value={amountTo} on:input={convert} />
    <select bind:value={currencyTo} on:change={convert}>
      {#each currencies as currency}
        <option value={currency}>{currency}</option>
      {/each}
    </select>
  </div>
  <div>
    <a href="https://www.exchangerate-api.com" target="_blank">Rates By Exchange Rate API</a>
  </div>
</div>
