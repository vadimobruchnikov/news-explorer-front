import { getCookie, setCookie, deleteCookie } from "../utils/cookies";

export { MainApi }

class MainApi {

    constructor({baseUrl}) {
        this.baseUrl = baseUrl;
    }

    // регистрирует нового пользователя;
    signup(bodyObj) {
        return fetch(this.baseUrl + `/signup`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bodyObj)
        });
    }
    
    // аутентифицирует пользователя на основе почты и пароля;
    signin(bodyObj) {
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
        return fetch(this.baseUrl + `/users/me`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getCookie('jwt'),
            },
        });
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
        // сохраняет статью
        return fetch(this.baseUrl + `/articles`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getCookie('jwt')
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

    checkNewsStatus(news) {
        // проверяет статусы статей для текущего пользователя
        return fetch(this.baseUrl + '/check', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getCookie('jwt'),
            },
            body: JSON.stringify({ links: news })
        });

    }

    isLogedUser() {
        return getCookie('jwt') ? true : false;
    }
    
}