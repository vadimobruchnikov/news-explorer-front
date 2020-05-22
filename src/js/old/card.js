import {myOwnerId} from "./api";
export {Card};


class Card {

    constructor({name, link, likes, owner, _id}) {

        this.name = name;
        this.link = link;
        this.likes = likes;
        this.owner = owner;
        this._id = _id;
        this.element = this._create();

    }

    _create() {
        
        const cardContainer = document.createElement('div');
        const cardImage = document.createElement('div');
        const cardDeleteButton = document.createElement('button');
        const cardDescription = document.createElement('div');
        const cardTitle = document.createElement('h3');
        const cardLikeButton = document.createElement('button');
        const cardLikeSection = document.createElement('div');
        const cardLikeCounter = document.createElement('span');

        cardContainer.classList.add('place-card');
        cardImage.classList.add('place-card__image');

        // Отрабатываем незагрузившиеся фото
        cardImage.setAttribute('style', `background-image: url(${this.link}),url(/images/nophoto.png)`);
        cardDeleteButton.classList.add('place-card__delete-icon');
        
        // Заполняем лайкнувшими
        const likeAuthors = this.likes.map( function(author) { return `+ ${author.name}` } ).join('\n');

        cardLikeButton.setAttribute('title', likeAuthors);
        cardDescription.classList.add('place-card__description');
        cardTitle.classList.add('place-card__name');
        cardTitle.textContent = this.name;
        cardTitle.setAttribute('title', `автор поста: ${this.owner.name}`);
        
        cardLikeSection.classList.add('place-card__like-section');
        cardLikeButton.classList.add('place-card__like-icon');
        cardLikeCounter.classList.add('place-card__like-counter');

        // Ищем есть мы среди лайкнувших
        let result = this.likes.find(function(item) {
            return item._id == myOwnerId;
        });
        // Если есть проставляем лайк
        if (result) {
            cardLikeButton.classList.add('place-card__like-icon_liked'); 
        }

        cardLikeCounter.textContent = this.likes.length;
        if (this.owner._id == myOwnerId) {
            cardImage.appendChild(cardDeleteButton);
        }
        cardContainer.appendChild(cardImage);
        cardDescription.appendChild(cardTitle);
        cardLikeSection.appendChild(cardLikeButton);
        cardLikeSection.appendChild(cardLikeCounter);
        cardDescription.appendChild(cardLikeSection);
        cardContainer.appendChild(cardDescription);
        cardContainer.setAttribute('id', this._id);

        return cardContainer;
    }

}