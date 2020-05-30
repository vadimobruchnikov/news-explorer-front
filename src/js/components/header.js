import { getCookie } from '../utils/cookies';

export { Header }

class Header {

  constructor({ menuSignin, menuAutorized, menuUserProfile, menuLogout, menuSavedNews }) {
    
    this._menuSignin = menuSignin || null;
    this._menuAutorized = menuAutorized || null;
    this.menuUserProfile = menuUserProfile || null;
    this.menuLogout = menuLogout || null;
    this.menuSavedNews = menuSavedNews || null;
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
  }
}
