import {encoded, translations} from './data.js';

function decodeData(encoded, translations) {
  // Создаём новый массив декодированных объектов
  const decoded = encoded.map(entry => {
    // Создаём копию текущего объекта
    const decodedEntry = {...entry};
    // Проходим по всем ключам объекта
    for (const key in entry) {
      // Проверяем, что ключ не входит в список исключений и заканчивается на 'Id'
      if (key !== 'groupId' && key !== 'service' && key !== 'formatSize' && key !== 'ca' && key.endsWith('Id')) {
        // Заменяем значение ключа на соответствующее значение из translations
        decodedEntry[key] = translations[entry[key]] || entry[key];
      }
    }
    return decodedEntry;
  });
  return decoded;
}

// Функция для получения списка уникальных id
function getUniqueIds(encoded) {
  // Используем Set для хранения уникальных id
  const ids = new Set();
  // Проходим по каждому объекту в массиве encoded
  encoded.forEach(entry => {
    // Проходим по всем ключам объекта
    for (const key in entry) {
      // Проверяем, что ключ заканчивается на 'Id'
      if (key.endsWith('Id')) {
        // Добавляем значение ключа в Set
        ids.add(entry[key]);
      }
    }
  });
  // Преобразуем Set в массив и возвращаем
  return Array.from(ids);
}

// Декодируем данные
const decoded = decodeData(encoded, translations);
// Получаем уникальные id
const uniqueIds = getUniqueIds(encoded);

// Выводим результаты в консоль
console.log("Let's rock");
console.log(decoded);
console.log(uniqueIds);
