import { getRusFormatDate, getShortDate, sliceStr } from "../utils/utils";
export { NewsCard }

class NewsCard {

    constructor(card, notFoundUrl) {
        return this.create(card, notFoundUrl);
    }

    renderIcon() {

    }

    create(card, notFoundUrl) {

        const cardTemplate = document.createElement('a');
        cardTemplate.classList.add('card');
        cardTemplate.href = card.url;
        cardTemplate.target = "_blank";
        let urlImage = card.urlToImage;
        if( (!urlImage) || (urlImage==null) || (urlImage == undefined)) {
            urlImage = notFoundUrl; 
        }
        let cardId = card._id ? card._id : "";
        let extButtonClass = card.keyword ? "button__card-delete": "button__card-bookmark button__card-bookmark_disable";   
        // button__card-bookmark_active
        //  button__card-help_hidden
        const newsDate = getRusFormatDate(card.publishedAt);
        cardTemplate.innerHTML =
           `<input type="hidden" class="publishedAt" value="${card.publishedAt}">
            <input type="hidden" class="_id" value="${cardId}">
            <div class="card__top-buttons button"> 
                <div class="button__card button__card-help" title="Войдите, чтобы сохранить">
                    Войдите, чтобы сохранить
                </div>
                <a class="button__card ${extButtonClass}" href="#">
                </a>
            </div>
            <img class="card__image" src="${urlImage}" alt="AltText">
            <div class="card__bottom">
                <div class="card__date">
                    ${newsDate}
                </div>
                <h3 class="card__title">
                    ${card.title}
                </h3>
                <p class="card__text">
                    ${card.description}
                </p>
                <div class="card__source">
                    ${card.source.name}
                </div>
            </div>`;
        /*
        let cardImage = cardTemplate.querySelector('.card__image');
        cardImage.urlNotFoundImage = urlImage;
        cardImage.onerror = (event, urlImage) => {
            console.dir(event.target);
            event.target.src = event.target.urlNotFoundImage;
            console.log(event.target.urlNotFoundImage);
        };
        */
        return cardTemplate;
    }
}