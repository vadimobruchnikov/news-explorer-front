import { getCookie, setCookie, deleteCookie } from "../config/main";

export { MainApi }

class MainApi {

    constructor() {

    }

    // регистрирует нового пользователя;
    signup(bodyObj) {
        
        console.dir(bodyObj);
        return fetch(`http://localhost:3000/signup`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                //'Access-Control-Allow-Origin': 'http://localhost:8080'
            },
            body: JSON.stringify(bodyObj)
        });
    }
    
    signin() {
        // аутентифицирует пользователя на основе почты и пароля;
    }
    
    getUserData() {
        // возвращает информацию о пользователе;
    }
    
    getArticles() {
        // забирает все статьи;
    }
    
    createArticle() {
        // создаёт статью;
    }
    
    removeArticle() {
        // удаляет статью.
    }
    
}