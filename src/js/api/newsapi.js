'use strict';

export {NewsApi}
    
class NewsApi {

    constructor(newsApiKey) {
        
        this.newsApiKey = newsApiKey;
        
    }

    getNews(options) {

        const newsUrl = `https://praktikum.tk/news/v2/everything?q=${options.newsQuery}&from=${options.dateFrom}&to=${options.dateTo}&language=ru&pageSize=100&apiKey=${this.newsApiKey}`;

        return fetch(newsUrl, {
            method: 'GET',
            headers: {
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9',
                'Accept-Encoding': 'gzip, deflate',
                'Accept-Language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7,pl;q=0.6',
                'Access-Control-Allow-Origin': '*',
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive',
                'Pragma': 'no-cache',
                'Content-Type': 'application/json',
                'Upgrade-Insecure-Requests' : '1'
            }
        });
    }
}
