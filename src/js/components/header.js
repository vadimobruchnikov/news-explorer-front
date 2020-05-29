import { getCookie, deleteCookie } from '../utils/cookies';
import { getElement } from '../utils/utils';

export { Header }

class Header {

  constructor({ menuSignin, menuAutorized, menuUserProfile, menuLogout, menuSavedNews, containerSavedNews, mainApi }) {
    
    this._menuSignin = menuSignin || null;
    this._menuAutorized = menuAutorized || null;
    this.menuUserProfile = menuUserProfile || null;
    this.menuLogout = menuLogout || null;
    this.menuSavedNews = menuSavedNews || null;
    this.containerSavedNews = containerSavedNews || null;
    this.mainApi = mainApi || null;
    this.render();

  }

  render() {

    this.userName = getCookie('user.name');
    this.jwt = getCookie('jwt');
    this.isLoggedIn = this.userName && this.jwt ? true : false;
    if (this.isLoggedIn) {
      this.menuUserProfile.textContent = this.userName;
      this._menuAutorized.classList.remove('hidden');
      this._menuSignin.classList.add('hidden');
      if(this.menuSavedNews)
        this.menuSavedNews.classList.remove('hidden');
    } else {
      this._menuSignin.classList.remove('hidden');
      this._menuAutorized.classList.add('hidden');
      if(this.menuSavedNews)
        this.menuSavedNews.classList.add('hidden');
    }

    if (this.isLoggedIn && this.containerSavedNews) {
      this.renderArticles();
    }

  }

  renderArticles() {
  
    this.mainApi.getArticles()
    .then(response => response.json())
    .then(result =>  {
      console.log(result);
    })
    .catch((err) => {
      console.log('error',err);
    })
    .finally(() => {
      console.log('fin');
    });

  }
}
