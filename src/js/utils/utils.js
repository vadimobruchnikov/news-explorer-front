export {getElement, resetError, handleValidate, activateError, validate, submitButtonStatus,
    isValidForm, isValidLink, getRusFormatDate, getShortDate, getNewsDate, sliceStr, validStr, sortArrayByValue, deleteArrayElementById}
    
function getElement(selector) {
    return document.querySelector(selector);
}

function getRusFormatDate(dateStr) {
  const monthNames = ["января", "февраля", "марта", "апреля", "мая", "июня",
    "июля", "августа", "сентября", "октября", "ноября", "декабря"];
  let dateObj = new Date(dateStr);
  let month = monthNames[dateObj.getMonth()];
  let day = String(dateObj.getDate()).padStart(2, '0');
  let year = dateObj.getFullYear();
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

function validStr(str, minLength, maxLength) {
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
   
function resetError(element) {
    element.parentNode.classList.remove('input-container__invalid');
    element.textContent = '';
}

function handleValidate(event) {
    resetError(event.target);
    isValidForm(event.target.parentNode);
    validate(event.target, true);
}

/**
 * Функция активации ошибки
 * @param {object} element Элемент, на котором вызывается ошибка
 * @param {string} errorMessage Сообщение об ошибке
 * @param {boolean} isShowError Показывать ли сообщение под элементом
 * @returns {void}
 */
function activateError(element, errorMessage, isShowError) {
    element.parentNode.classList.add('input-container__invalid');
    element.textContent = errorMessage;
    if (isShowError) element.style.opacity = 1;
}

/**
 * Проверка элемента на корректность
 * @param {object} element      Элемент 
 * @param {string} isShowError  Показывать ошибки после проверки
 * @returns {boolean} Результат проверки
 */
function validate(element, isShowError) {
    const errorElement = document.querySelector(`#error_${element.id}`);
    errorElement.style.opacity = 0;
    // стандартная проверка
    let trimstr = element.value.trim();
    errorElement.textContent = '';
    // доп. проверка на пробелы
    if ((element.value !== trimstr)&&(!trimstr)) {
      activateError(errorElement, 'Строка не может состоять из одних пробелов', isShowError);
      return false;
    }
    if (!element.checkValidity()||(!trimstr)) {
      activateError(errorElement, element.validationMessage, isShowError);
      return false;
    }
    // доп проверка на ссылку
    if (element.classList.contains('popup__input_type_link-url')) {
      if (!isValidLink(element.value)&&(trimstr)) {
        activateError(errorElement, 'Здесь должна быть ссылка', isShowError);
        return false;
      }
    }
    return true;
}
  
function submitButtonStatus(submitButton, isActive) {
    submitButton.disabled = !isActive; 
    if (isActive) {
        submitButton.classList.add('popup__button_validate');  
    } else {
        submitButton.classList.remove('popup__button_validate'); 
    }
}
  
function isValidForm(form) {
    let isValidForm = true;
    const inputs = Array.from(form.elements);
    const submit = form.querySelector('.button_submit');
    inputs.forEach((elem) => {
      if (elem.id !== submit.id) {
        if (!validate(elem, true)) isValidForm = false;
      }
    });
    submitButtonStatus(submit, isValidForm);
    return isValidForm;
}

function isValidLink(str) {
  const re = /(^https?:\/\/)?[a-z0-9~_\-\.]+\.[a-z]{2,9}(\/|:|\?[!-~]*)?$/i;
  return re.test(str);
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
