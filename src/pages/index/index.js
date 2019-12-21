
import './index.css';

function getElement(selector) {
  return document.querySelector(selector);
}

const menu = getElement('#popup-active');
const popup = getElement('#modal-popup');
const popup_close = getElement('#popup__close');

menu.addEventListener('click', () => {
  if (popup.style.display == 'none') {
    popup.style.display = 'flex';
  } else {
    popup.style.display = 'none';
  }
});

popup_close.addEventListener('click', () => {
  popup.style.display = 'none';
});


/*
import {Api, apiBaseUrl, apiToken, myOwnerId} from "./scripts/api.js";
import {getElement, resetError, handleValidate, activateError, validate, submitButtonStatus,
    isValidForm, isValidLink} from "./scripts/utils.js";
import {Popup} from "./scripts/popup.js";
import {Card} from "./scripts/card.js";
import {CardList} from "./scripts/cardlist.js";
import {UrerProfile} from "./scripts/user-profile.js";
import {imgPreview} from "./scripts/image-preview.js";

const api = new Api({
  baseUrl: apiBaseUrl,
  headers: {
    authorization: apiToken,
    'Content-Type': 'application/json'
  }
});

const userPopup = new Popup({
  form: document.forms.edit,
  mainContainer: getElement('#edit-profile'),
  openControl: getElement('.user-info__button_edit'),
  openFunction: function() {
    getElement('#edit-profile_name').value = getElement('.user-info__name').textContent;
    getElement('#edit-profile_job').value = getElement('.user-info__job').textContent;
    //TODO 8#: вынести в класс очистку ошибок
    getElement('#error_edit-profile_name').textContent = '';
    getElement('#error_edit-profile_job').textContent = '';
  },
  saveFunction: function(event) {
    if (isValidForm(this.form)) {
      const name = getElement('#edit-profile_name').value;
      const job = getElement('#edit-profile_job').value;
      getElement('.user-info__name').textContent = name;
      getElement('.user-info__job').textContent = job;
      api.setUserInfo(userProfile, name, job, this);
    }
  },
  closeControl: getElement('.popup__close_profile'),
  submitControl: document.forms.edit.querySelector('.button_submit'),
  inputs: [getElement('#edit-profile_name'), getElement('#edit-profile_job')]
});

const userProfile = new UrerProfile(api, apiBaseUrl, apiToken, userPopup);

const cardPopup = new Popup({
  form: document.forms.new,
  mainContainer: getElement('#add-card'),
  openControl: getElement('.user-info__button'),
  openFunction: () => {
      getElement('#error_add-card_name').textContent = '';
      getElement('#error_add-card_link').textContent = '';
      cardPopup.form.reset();
  },
  saveFunction: () =>  {
      const card = {name:cardPopup.form.elements.name.value,
        link:cardPopup.form.elements.link.value};
      api.saveCard(card)
  },
  closeControl: getElement('.popup__close_add-card'),
  submitControl: document.forms.new.querySelector('.button_submit'),
  inputs: [getElement('#add-card_name'), getElement('#add-card_link')],
  cardsContainer: getElement('.places-list')
});

const avatarPopup = new Popup({
  form: document.forms.avatar,
  mainContainer: getElement('#edit-avatar'),
  openControl: getElement('.user-info__photo'),
  openFunction: function() {
    getElement('#avatar_link').value = urlImageToSrc(
      getElement('.user-info__photo').style.backgroundImage);
    getElement('#error_avatar_link').textContent = '';
  },
  saveFunction: function() {
    if (isValidForm(this.form)) {

      api.saveUserAvatar(getElement('#avatar_link').value);

    }
  },
  closeControl: getElement('.popup__close_avatar'),
  submitControl: document.forms.avatar.querySelector('.button_submit'),
  inputs: [getElement('#avatar_link')]
});

*/
