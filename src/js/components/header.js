import { getCookie, deleteCookie } from '../utils/cookies';
import { getElement } from '../utils/utils';

export { Header }

class Header {
  constructor({ menuSignin, menuAutorized, menuUserProfile, menuLogout }) {
    // tests
    // setCookie('user.name', 'Практикум');
    
    // отладка
    // deleteCookie('user.name');
    // deleteCookie('jwt');
    
    this._menuSignin = menuSignin || null;
    this._menuAutorized = menuAutorized || null;
    this.menuUserProfile = menuUserProfile || null;
    this.menuLogout = menuLogout || null;
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
    } else {
      this._menuSignin.classList.remove('hidden');
      this._menuAutorized.classList.add('hidden');
    }
  }

}