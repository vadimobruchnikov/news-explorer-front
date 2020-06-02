import { ErrorValidationMessages } from "../../js/resources/messages";

export { resetError, handleValidate, activateError, validate, submitButtonStatus,
    isValidForm, isValidLink }

/**
 * Основная функция обработки валидации у элемента и у его формы
 * @param {event} event Сообщение, при котором возникает
 */
function handleValidate(event) {
    resetError(event.target);
    isValidForm(event.target.parentNode);
}

/**
 * Функция сброса ошибки у элемента
 * @param {object} element Элемент, на котором сбрасывается
 */
function resetError(element) {
  // element.parentNode.classList.remove('input-container__invalid');
  element.textContent = '';
}

/**
 * Функция активации ошибки
 * @param {object} element Элемент, на котором вызывается ошибка
 * @param {string} errorMessage Сообщение об ошибке
 * @param {boolean} isShowError Показывать ли сообщение под элементом
 * @returns {void}
 */
function activateError(element, errorMessage, isShowError) {
    // element.parentNode.classList.add('input-container__invalid');
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
    if (errorElement) {
      errorElement.style.opacity = 0;
      errorElement.textContent = '';
    }
   
    // отсекаем пробелы с начала и конца строки
    let trimstr = element.value.trim();
    
    // доп. проверка на пустую строку
    if ((element.value !== trimstr)&&(!trimstr)) {
      activateError(errorElement, ErrorValidationMessages.EMPTY_STRING , isShowError);
      return false;
    }
    // вывод кастомных сообщений в зависимости от кода ошибки
    if (!element.checkValidity()||(!trimstr)) {
      let errorMessage = element.validationMessage;
      if (element.validity.typeMismatch) {
        errorMessage = `${ErrorValidationMessages.TYPE_MISMATCH} ${element.type}`;
      } else if (element.validity.valueMissing) {
        errorMessage = ErrorValidationMessages.VALUE_MISSING;
      } else if (element.validity.patternMismatch) {
        errorMessage = ErrorValidationMessages.PATTERN_MISMATCH;
      } else if (element.validity.tooLong) {
        errorMessage = ErrorValidationMessages.STRING_TOO_LONG;
      } else if (element.validity.tooShort) {
        errorMessage = ErrorValidationMessages.STRING_TOO_SHORT;
      } else if (element.validity.badInput) {
        errorMessage = ErrorValidationMessages.BAD_INPUT;
        // console.log(element.validity.patternMismatch);
      }
      if (errorElement) {
        activateError(errorElement, errorMessage, isShowError);
      }
      return false;
    }

    // Дополнительная проверка email
    const regexp = /.{1,}@.{2,}\..{2,}/i;
    if (element.type == "email" && (trimstr.search(regexp) < 0) ) {
      activateError(errorElement, ErrorValidationMessages.INVALID_EMAIL_FORMAT, isShowError);
      return false;
    } 

    // доп проверка ссылки
    if (element.classList.contains('link')) {
      if (!isValidLink(element.value)&&(trimstr)) {
        activateError(errorElement, ErrorValidationMessages.INVALID_LINK_FORMAT, isShowError);
        return false;
      }
    }
    return true;
}
  
/**
 * Выставляем кнопке нужную активность
 * @param {object} submitButton Кнопка 
 * @param {boolean} isActive Выставляемое значение
 */
function submitButtonStatus(submitButton, isActive) {
    submitButton.disabled = !isActive; 
    if (isActive) {
        submitButton.classList.add('popup__button_active');  
    } else {
        submitButton.classList.remove('popup__button_active'); 
    }
}

/**
 * Проверить ссылку на валидность
 * @param {object} form Проверяемая форма 
 */
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
/**
 * Проверить ссылку на валидность
 * @param {string} str Проверяемая строка 
 */
function isValidLink(str) {
  const re = /(^https?:\/\/)?[a-z0-9~_\-\.]+\.[a-z]{2,9}(\/|:|\?[!-~]*)?$/i;
  return re.test(str);
}
