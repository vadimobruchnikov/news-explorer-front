import '../pages/index/index.css';

import {
  NEWS_API_KEY,
  NEWS_PERIOD,
} from '../js/config/main.js';

import { getElement, getRusFormatDate, getShortDate } from '../js/utils/utils';
// import { getCookie, setCookie, deleteCookie } from '../js/utils/cookies';
import { NewsApi } from '../js/api/newsapi.js';
import { 
  // header, 
  newsCardList, 
  // mainApi, 
  // popupSuccessInfo, 
  // popupSuccessExit, 
  // signup, 
  // signin, 
  // signout 
} from '../js/common';

//document.addEventListener('DOMContentLoaded', () => {
//  console.log('DOMContentLoaded')
//});

const news = new NewsApi(NEWS_API_KEY);

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

