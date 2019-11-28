import {Card} from "./card.js";
export {CardList};


class CardList {

    constructor(container, cards) {

        this.container = container;
        this.cards = cards;
        this.container.addEventListener('click', this.handleCardEvent);
        this._render();
    }

    _addCard(item) {
        const card = new Card(item);
        // TODO #8 const { element } = new Card доступна короткая запись
        this.container.appendChild(card.element);
    }

    _render() {
        if (this.cards) {

            // можно сортировать по лайкам
            this.cards.sort( (a, b) => {
                return a.likes.length - b.likes.length;
            });
            // для удобства взят обратный порядок карточек
            this.cards.reverse().forEach( function (item) {
                this._addCard(item);
            }, this);

        }
    }

    handleCardEvent(event) {

        // обработка delete
        if (event.target.classList.contains('place-card__delete-icon')){
            if (window.confirm('Вы действительно хотите удалить эту карточку?')) {
                api.deleteCard(event);
            }
        }
        // обработка like
        if (event.target.classList.contains('place-card__like-icon')){
            
            api.likeCard(event, event.target.closest('.place-card').id,
                        !event.target.classList.contains('place-card__like-icon_liked'));
            /* Обратить внимание/Надо исправить:
            * Часть цепочки промисов вынесена за пределы метода класса Api, что является не совсем хорошей практикой.
            * Лучше воспользоваться передачей коллбэка в сам фетч, чем выносить части фетча из класса.
            * 
            * https://ru.hexlet.io/blog/posts/javascript-what-the-heck-is-a-callback
            * */

        }
        // обработка preview
        if (event.target.classList.contains('place-card__image')){
            imgPreview.openFunction(event);
        }
    }
}