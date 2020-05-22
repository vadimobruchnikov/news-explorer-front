class NewsCard {

    constructor(card) {
        this.hiddenHint = card.hiddenHint;
        this.imageLink = card.imageLink;
        this.altText = card.altText;
        this.newsDate = card.newsDate;
        this.newsTitle = card.newsTitle;
        this.newsText = card.newsText;
        this.newsSource = card.newsSource;
        this.cardHtml = this.create();
    }

    renderIcon() {

    }
    create() {

        //button__card-bookmark_active
        //button__card-bookmark_disable

        return 
            `<div class="card">
                <div class="card__top-buttons button"> 
                    <div class="button__card button__card-help button__card-help_hidden">
                        <!-- скрытая подсказка-->
                        ${this.hiddenHint}
                    </div>
                    <button class="button__card button__card-bookmark button__card-bookmark_disable">
                    </button>
                </div>
                <img class="card__image" src="<%=require('${this.imageLink}')%>" alt="${this.altText}">
                <div class="card__bottom">
                    <div class="card__date">
                        ${this.newsDate}
                    </div>
                    <h3 class="card__title">
                        ${this.newsTitle}
                    </h3>
                    <p class="card__text">
                        ${this.newsText}
                    </p>
                    <div class="card__source">
                        ${this.newsSource}
                    </div>
                </div>
            </div>`;
    }
}