export default class MenuChange {
  constructor(element) {
      this.element = element;

  }
  visible(element) {


      if (element.classList.contains('nolog')) {
        element.classList.remove('nolog');
        document.querySelector('.menu__button_type_auth').classList.add('nolog');
      }
  }
  __mobileOpen() {
    document.querySelector('.menu__icon-all').classList.add('invisible');
    document.querySelector('.header__menu-block').classList.add('header__is-open');
    document.querySelector('.menu-ul').classList.remove('menu__is-closed');
    document.querySelector('.menu-ul').classList.add('menu__is-open');
    document.querySelector('.menu__close-icon').classList.remove('invisible');
    if (localStorage.getItem('auth') === null) {
      document.querySelector('.menu__button_type_saves').classList.remove('nolog');
    }
  }
  __mobileClose() {
    document.querySelector('.menu__icon-all').classList.remove('invisible');
    document.querySelector('.header__menu-block').classList.remove('header__is-open');
    document.querySelector('.menu-ul').classList.add('menu__is-closed');
    document.querySelector('.menu-ul').classList.remove('menu__is-open');
    document.querySelector('.menu__close-icon').classList.add('invisible');
    if (localStorage.getItem('auth') === null) {
      document.querySelector('.menu__button_type_saves').classList.add('nolog');
    }
  }
  mobileListener() {
    document.querySelector('.menu__icon-all').addEventListener('click', () => {
     this.__mobileOpen();
    });
    document.querySelector('.menu__close-icon').addEventListener('click', () => {
      this.__mobileClose();
     });
     if(localStorage.getItem('auth') === null) {
      document.querySelector('.auth__button').addEventListener('click', () => {
        this.__mobileClose();
       });
     }


  }

}