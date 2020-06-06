import { getElement, getRusFormatDate, getShortDate, sliceStr } from "../utils/utils";
import { getCookie } from "../utils/cookies";
import { isValidLink } from "../../js/components/validate";
export { NewsCard }

class NewsCard {

    constructor(card, notFoundUrl) {
        return this.create(card, notFoundUrl);
    }

    create(card, notFoundUrl) {

        const isUserLogin = getCookie('user.name') ? true : false;
        const isSavedPage = getElement('.saved-page') ? true : false;
        const cardTemplate = document.createElement('a');
        cardTemplate.classList.add('card');
        cardTemplate.href = card.url;
        cardTemplate.target = "_blank";
        let urlImage = card.urlToImage;
        if( (!urlImage) || (urlImage==null) || (urlImage == undefined)) {
            urlImage = notFoundUrl; 
        }
        const cardId = card._id ? card._id : "";
        const buttonCardHelpText = isUserLogin ? ( isSavedPage ? "Нажмите, чтобы удалить" : "Нажмите, чтобы сохранить" ) : "Войдите, чтобы сохранить";
        const keyword = card.keyword ? card.keyword : '';
        
        const newsDate = getRusFormatDate(card.publishedAt);
        cardTemplate.innerHTML =
           `<input type="hidden" class="publishedAt" value="">
            <input type="hidden" class="_id" value="">
            <div class="card__top-buttons button"> 
                <div class="button__card button__card-keyword">
                </div>  
                <div class="button__card button__card-help">
                </div>  
                <a class="button__card button__card_link" href="#">
                </a>
            </div>
            <img class="card__image" src="" alt="AltText">
            <div class="card__bottom">
                <div class="card__date">
                </div>
                <h3 class="card__title">
                </h3>
                <p class="card__text">
                </p>
                <div class="card__source">
                </div>
            </div>`;
        // безопасное заполнение шаблона
        //cardTemplate.querySelector('.publishedAt').textContent = card.publishedAt;
        cardTemplate.querySelector('.publishedAt').setAttribute('value', card.publishedAt);
        //cardTemplate.querySelector('._id').textContent = cardId;
        cardTemplate.querySelector('._id').setAttribute('value', cardId);
        cardTemplate.querySelector('.button__card-keyword').textContent = keyword;
        if (keyword == '') {
            cardTemplate.querySelector('.button__card-keyword').classList.add('hidden');
        }
        cardTemplate.querySelector('.button__card-help').textContent = buttonCardHelpText;
        if (isSavedPage) {
            cardTemplate.querySelector('.button__card_link').classList.add('button__card-delete'); 
        } else {
            cardTemplate.querySelector('.button__card_link').classList.add('button__card-bookmark', 'button__card-bookmark_disable'); 
        }
        cardTemplate.querySelector('.card__image').setAttribute('src', isValidLink(urlImage) ? urlImage : '#');
        cardTemplate.querySelector('.card__date').textContent = newsDate;
        cardTemplate.querySelector('.card__title').textContent = card.title;
        cardTemplate.querySelector('.card__text').textContent = card.description;
        cardTemplate.querySelector('.card__source').textContent = card.source.name;

        return cardTemplate;
    }
}