import {
  NEWS_LAZY_LOAD,
  URL_NOT_FOUND_IMAGE,
  MAIN_API_BASE_URL,
  MAIN_API_BASE_URL_DEV,
  NEWS_API_KEY,
  NEWS_PERIOD
} from '../js/config/main.js';

import { getElement, getRusFormatDate, getShortDate } from '../js/utils/utils';
import { getCookie, setCookie, deleteCookie } from "../js/utils/cookies";
import { BaseComponent } from '../js/components/basecomponent';
import { Header } from '../js/components/header';
import { NewsCardList } from '../js/components/newsCardList';
import { MainApi } from '../js/api/mainapi';
import { NewsApi } from '../js/api/newsapi.js';

export { header, newsCardList, mainApi, newsApi, popupSuccessInfo, popupSuccessExit, signup, signin, signout}

// Проверить если не dev, то поставить MAIN_API_BASE_URL
const mainApi = new MainApi({ baseUrl: MAIN_API_BASE_URL_DEV });

const newsApi = new NewsApi(NEWS_API_KEY);

const header = new Header({
  menuSignin : getElement('#menuSignin'),
  menuAutorized: getElement('#menuAutorized'),
  menuUserProfile: getElement('#menuUserProfile'),
  menuLogout: getElement('#menuLogout'),
  menuSavedNews: getElement('#menuSavedNews'),
  containerSavedNews: getElement('#containerSavedNews'),
  mainApi: mainApi
});

const newsCardList = new NewsCardList({
  nameCardList: getElement('.search-results__items'),
  nameLoader: getElement('.news-preloader'),
  nameShowMore: getElement('.show-more'),
  nameNotFound: getElement('.news-not-found'),
  newsLazyLoad: NEWS_LAZY_LOAD,
  notFoundImageUrl: URL_NOT_FOUND_IMAGE,
  searchButton: getElement('.search__field-button'),
  showMoreButton: getElement('.show-more__button'),
  searchInput: getElement('.search__field-input'),
  newsApi: newsApi
});

// Пользователь успешно зарегистрирован
const popupSuccessInfo = new BaseComponent({
  menuOpen: getElement('#popupSuccessInfo'),  
  popupElement: getElement('#popupSuccessInfo'), 
  buttonClose: getElement('#popupSuccessClose'), 
  buttonSubmit: null,
  errorElement: null,
  redirectElement: getElement('#popupSuccessRedirect'), 
  redirectAction: function() {
    this.popupClose();
    signin.popupOpen();
  }
});

// Вы успешно вышли
const popupSuccessExit = new BaseComponent({
  menuOpen: null,  
  popupElement: getElement('#popupSuccessExit'), 
  buttonClose: getElement('#popupSuccessExitClose'), 
  buttonSubmit: null,
  submitAction: null,
  errorElement: null,
  redirectElement: null
});

// SIGNUP Регистрация нового пользователя
const signup = new BaseComponent({
  menuOpen: null, 
  popupElement: getElement('#popupSignup'), 
  buttonClose: getElement('#buttonSignupClose'), 
  buttonSubmit: getElement('#buttonSignupSubmit'), 
  submitAction: function() {
    const signupOptions = { 
      'name': getElement('#popupSignupUserName').value,
      'email': getElement('#popupSignupEmail').value,
      'password': getElement('#popupSignupPass').value
    };
    mainApi.signup(signupOptions)
      .then(response => response.json())
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
  errorElement: getElement('#popupSignupErrorMessage'),
  redirectElement: getElement('#buttonSignupRedirect'), 
  redirectAction: function() {
    signin.popupOpen();
  }
});

// SIGNIN Авторизация существующего пользователя
const signin = new BaseComponent({
  menuOpen: getElement('#menuSignin'), 
  popupElement: getElement('#popupSignin'), 
  buttonClose: getElement('#buttonSigninClose'), 
  buttonSubmit: getElement('#buttonSigninSubmit'), 
  submitAction: function() {
    const signinOptions = { 
      'email': getElement('#popupSignupEmail').value,
      'password': getElement('#popupSignupPass').value
    };
    mainApi.signin(signinOptions)
      .then(response => response.json())
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
        console.log('signin.error',err);
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
const signout = new BaseComponent({
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

// ошибка подгрузки изображения
document.addEventListener('onerror', (event) => {
  console.log('onerror',event);
});
  