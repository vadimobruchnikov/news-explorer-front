import { getRusFormatDate, getShortDate } from "../utils/utils";
export { NewsCard }

class NewsCard {

    constructor(card, notFoundUrl) {
        return this.create(card, notFoundUrl);
    }

    renderIcon() {

    }

    sliceStr(str, len) {
        return str.length < len -2 ? str : str.slice(0, len -2) + '...';
    }

    create(card, notFoundUrl) {

        //button__card-bookmark_active
        //button__card-bookmark_disable

        const cardTemplate = document.createElement('a');
        cardTemplate.classList.add('card');
        cardTemplate.href = card.url;
        cardTemplate.target = "_blank";
        let urlImage = card.urlToImage;
        if( (!urlImage) || (urlImage==null) || (urlImage == undefined)) {
            urlImage = notFoundUrl; 
        }
        const newsDate = getRusFormatDate(card.publishedAt);
        cardTemplate.innerHTML =
           `<div class="card__top-buttons button"> 
                <div class="button__card button__card-help button__card-help_hidden">
                    <!-- скрытая подсказка-->
                    Скрытая подсказка
                </div>
                <button class="button__card button__card-bookmark button__card-bookmark_disable">
                </button>
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
        //let cardImage = cardTemplate.querySelector('.card__image');
        //cardImage.urlNotFoundImage = urlImage;
        //cardImage.onerror = (event, urlImage) => {
            //console.dir(event.target);
            //event.target.src = event.target.urlNotFoundImage;
            //console.log(event.target.urlNotFoundImage);
        //};
        return cardTemplate;
    }
}