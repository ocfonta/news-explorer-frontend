

export default class FormValidator {
    constructor(popupElement) {


  this.popupElement = popupElement;
}

    checkInputValidity(element) {
        const errorMessage = element.target.nextElementSibling;
        const value = element.target.value;
        const valueLength = value.length;

        if(element.target.checkValidity() == false && valueLength === 0 ) {

          errorMessage.textContent = 'Это обязательное поле';
         document.querySelector('.popup__button').setAttribute('disabled', '');
          event.target.classList.add('input__error-message__true');

        } else if (!(element.target.checkValidity()) && element.target.classList.contains('popup__input_type_password')) {
          errorMessage.textContent = 'Пароль должен содержать не менее 6 символов';
         document.querySelector('.popup__button').setAttribute('disabled', '');
          event.target.classList.add('input__error-message__true');


        } else if(!(element.target.checkValidity()) && element.target.classList.contains('popup__input_type_email')) {
          errorMessage.textContent = 'Некорректный адрес электронной почты';
          document.querySelector('.popup__button').setAttribute('disabled', '');
           event.target.classList.add('input__error-message__true');
        }

        else {
          errorMessage.textContent = '';
          event.target.classList.remove('input__error-message__true');
        }
    }
    setSubmitButtonStateAuth(event) {

      const error = event.target.closest('.popup__form').querySelectorAll('.input__error-message__true');

        if(error.length !== 0 ) {
            document.querySelector('.popup__button').setAttribute('disabled', '');
          }
          else  {
            document.querySelector('.popup__button_type_auth').removeAttribute('disabled');

          }

    }

    setSubmitButtonStateNew(event) {
      const error = event.target.closest('.popup__form').querySelectorAll('.input__error-message__true');
        if(error.length !== 0 ) {
            document.querySelector('.popup__button').setAttribute('disabled', '');
          }
          else  {

            document.querySelector('.popup__button_type_reg').removeAttribute('disabled');
          }

    }

    setEventListeners(element) {
      element.addEventListener('input', this.checkInputValidity.bind(this));

  }
}









