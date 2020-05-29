import '../pages/saved-news/saved-news.css';
import { mainApi } from '../js/common';

const testButton = getElement('#test1');
testButton.addEventListener('click', () => {

  //  "date": "2019-11-17T19:03:11.000Z",
  
  let article = {
    "keyword": "2praktikum",
    "title": "2Praktikum test",
    "text": "2Super text test",
    "date": "2019-11-17",
    "link": "http://yandex.ru/picture.ru/2.html",
    "source": "http://yandex.ru",
    "image": "http://yandex.ru/pic1.jpg"
  };
  
  mainApi.saveArticle(article)
  .then(response => response.json())
  .then(result =>  {
    console.log(result);
  })
  .catch((err) => {
    console.log('error',err);
  })
  .finally(() => {
    console.log('fin');
  });

  mainApi.removeArticle('5ed02a59e8013d11a8614ff1')
  .then(response => response.json())
  .then(result =>  {
    console.log(result);
  })
  .catch((err) => {
    console.log('error',err);
  })
  .finally(() => {
    console.log('fin');
  });

});
