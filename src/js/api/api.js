//import {CardList} from "../old/cardlist";
import {getElement} from "../utils/utils";

console.log('api.js loaded!');

export const apiBaseUrl = NODE_ENV === 'development' ? 'http://praktikum.tk/cohort2' : 'https://praktikum.tk/cohort2';
export const apiToken = 'f173d5ee-a929-4233-8a20-1219b8aad262';
// Получить из кук если есть
export const myOwnerId = 'cd28ded844a4cc32be5a3b35';

export class Api {

  constructor(options) {
    this.apiToken = options.headers.authorization;
    this.baseUrl = options.baseUrl;
    this.cardsContainer = getElement('.places-list');
    this.getInitialCards();
  }

  // Функция получает и перерисовывает карточки с сервера

  getInitialCards() {

    fetch(`${this.baseUrl}/cards`, {
        method: 'GET',
        headers: {
          authorization: this.apiToken,
          'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then((result) => {
      this.initialCards = result;
      this.cardList = new CardList(this.cardsContainer, this.initialCards);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  // Функция получает данные профиля пользователя

  getUserInfo(userProfile, userPopup, apiBaseUrl, apiToken) {
    userPopup.isLoading(true);
    fetch(`${apiBaseUrl}/users/me`, {
      headers: {
        authorization: apiToken,
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((result) => {
      userProfile.name  = result.name;
      userProfile.about = result.about;
      userProfile.avatar = result.avatar;
      userProfile.render();
    })
    .catch((err) => {
      console.log(err);
    });
  }

  // Функция записывает информацию в профиль пользователя на сервере

  setUserInfo(userProfile, name, about, userPopup){
    userPopup.isLoading(true);
    fetch(`${apiBaseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: apiToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((result) => {
      userProfile.name  = result.name;
      userProfile.about = result.about;
      userProfile.render.bind(userProfile);
      userPopup.close();
      userPopup.form.reset();
    })
    .catch((err) => {
      console.log(err);
    });
  }

  // Функция сохраняет аватар на сервере

  saveUserAvatar(avatar) {

    fetch(`${apiBaseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: apiToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: avatar
      })
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((result) => {
      getElement('.user-info__photo').setAttribute('style', `background-image: url(${result.avatar}),url(/images/nophoto.png)`);
      avatarPopup.close();
    })
    .catch((err) => {
      console.log(err);
    });
  }

  // Функция сохраняет данные карточку на сервере

  saveCard(card){
    fetch(`${apiBaseUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: apiToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: card.name,
        link: card.link
      })
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then((result) => {
      api.cardList._addCard(result);
      cardPopup.close();
    })
    .catch((err) => {
      console.log(err);
    });
  }

  // Функция удаляет карточку на сервере

  deleteCard(event){
    const _id = event.target.closest('.place-card').id;
    fetch(`${apiBaseUrl}/cards/${_id}`, {
      method: 'DELETE',
      headers: {
        authorization: apiToken,
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if (res.ok) {
        event.target.closest('.places-list').removeChild(event.target.closest('.place-card'));
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log(err);
    });

  }

  // Функция лайкает/дизлайкает карточку на сервере

  likeCard(event, _id, isLike) {

    return fetch(`${apiBaseUrl}/cards/like/${_id}`, {
      method: (isLike ? 'PUT' : 'DELETE'),
      headers: {
        authorization: apiToken,
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then(result => {
        // т.к. id карточек начинаются с цифр - используем CSS.escape()
        const likeCounter = getElement(`#${CSS.escape(result._id)}`);
        likeCounter.querySelector('.place-card__like-counter').textContent = result.likes.length;
        event.target.classList.toggle('place-card__like-icon_liked');

    })
    .catch((err) => {
      console.log(err);
    });

  }
}
