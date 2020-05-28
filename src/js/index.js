import '../pages/index/index.css';
import {
  NEWS_API_KEY,
  NEWS_LAZY_LOAD,
  NEWS_PERIOD,
  URL_NOT_FOUND_IMAGE,
  MAIN_API_BASE_URL,
  MAIN_API_BASE_URL_DEV
} from '../js/config/main.js';
import { apiBaseUrl } from '../js/api/api.js';
import { getElement, getRusFormatDate, getShortDate } from '../js/utils/utils';
import { getCookie, setCookie, deleteCookie } from '../js/utils/cookies';

import { NewsApi } from '../js/api/newsapi.js';
import { MainApi } from '../js/api/mainapi';
import { Header } from '../js/components/header';
import { NewsCard } from '../js/components/newsCard';
import { NewsCardList } from '../js/components/newsCardList';
import { BaseComponent } from '../js/components/basecomponent';

//document.addEventListener('DOMContentLoaded', () => {
//  console.log('DOMContentLoaded')
//});

const header = new Header({
  menuSignin : getElement('#menuSignin'),
  menuAutorized: getElement('#menuAutorized'),
  menuUserProfile: getElement('#menuUserProfile'),
  menuLogout: getElement('#menuLogout'),
});

const news = new NewsApi(NEWS_API_KEY);

const newsCardList = new NewsCardList({
  nameCardList:'.search-results__items',
  nameLoader:'.news-preloader',
  nameShowMore:'.show-more',
  nameNotFound:'.news-not-found',
  newsLazyLoad: NEWS_LAZY_LOAD,
  notFoundImageUrl: URL_NOT_FOUND_IMAGE,
});

// Вынести функции в CardList класс
// TODO@ CardListRefactor -> start
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
// TODO@ CardListRefactor <- end

// Проверить если не dev, то поставить MAIN_API_BASE_URL
const mainApi = new MainApi({ baseUrl: MAIN_API_BASE_URL_DEV });

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
        console.log('err2',err);
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
  console.log('EE',event);
});
