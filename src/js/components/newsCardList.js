import { getElement } from "../utils/utils";
import { NewsCard } from "../components/newsCard";

export {NewsCardList}

class NewsCardList {
    constructor(options) {
        this._container = getElement(options.nameCardList);
        this._loader = getElement(options.nameLoader);
        this._showMore = getElement(options.nameShowMore);
        this._notFound = getElement(options.nameNotFound);
        this._newsLazyLoad = options.newsLazyLoad;
        this._notFoundImageUrl = options.notFoundImageUrl;
    }

    renderResults() {
        let start = this._newsShowed < this._newsCount - 1 ? this._newsShowed : this._newsCount;
        let finish = this._newsShowed + this._newsLazyLoad < this._newsCount - 1 ? this._newsShowed + this._newsLazyLoad : this._newsCount;
        //console.log(start, finish);
        for (let i = start; i < finish; i++) {
            const newCard = new NewsCard(this._newsArray[i], this._notFoundImageUrl);
            this.addCard(newCard);
        }
        this._newsShowed = finish;
        this.hidePreloader();
        this.hideError();
        // Если дошли до конца, не показывать showmore
        if ((this._newsShowed < this._newsCount)&&(this._newsCount > 0)) {
            this.showMore(this._newsCount - this._newsShowed);
        } else {
            this.hideMore();
        }
        if (this._newsCount == 0) {
            this.renderError();
        }
    }

    saveResults(results){
        this._newsArray = results;
        console.dir(this._newsArray);
        this._newsShowed = 0;
        this._newsCount = this._newsArray.length;
    }

    clearResults() {
        this._container.innerHTML = "";
    }

    addCard(card) {
        this._container.appendChild(card);
    }

    showResults() {
        getElement('.search-results').classList.remove('hidden');
    }

    showPreloader() {
        getElement('.news-preloader').classList.remove('hidden');
    }

    hidePreloader() {
        getElement('.news-preloader').classList.add('hidden');
    }

    renderError() {
        getElement('.news-not-found').classList.remove('hidden');
    }

    hideError() {
        getElement('.news-not-found').classList.add('hidden');
    }

    showMore(totalNews){
        getElement('.show-more').classList.remove('hidden');
        const newsCount = totalNews > 0 ? ` (${totalNews})` : '';
        getElement('.show-more__button').innerHTML = `Показать еще ${newsCount}`;
    }

    hideMore(){
        getElement('.show-more').classList.add('hidden');
    }

    hideAuthorSection(){
        getElement('.about-author').classList.add('hidden');
    }
}