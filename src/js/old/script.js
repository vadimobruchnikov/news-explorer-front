'use strict';

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
      /* Обратить внимание/Надо исправить:
      * Часть цепочки промисов вынесена за пределы метода класса Api, что является не совсем хорошей практикой.
      * Лучше воспользоваться передачей коллбэка в сам фетч, чем выносить части фетча из класса.
      *
      * https://ru.hexlet.io/blog/posts/javascript-what-the-heck-is-a-callback
      * */
    }
  },
  closeControl: getElement('.popup__close_profile'),
  submitControl: document.forms.edit.querySelector('.button_submit'),
  inputs: [getElement('#edit-profile_name'), getElement('#edit-profile_job')]
});

const userProfile = new UrerProfile(apiBaseUrl, apiToken, userPopup);

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
      const card = {name:cardPopup.form.elements.name.value, link:cardPopup.form.elements.link.value};
      api.saveCard(card)
      /* Обратить внимание/Надо исправить:
      * Часть цепочки промисов вынесена за пределы метода класса Api, что является не совсем хорошей практикой.
      * Лучше воспользоваться передачей коллбэка в сам фетч, чем выносить части фетча из класса.
      *
      * https://ru.hexlet.io/blog/posts/javascript-what-the-heck-is-a-callback
      * */
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
    getElement('#avatar_link').value = urlImageToSrc(getElement('.user-info__photo').style.backgroundImage);
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



// к вам вопрос:
// 1) Как правильно передавать this или забиндить его ?
//               api.getUserInfo(this, userPopup, apiBaseUrl, apiToken);
// 2) Вам не кажется ужасным такое создание карточки
//     Card._create() { как вам код внутри? }
//
//  Как вы и просили все цепочки промисов внесены внутрь класса Api


/* Резюме по работе:
* Исправления внесены корректно, работа принята. Ниже предоставлены ответы на ваши вопросы:
*
* 1) Если я правильно понял вопрос про контекст функции, то всегда нужно обращать внимание на синтаксис, используемый для указания функции и понимать, что именно
* В конкретном случае является контекстом, например:
* const exampleFunction = function () {
*   const exampleArrowFunction = () => {
*     return console.log(this);
*   }
*
*   exampleArrowFunction();
* }
*
* exampleFunction();
*
* В данном случае this - это текущая функция exampleFunction
*
* const exampleFunction = function () {
*   const exampleSimpleFunction = function () {
*     return console.log(this);
*   }
*
*   exampleSimpleFunction();
* }
*
* exampledFunction();
*
* А уже в данном случае - контекстом является exampleSimpleFunction.
*
* Разница, как вы уже, наверное, знаете в том, что у стрелочных функций нет контекста для передачи. Это явным образом встречается, когда мы, например, вешаем обработчик событий, а функцию коллбэк описываем анонимной функцией.
*
*
* Как решать данную штуку или о привязке контекста:
*   1. https://learn.javascript.ru/bind - полностью описывается проблема решения
*
*   2. Создание привязанных функций, например, like для класса Card, можем рассмотреть добавление и удаление слушателя с помощью привязанной функции:
*      .bind является ключевым для создания привязанных функций.
*     https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
*     Это сделать достаточно просто. В конструкторе можно объявить, например, поле this.handleLikeToggle = this.handleLikeToggle.bind(this) - таким образом мы создадим привязанную функцию, забиндим ее контекст.
*     После этого, можно к текущему экземпляру добавить слушателя, а в коллбэк слушателя передать this.handleLikeToggle;
*     В методе remove воспользоваться removeEventListener, для которого мы будем использовать нашу привязанную функцию this.handleLikeToggle.
*
*     Более очевидным способом реализации привязанных функций будет являться такая конструкция:
*     1. Создание приватного поля внутри constructor(), например, this.like
*     2. Присвоить данному полю значение = this.like.bind(this)
*     3. После этого добавить и удалять this.like (Внутри remove()),
*     т.к. это и будет являться привязанной функций.
*
*
*  2) Касательно реализации создания карточки.
*    Ваш подход - достаточно хорош, в нем нету никакого оверкилла.
*    Есть несколько путей оптимизации
*    1. Этот способ достаточно хорош, думаю, он вам понравится:
*          Вы можете реализовать функцию, которая сразу же возвращает "кусок" разметки. Это решает проблему постоянного криэйта DOM-элементов.
*          В рамках OOP на ES6 появятся get'еры. Их можно использовать для возвращения элементов разметки.
*
*          get cardTemplate() {
*              return `<div class="place-card">
                            Здесь вся ваша разметка карточки.
                        </div>`
*          };
*
*          Обратите внимание на использование backtick ` - это новый элемент ES6, бэктики достаточно хорошо и просты в использовании. Одна из прикольных вещей, которые принес стандарт ES6.
*         В нем можно корректно переносить строки и вставлять внутрь разметки JS-код.
*
*          Конкретнее про вставку JS-кода. Вы его уже практиковали в коде выше и наверняка знаете о грузности аналогичного кода на ES5:
*          '<div>' + JavaScript код + '</div'
*          В ES6, используя ` бэктик, появляется возможность интерполяции `Строкое значение разметки ${console.log('А здесь уже JavaScript')} `;
*
*          Обладая данными знаниями, возникает идея оптимизации _create. Наш метод будет возвращать кусок разметки с интерполироваными значениями
*
*          Резюмирую: createCard будет содержать в себе return, состоящий из разметки, заключенной в бэктики с интерполяцией нужных значений.
*          const createCard = function (name, link) {
*              return `<div class="place-card">
                            Здесь вся ваша разметка карточки.
                        </div>`
*          };
*
*    2. Путь оптимизации уже текущего кода с использованием documentFragment и уменьшении работы над DOM. Про что еще можно почитать:
*          https://developer.mozilla.org/ru/docs/Web/API/DocumentFragment - здесь можно почитать о данном методе и его кейсах.
*          https://developer.mozilla.org/ru/docs/Web/API/Element/insertAdjacentHTML - альтернативы appendChild
*          https://developer.mozilla.org/ru/docs/Web/HTML/Element/template - очень интересный тег, его также можно использовать для создание компонентов.
*
*
*
*    Желаю удачи на дальнейших спринтах!
*/


/* Резюме по работе:
* Весь обязательный функционал и дополнительный (Кроме popupAvatar) - работают корректно.
*
* Код написан хорошо, класс Api органичен.
* Что надо исправить:
*   1. Не везде работа с DOM ведется внутри цепочки промисов.
*
*   2. Некоторые участки цепочки промисов вынесены за пределы метода класса Api, рекомендую почитать про принцип SOLID
*   https://getinstance.info/articles/good-code-principles/solid-single-responsibility-javascript/
*   https://habr.com/ru/company/ruvds/blog/426413/
*   Для передачи рекомендую воспользоваться коллбэк-функциями. (Идея с коллбэком через Set'ер крутая, часть из нее можно применить в данном кейсе)
*
* Что можно улучшить:
*   1. Допилить доп. функционал.
*
*   2. Почитать статью о промисах.
*   https://medium.com/web-standards/%D0%BE%D0%B1%D0%B5%D1%89%D0%B0%D0%BD%D0%B8%D0%B5-%D0%B1%D1%83%D1%80%D0%B3%D0%B5%D1%80%D0%BD%D0%BE%D0%B9-%D0%B2%D0%B5%D1%87%D0%B5%D1%80%D0%B8%D0%BD%D0%BA%D0%B8-b0ed209809ab
* */
