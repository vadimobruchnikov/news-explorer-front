import {
    NEWS_LAZY_LOAD,
    URL_NOT_FOUND_IMAGE,
    MAIN_API_BASE_URL,
    MAIN_API_BASE_URL_DEV,
    NEWS_API_KEY,
    NEWS_PERIOD,
} from '../config/main.js';
import { getElement, getRusFormatDate, getShortDate, getNewsDate } from '../utils/utils';
import { NewsCard } from "../components/newsCard";


export {NewsCardList}

class NewsCardList {

    constructor({ nameCardList, nameLoader, nameShowMore, nameNotFound, newsLazyLoad, notFoundImageUrl, searchInput, searchButton, showMoreButton, newsApi }) {
        this._container = nameCardList || null;;
        this._loader = nameLoader || null;
        this._showMore = nameShowMore || null;
        this._notFound = nameNotFound || null;
        this._newsLazyLoad = newsLazyLoad || null;
        this._notFoundImageUrl = notFoundImageUrl || null;
        
        this.searchButton = searchButton || null;
        this.searchInput = searchInput || null;
        this.showMoreButton = showMoreButton || null;
        this.newsApi = newsApi || null;
   
        this.showMoreButton.addEventListener('click', () => {
            this.renderResults();
        });

        this.searchButton.addEventListener('click', (event) => {

            event.preventDefault();
            event.stopPropagation();
            this.showResults();
            this.clearResults();
            this.showPreloader();
            this.hideAuthorSection();

            this.newsApi.getNews({newsQuery: searchInput.value, dateFrom: getNewsDate(new Date(), 0), dateTo: getNewsDate(new Date(), - NEWS_PERIOD)})
            .then(response => response.json())
            .then(result =>  {
                if (result.status == "ok") {
                return  result.articles ? result.articles : false;
                } else {
                return Promise.reject(result.status)
                }
            })
            .then(newsArray => {
                this.saveResults(newsArray);
                this.renderResults();
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                this.hidePreloader();
            });
        });

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