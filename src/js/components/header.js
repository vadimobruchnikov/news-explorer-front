import { getCookie } from '../utils/cookies';

export { Header }

class Header {
  constructor(menuContainer) {
    // tests
    // setCookie('username', 'Практикум');
    // deleteCookie('username');

    this.userName = getCookie('username');
    this.isLoggedIn = this.userName ? true : false;
    console.log('isLoggedIn=',this.isLoggedIn);
    console.log('userName=', this.userName);
    this.render(menuContainer);
  }

  render(menuContainer) {
    const themeBlack = menuContainer.classList.contains('header__nav_black');

    // extClass = themeBlack ? 'header__menu_black' : 'header__menu_black';
    const headerTemplate = this.isLoggedIn ? document.createElement('div') : document.createElement('a');
    if (themeBlack) {
      headerTemplate.classList.add('header__menu', 'header__menu_button-black', 'header__menu_black');
    } else {
      headerTemplate.classList.add('header__menu', 'header__menu_button');
    }
    headerTemplate.id = 'menuSignup';
    if (this.isLoggedIn) {
        headerTemplate.classList.add('header__menu_autorized');
        headerTemplate.innerHTML = `<a class="header__menu header__menu_a" href="./saved-news.html">${this.userName}</a>
                                  <a class="header__menu header__menu_exit" href="./index.html"></a>`;
    } else {
      headerTemplate.innerHTML = 'Войти';
    }
    menuContainer.appendChild(headerTemplate);
  }

  /* white

    <a   class="header__menu header__menu_button" id="menuPopupEnter" href="#">Войти</a>
    <div class="header__menu header__menu_button header__menu_autorized">
        <a class="header__menu header__menu_a" href="./saved-news.html">Грета</a>
        <a class="header__menu header__menu_exit" href="./index.html"></a>
    </div>

-- black
    <div class="header__menu header__menu_button-black header__menu_autorized header__menu_black">
        <a class="header__menu header__menu_a header__menu_black" href="./saved-news.html">Грета</a>
        <a class="header__menu header__menu_exit-black header__menu_black" href="./index.html"></a>
    </div>
-----

    <div class="header__menu header__menu_autorized header__menu_button-black" id="menuPopupEnter">
        <a class="header__menu header__menu_a" href="./saved-news.html">Практикум</a>
        <a class="header__menu header__menu_exit" href="./index.html"></a>
    </div>
*/
}