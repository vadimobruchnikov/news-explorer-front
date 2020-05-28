import { getCookie, setCookie, deleteCookie } from "../utils/cookies";

export { MainApi }

class MainApi {

    constructor({baseUrl}) {
        this.baseUrl = baseUrl;
    }

    // регистрирует нового пользователя;
    signup(bodyObj) {

        console.dir(bodyObj);
        console.dir('this', this);
        return fetch(this.baseUrl + `/signup`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                //'Access-Control-Allow-Origin': 'http://localhost:8080'
            },
            body: JSON.stringify(bodyObj)
        });
    }
    
    // аутентифицирует пользователя на основе почты и пароля;
    signin(bodyObj) {
        console.dir(bodyObj);
        console.log('this', this);
        return fetch(this.baseUrl + `/signin`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                //'credentials': 'include'
                //'credentials': 'same-origin',
                //'mode':        'same-origin'
                //'Access-Control-Allow-Origin': 'http://localhost:8080'
            },
            body: JSON.stringify(bodyObj)
        });
    }

    signout() {
        console.dir('signout');
        console.log('this', this);
        return fetch(this.baseUrl + `/signout`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });
    }
    
    getUserData() {
        // возвращает информацию о пользователе;
    }
    
    getArticles() {
        // забирает все статьи;
        return fetch(this.baseUrl + `/articles`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getCookie('jwt'),
            },
        });
    }
    
    saveArticle(article) {
        return fetch(this.baseUrl + `/articles`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getCookie('jwt'),
            },
            body: JSON.stringify(article)
        });
    }
    
    removeArticle(id) {
        // удаляет статью.
        return fetch(this.baseUrl + `/articles/`+id, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getCookie('jwt'),
            },
        });
    }
    
}