


import {popupEditButton} from '../index.js';
export default class FormValidator {
    constructor(popupElement) {


  this.popupElement = popupElement;
}
    
    checkInputValidity(element) {
        const errorMessage = element.target.nextElementSibling;
        const value = element.target.value;
        const valueLength = value.length;
      
          ;
      
        if(element.target.checkValidity() == false && valueLength === 0 ) {
      
          errorMessage.textContent = 'Это обязательное поле';
          popupEditButton.setAttribute('disabled', '');
          event.target.classList.add('input__error-message__true');
      
        } else if (!(element.target.checkValidity())) {
      
          errorMessage.textContent = 'Должно быть от 2 до 30 символов';
          popupEditButton.setAttribute('disabled', '');
          event.target.classList.add('input__error-message__true');
      
       
        } else {
          errorMessage.textContent = '';
          event.target.classList.remove('input__error-message__true');
        }

    }
    setSubmitButtonState() {
        if(document.querySelector('.input__error-message__true') !== null) {
            document.querySelector('.popup__edit-button').setAttribute('disabled', '');
          }
          else {
            document.querySelector('.popup__edit-button').removeAttribute('disabled'); 
          }

    }
    setEventListeners(element) {
      element.addEventListener('input', this.checkInputValidity.bind(this));
  }
}




