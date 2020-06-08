'use strict';

import {
  NEWS_LAZY_LOAD,
  URL_NOT_FOUND_IMAGE,
  MAIN_API_BASE_URL,
  MAIN_API_BASE_URL_DEV,
  NEWS_API_BASE_URL,
  NEWS_API_KEY,
} from '../js/config/main.js';

import { getElement } from '../js/utils/utils';
import { getCookie, setCookie, deleteCookie } from "../js/utils/cookies";
import { PopupComponent } from './components/popupcomponent';
import { Header } from '../js/components/header';
import { NewsCardList } from '../js/components/newsCardList';
import { MainApi } from '../js/api/mainapi';
import { NewsApi } from '../js/api/newsapi.js';
import { NewsCard } from "../js/components/newsCard";
import { ShowError } from "../js/components/showError";

export { header, newsCardList, mainApi, newsApi, popupSuccessInfo, popupSuccessExit, signup, signin, signout}


const popupError = new ShowError({ 
  errorPopup: getElement('#popupShowModalError'), 
  errorTextElement: getElement('#popupShowModalErrorText') 
});

// Проверить если не dev, то поставить MAIN_API_BASE_URL
const mainApi = new MainApi({ 
  baseUrl: MAIN_API_BASE_URL_DEV,
});

const newsApi = new NewsApi({ 
  newsApiKey: NEWS_API_KEY, 
  newsApiBaseUrl: NEWS_API_BASE_URL,
 });

const header = new Header({
  menuSignin : getElement('#menuSignin'),
  menuAutorized: getElement('#menuAutorized'),
  menuUserProfile: getElement('#menuUserProfile'),
  menuLogout: getElement('#menuLogout'),
  menuSavedNews: getElement('#menuSavedNews'),
  isSavedNewsPage: !getElement('.index-page') ? true : false,
  mainApi: mainApi,
});

const createCard = (...args) => new NewsCard(...args);

const newsCardList = new NewsCardList({
  // TODO Переименовать по цепочке name
  newsCardList: getElement('#newsCardList'),
  newsResultsTitle: getElement('.search-results__title'),
  nameLoader: getElement('.news-preloader'),
  nameShowMore: getElement('.show-more'),
  nameNotFound: getElement('.news-not-found'),
  newsLazyLoad: NEWS_LAZY_LOAD,
  notFoundImageUrl: URL_NOT_FOUND_IMAGE,
  searchButton: getElement('.search__field-button'),
  showMoreButton: getElement('.show-more__button'),
  searchInput: getElement('.search__field-input'),
  newsApi: newsApi,
  mainApi: mainApi,
  containerSavedTitle: getElement('#containerSavedTitle'),
  searchItems: getElement('#searchItems'),
  createCard,
  popupError: popupError,
});

// Пользователь успешно зарегистрирован
const popupSuccessInfo = new PopupComponent({
  menuOpen: getElement('#popupSuccessInfo'),  
  popupElement: getElement('#popupSuccessInfo'), 
  buttonClose: getElement('#popupSuccessClose'), 
  buttonSubmit: null,
  errorElement: null,
  redirectElement: getElement('#popupSuccessRedirect'), 
  redirectAction: function() {
    popupSuccessInfo.popupClose();
    signin.popupOpen();
  },
});

// Вы успешно вышли
const popupSuccessExit = new PopupComponent({
  menuOpen: null,  
  popupElement: getElement('#popupSuccessExit'), 
  buttonClose: getElement('#popupSuccessExitClose'), 
  buttonSubmit: null,
  submitAction: null,
  errorElement: null,
  redirectElement: null
});

// SIGNUP Регистрация нового пользователя
const signup = new PopupComponent({
  menuOpen: null, 
  popupElement: getElement('#popupSignup'), 
  buttonClose: getElement('#buttonSignupClose'), 
  buttonSubmit: getElement('#buttonSignupSubmit'), 
  submitForm: getElement('#popupSignup').querySelector('form'),
  submitAction: function(event) {
    const signupOptions = { 
      'name': getElement('#popupSignupUserName').value,
      'email': getElement('#popupSignupEmail').value,
      'password': getElement('#popupSignupPass').value
    };
    mainApi.signup(signupOptions)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject({message: res.status, res: res});
      })
      .then(result =>  {
        if (result.message){
          this.showErrors(result.message);
        } else {
          if (result._id && result.name  && result.email) {
            // не авторизируем принудительно после регистрации
            // как в задании
            // setCookie('user.name', result.username);
            // setCookie('jwt', result.jwt);
            popupSuccessInfo.popupOpen();
          } else {
            // тут ошибка регистрации т.к. не пришел ключ
          }
          signup.popupClose(event);
        }   
      })
      .catch(function(err) {
        this.showErrors(err);
      })
      .finally(() => {
      });
    return true;
  },
  errorElement: getElement('#popupSignupErrorMessage'),
  redirectElement: getElement('#buttonSignupRedirect'), 
  redirectAction: function() {
    signin.popupOpen();
  }
});

// SIGNIN Авторизация существующего пользователя
const signin = new PopupComponent({
  menuOpen: getElement('#menuSignin'), 
  popupElement: getElement('#popupSignin'), 
  buttonClose: getElement('#buttonSigninClose'), 
  buttonSubmit: getElement('#buttonSigninSubmit'), 
  submitForm: getElement('#popupSignin').querySelector('form'),
  submitAction: function() {
    const signinOptions = { 
      'email': getElement('#popupSigninEmail').value,
      'password': getElement('#popupSigninPass').value
    };
    mainApi.signin(signinOptions)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject({message: res.status, res: res});
      })
      .then(result =>  {
        if (result.message) {
          this.showErrors(result.message);
        } else {
          if (result.username && result.jwt) {
            setCookie('user.name', result.username);
            setCookie('jwt', result.jwt);
            // перерисовываем уже с пользователем
            header.render();
          }
          this.popupClose();   
        }
      })
      .catch((err) => {
        this.showErrors(err);
      })
      .finally(() => {
      });
    return true;
  },
  errorElement: getElement('#popupSigninErrorMessage'),
  redirectElement: getElement('#buttonSigninRedirect'), 
  redirectAction: function() {
    signup.popupOpen();
  }
});

// SIGNOUT Выход
const signout = new PopupComponent({
  menuOpen: getElement('#menuLogout'), 
  popupElement: getElement('#popupSuccessExit'), 
  buttonClose: getElement('#popupSuccessExitClose'), 
  buttonSubmit: null, 
  submitAction: function() {
    mainApi.signout({})
      .then(result =>  {
        if ((result.status == 200)&&(result.ok)) {
          deleteCookie('user.name');
          deleteCookie('jwt');
          header.render();
          popupSuccessExit.popupOpen();
        }
      })
      .catch((err) => {
        console.log('err2',err);
      })
      .finally(() => {
      });
    return true;
  },
  errorElement: null,
  redirectElement: null, 
  redirectAction: null
});

const mobileMenuOpen = getElement('#mobileMemuOpen');
const mobileMenuClose = getElement('#mobileMemuClose');
const headerElement = getElement('.header');
const headerNavElement = getElement('.header__nav');
mobileMenuOpen.addEventListener('click', (event) => {
  headerElement.classList.add('header_mobile');
  headerNavElement.style.display = 'flex';
  mobileMenuOpen.classList.add('hidden');
  mobileMenuClose.classList.remove('hidden');
});

mobileMenuClose.addEventListener('click', (event) => {
  headerElement.classList.remove('header_mobile');
  headerNavElement.style.display = null;
  mobileMenuOpen.classList.remove('hidden');
  mobileMenuClose.classList.add('hidden');
});
