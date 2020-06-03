import {
    NEWS_LAZY_LOAD,
    URL_NOT_FOUND_IMAGE,
    MAIN_API_BASE_URL,
    MAIN_API_BASE_URL_DEV,
    NEWS_API_KEY,
    NEWS_PERIOD,
} from '../config/main.js';
import { getElement, getNewsDate, clearStr, sortArrayByValue, deleteArrayElementById } from '../utils/utils';
import { isValidLink } from "../../js/components/validate";
import { getCookie } from '../utils/cookies';
import { NewsCard } from "../components/newsCard";

export { NewsCardList }

class NewsCardList {

    constructor({ 
        newsCardList, 
        nameLoader, 
        nameShowMore, 
        nameNotFound, 
        newsLazyLoad, 
        notFoundImageUrl, 
        searchInput, 
        searchButton, 
        showMoreButton, 
        newsApi, 
        mainApi, 
        containerSavedTitle,
        searchItems }) {
    
        this._container = newsCardList || null;;
        this._loader = nameLoader || null;
        this._showMore = nameShowMore || null;
        this._notFound = nameNotFound || null;
        this._newsLazyLoad = newsLazyLoad || null;
        this._notFoundImageUrl = notFoundImageUrl || null;
        
        this.searchButton = searchButton || null;
        this.searchInput = searchInput || null;
        this.showMoreButton = showMoreButton || null;
        this.newsApi = newsApi || null;
        this.mainApi = mainApi || null;
        this.containerSavedTitle = containerSavedTitle || null;
        this.searchItems = searchItems || null;
   
        this._container.addEventListener('click', (event) => {

            // обработка кликов на карточках 
            if (event.target.classList.contains('button__card-bookmark')) {
                // на закладке
                event.preventDefault();
                event.stopPropagation();
                if (mainApi.isLogedUser()) {
                    const card = event.target.closest('.card');
                    // Если неверно указан источник, то берем его со ссылки на статью
                    let source = card.querySelector(".card__source").textContent.trim();
                    source = isValidLink(source) ? source : card.origin;
                    const article = {
                        "keyword": clearStr(searchInput.value, 3, 30),
                        "title": clearStr(card.querySelector(".card__title").textContent, 3, 30),
                        "text": clearStr(card.querySelector(".card__text").textContent, 3, 150),
                        "date": card.querySelector(".publishedAt").value,
                        "link": card.href,
                        "source": source,
                        "image": card.querySelector(".card__image").src
                    };
                    mainApi.saveArticle(article)
                    .then(res => {
                        if (res.ok) {
                          return res.json();
                        }
                        return Promise.reject({message: res.status, res: res});
                    })
                    .then(result =>  {
                        const cardButton = card.querySelector('.button__card-bookmark');
                        const cardButtonHelp = card.querySelector('.button__card-help');
                        // карточка была удалена
                        if (result && result.status == 'deleted') {
                            cardButton.classList.remove('button__card-bookmark_active');
                            cardButton.classList.add('button__card-bookmark_disable');
                            cardButtonHelp.textContent = "Нажмите, чтобы сохранить";
                        }
                        // карточка была создана
                        if (result && result.status == 'created') {
                            cardButton.classList.remove('button__card-bookmark_disable');
                            cardButton.classList.add('button__card-bookmark_active');
                            cardButtonHelp.textContent = "Нажмите, чтобы удалить";
                        }
                    })
                    .catch((err) => {
                        console.log('error',err);
                    });
                }
            }
            if (event.target.classList.contains('button__card-delete')) {
                // на удаление
                event.preventDefault();
                event.stopPropagation();
                const card = event.target.closest('.card');
                const id = card.querySelector("._id").value;
                if (id) {
                    mainApi.removeArticle(id)
                    .then(response => response.json())
                    .then(result =>  {
                        // карточка удалена, удаляем ее со страницы
                        card.parentNode.removeChild(card);
                        // перестраиваем заголовок
                        deleteArrayElementById(this._newsArray, '_id', id);
                        //this._newsShowed --;
                        this._newsCount --;
                        this.renderSavedNewsHeader(this._newsArray); 
                        this.showMore(this._newsCount - this._newsShowed);
                    })
                    .catch((err) => {
                        console.log('error',err);
                    });
                }
            }
        });

        this.showMoreButton.addEventListener('click', () => {
            this.renderNewsResults();
        });

        if(this.searchButton){
            this.searchButton.addEventListener('click', (event) => {
                event.preventDefault();
                event.stopPropagation();
                this.showResults();
                this.clearResults();
                this.showPreloader();
                this.hideAuthorSection();
                this.newsApi.getNews({newsQuery: searchInput.value, dateFrom: getNewsDate(new Date(), 0), dateTo: getNewsDate(new Date(), - NEWS_PERIOD)})
                .then(res => {
                    if (res.ok) {
                      return res.json();
                    }
                    return Promise.reject({message: res.status, res: res});
                })
                .then(result =>  {
                    if (result.status == "ok") {
                    return  result.articles ? result.articles : false;
                    } else {
                    return Promise.reject(result.status)
                    }
                })
                .then(newsArray => {
                    this.saveResults(newsArray);
                    this.renderNewsResults();
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => {
                    this.hidePreloader();
                });
            });
        }

        if ((this._container) && getCookie('user.name') && (!getElement('.index-page')) ) {
            this.renderSavedItems(this._container);
        }
    }

    renderSavedItems() {

        this.showResults();
        this.clearResults();
        this.showPreloader();
        this.mainApi.getArticles()
        .then(res => {
            if (res.ok) {
              return res.json();
            }
            return Promise.reject({message: res.status, res: res});
        })
        .then(result =>  {
            const res = result.data.map(element => {
            return {
                _id: element._id, 
                keyword: element.keyword, 
                title: element.title, 
                description: element.text,
                date: element.date,
                url: element.link,
                source: {
                    name: element.source,
                    id:element.source
                },
                urlToImage: element.image,
                publishedAt: element.createdAt,
            };
          });
          this.renderSavedNewsHeader(res);
          this.saveResults(res);
          this.renderNewsResults();
        })
        .catch((err) => {
          console.log('error',err);
        });
    }

    renderNewsResults() {

        const start = this._newsShowed < this._newsCount - 1 ? this._newsShowed : this._newsCount;
        const finish = this._newsShowed + this._newsLazyLoad < this._newsCount - 1 ? this._newsShowed + this._newsLazyLoad : this._newsCount;
        let createdCards = [];
        for (let i = start; i < finish; i++) {
            const newCard = new NewsCard(this._newsArray[i], this._notFoundImageUrl);
            this.addCard(newCard);
            createdCards.push({"link": this._newsArray[i].url});
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
        // проверяем статусы тех карточек, которые прорисовали
        this.checkNewsStatus(createdCards);
    }

    renderSavedNewsHeader(res) {
        const savedStats = getElement('#savedStats');
        const savedTitle = getElement('.saved__text');
        const searchResults = getElement('.search-results');
        if (res.length > 0) {
            let gruppedObj = { };
            res.forEach( function(element) {
                if (gruppedObj[element.keyword]) {
                    gruppedObj[element.keyword] = gruppedObj[element.keyword] + 1;
                } else {
                    gruppedObj[element.keyword] = 1;
                }
            });
            let gruppedArr = [];
            for (let key in gruppedObj) {
                gruppedArr.push({ name: key, value:gruppedObj[key]});
            }
            gruppedArr = sortArrayByValue(gruppedArr, 'value');
            if (gruppedArr.length == 1){
                savedStats.innerHTML = `По ключевому слову: <span class="saved__keywords saved__keywords_bold">${gruppedArr[0].name}</span>`;
            }
            if (gruppedArr.length > 1){
                savedStats.innerHTML = `По ключевым словам: <span class="saved__keywords saved__keywords_bold">${gruppedArr[0].name}, ${gruppedArr[1].name}</span>`;
            }
            if (gruppedArr.length == 3){
                savedStats.innerHTML = savedStats.innerHTML +  ` и <span class="saved__keywords saved__keywords_bold">одному другому</span>`;                
            }
            if (gruppedArr.length > 3){
                savedStats.innerHTML = savedStats.innerHTML +  ` и <span class="saved__keywords saved__keywords_bold">${gruppedArr.length - 2} другим</span>`;                
            }     
            savedTitle.textContent = `${getCookie('user.name')} у вас ${res.length} сохраненных статей`;  
            searchResults.classList.remove('hidden');   
        } else {
            savedTitle.textContent = `${getCookie('user.name')} у вас нет сохраненных статей`;  
            savedStats.innerHTML = '';
            searchResults.classList.add('hidden');   
        }
    }

    saveResults(results){
        this._newsArray = results;
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

    checkNewsStatus(news) {
        if (this.mainApi.isLogedUser()) {
            this.mainApi.checkNewsStatus(news)
            .then(res => {
                if (res.ok) {
                  return res.json();
                }
                return Promise.reject({message: res.status, res: res});
            })
            .then(result =>  {
                // console.log(result);
                // вернулись ссылки, которые сохранены у пользователя
                if(result && result.data && Array.isArray(result.data)){
                    result.data.forEach(function(link) {
                        document.querySelectorAll(`[href="${link.link}"]`).forEach( element => {
                            const cardButton = element.closest('.card').querySelector('.button__card-bookmark');
                            cardButton.classList.remove('button__card-bookmark_disable');
                            cardButton.classList.add('button__card-bookmark_active');
                        })
                    });
                }
            })
            .catch((err) => {
              console.log('error',err);
            });
    
        }
    }
}