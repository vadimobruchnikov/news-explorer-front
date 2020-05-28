import '../pages/saved-news/saved-news.css';

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