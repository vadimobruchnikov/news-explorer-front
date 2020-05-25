import '../pages/index/index.css';
import {
  NEWS_API_KEY,
  NEWS_LAZY_LOAD,
  NEWS_PERIOD,
  URL_NOT_FOUND_IMAGE
} from '../js/config/main.js';
import {apiBaseUrl} from '../js/api/api.js';
import { getElement, getRusFormatDate, getShortDate } from '../js/utils/utils';
import { getCookie, setCookie, deleteCookie } from '../js/utils/cookies';
import { NewsApi } from '../js/api/newsapi.js';

import { NewsCard } from '../js/components/newsCard';
import { NewsCardList } from '../js/components/newsCardList';
import { Header } from '../js/components/header';

//document.addEventListener('DOMContentLoaded', () => {
//  console.log('DOMContentLoaded')
//});
const header = new Header(getElement('.header__nav'));
const news = new NewsApi(NEWS_API_KEY);
const newsCardList = new NewsCardList({
  nameCardList:'.search-results__items',
  nameLoader:'.news-preloader',
  nameShowMore:'.show-more',
  nameNotFound:'.news-not-found',
  newsLazyLoad: NEWS_LAZY_LOAD,
  notFoundImageUrl: URL_NOT_FOUND_IMAGE,
});

const showMoreButton = getElement('.show-more__button');
showMoreButton.addEventListener('click', () => {
  newsCardList.renderResults();
});

const searchButton = getElement('.search__field-button');
searchButton.addEventListener('click', (event) => {

  event.preventDefault();
  event.stopPropagation();

  newsCardList.showResults();
  newsCardList.clearResults();
  newsCardList.showPreloader();
  newsCardList.hideAuthorSection();

  const queryText = getElement('.search__field-input').value;
  // валидация данных

  let dateTo = new Date();
  let dateFrom = new Date();
  dateTo.setDate(dateTo.getDate());
  dateFrom.setDate(dateTo.getDate() - NEWS_PERIOD);

  news.getNews({newsQuery: queryText, dateFrom: getShortDate(dateFrom), dateTo: getShortDate(dateTo)})
  .then(response => response.json())
  .then(result =>  {
    if (result.status == "ok") {
      return  result.articles ? result.articles : false;
    } else {
      return Promise.reject(result.status)
    }
  })
  .then(newsArray => {
    newsCardList.saveResults(newsArray);
    newsCardList.renderResults();
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    newsCardList.hidePreloader();
  });
  
});


const menuPopupSuccess = getElement('#menuPopupSuccess');
const menuPopupEnter = getElement('#menuPopupEnter');
const popupSuccess = getElement('#popupSuccess');
const popupEnter = getElement('#popupEnter');
const popupSuccessClose = getElement('#popupSuccessClose');
const popupEnterClose = getElement('#popupEnterClose');

menuPopupSuccess.addEventListener('click', () => {
  if ((popupSuccess.style.display != 'none')&&(popupSuccess.style.display !== '')) {
    popupSuccess.style.display = 'none';
  } else {
    popupSuccess.style.display = 'flex';
  }
});

menuPopupEnter.addEventListener('click', () => {
  if ((popupEnter.style.display != 'none')&&(popupEnter.style.display !== '')) {
    popupEnter.style.display = 'none';
  } else {
    popupEnter.style.display = 'flex';
  }
});

popupSuccessClose.addEventListener('click', () => {
  popupSuccess.style.display = 'none';
});

popupEnterClose.addEventListener('click', () => {
  popupEnter.style.display = 'none';
});


document.addEventListener('onerror', (event) => {
  console.log('EE',event);
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
