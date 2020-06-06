import { getCookie } from '../utils/cookies';

export { Header }

class Header {

  constructor({ menuSignin, menuAutorized, menuUserProfile, menuLogout, menuSavedNews, isSavedNewsPage }) {
    
    this._menuSignin = menuSignin || null;
    this._menuAutorized = menuAutorized || null;
    this.menuUserProfile = menuUserProfile || null;
    this.menuLogout = menuLogout || null;
    this.menuSavedNews = menuSavedNews || null;
    this.isSavedNewsPage = isSavedNewsPage || false;
    this.render();

  }

  render() {

    this.userName = getCookie('user.name');
    this.jwt = getCookie('jwt');
    this.isLoggedIn = this.userName && this.jwt ? true : false;
    if (this.isLoggedIn) {
      // пользователь залогинен
      this.menuUserProfile.textContent = this.userName;
      this._menuAutorized.classList.remove('hidden');
      this._menuSignin.classList.add('hidden');
      if(this.menuSavedNews)
        this.menuSavedNews.classList.remove('hidden');
    } else {
      // пользователь не залогинен
      if (this.isSavedNewsPage) {
        // переходим на главную
        document.location = '/index.html';
        return true;
      }
      this._menuSignin.classList.remove('hidden');
      this._menuAutorized.classList.add('hidden');
      if(this.menuSavedNews)
        this.menuSavedNews.classList.add('hidden');
    }
  }
}
