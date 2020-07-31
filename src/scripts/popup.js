export default class Popup {
  constructor(element, form = null) {
      this.popupElement = element;
      this.formElement = form;
 this.close = this.close.bind(this);
  }

setEventListeners() {

      this.popupElement.querySelector('.popup__close').addEventListener('click', this.close.bind(this));
      this.formElement.reset();
      document.querySelector('.popup__else-popup-link-signup').addEventListener('click', this.toggleAuthPopup.bind(this))
      document.querySelector('.popup__else-popup-link-signin').addEventListener('click', this.toggleNewPopup.bind(this));
      document.querySelector('.popup__else-popup-link-success').addEventListener('click', this.toggleNewPopup.bind(this));
  }
  open() {
    this.formElement.reset();
    this.formElement.classList.add('errorstatus');
    this.popupElement.classList.add('popup__is-open');
    this.popupElement.classList.remove('invisible');
      this.setEventListeners();
  }

  close() {

      this.popupElement.classList.add('invisible');
      this.popupElement.classList.remove('popup__is-open');
      this.formElement.reset();
      this.formElement.classList.add('errorstatus');

  }


    toggleAuthPopup() {
      document.forms.signin.reset();
      document.forms.signup.reset();
      document.querySelector('.popup__input').classList.add('input__error-message__true');
      this.popupElement.classList.add('invisible');
      document.querySelector('#signup').classList.remove('invisible');
      document.querySelector('#signup').classList.add('popup__is-open');
      document.querySelector('#signin').classList.remove('popup__is-open');


  }


  toggleNewPopup() {
    document.forms.signin.reset();
    document.forms.signup.reset();
    document.querySelector('.popup__input').classList.add('input__error-message__true');

    this.popupElement.classList.add('invisible');
    document.querySelector('#signin').classList.remove('invisible');
    document.querySelector('#successfully').classList.add('invisible');

    document.querySelector('#signup').classList.toggle('popup__is-open');
    document.querySelector('#signin').classList.toggle('popup__is-open');


  }
  toggleSuccessPopup () {
    document.forms.signin.reset();
    document.forms.signup.reset();
    document.querySelector('.popup__input').classList.add('input__error-message__true');

    this.popupElement.classList.add('invisible');
    document.querySelector('#successfully').classList.remove('invisible');

    document.querySelector('#signup').classList.toggle('popup__is-open');

  }

}