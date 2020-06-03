export { getElement, getRusFormatDate, getShortDate, getNewsDate, sliceStr, clearStr, sortArrayByValue, deleteArrayElementById }
    
function getElement(selector) {
    return document.querySelector(selector);
}

function getRusFormatDate(dateStr) {
  const monthNames = ["января", "февраля", "марта", "апреля", "мая", "июня",
    "июля", "августа", "сентября", "октября", "ноября", "декабря"];
  const dateObj = new Date(dateStr);
  const month = monthNames[dateObj.getMonth()];
  const day = String(dateObj.getDate()).padStart(2, '0');
  const year = dateObj.getFullYear();
  return day + ' ' + month + ', ' + year;
}

function getNewsDate(newsDate, incDays){
  newsDate.setDate(newsDate.getDate() + incDays);
  return getShortDate(newsDate);
}

function getShortDate(dateTime) {
  const year = new Intl.DateTimeFormat('ru', { year: 'numeric' }).format(dateTime);
  const month = new Intl.DateTimeFormat('ru', { month: '2-digit' }).format(dateTime);
  const day = new Intl.DateTimeFormat('ru', { day: '2-digit' }).format(dateTime);
  return `${year}-${month}-${day}`;
}

function sliceStr(str, len) {
  // return str.length < len -2 ? str : str.slice(0, len -2) + '...';
  return str.length <= len ? str : str.slice(0, len);
}

function clearStr(str, minLength, maxLength) {
  str = str.trim();
  str = str.replace(/<ol>/i, '');
  str = str.replace(/<\/ol>/i, '');
  str = str.replace(/<li>/i, '<p>');
  str = str.replace(/<\/li>/i, '</p>');
  
  while (str.length < minLength) {
    str = str + '.';
  }
  return sliceStr(str, maxLength);
}

function urlImageToSrc(url) {
  return url.split('"')[1];
}

function sortArrayByValue(arr, value) {
  // сортируем в обратном порядке
  return arr.sort((a, b) => - a[value] + b[value] );
}

function deleteArrayElementById(array, fieldName, fieldValue) {
  array.forEach( function(element, index){
    if (element[fieldName] == fieldValue) {
      array.splice(index, 1);
      return array;
    }
  });
  return array;
}
