
export default class Popup {
    constructor(element, form = null, userinfo = null) {
        this.popupElement = element;
        this.formElement = form;
        this.userinfoElement = userinfo;
   
    }
    
 setEventListeners() {
        this.popupElement
            .querySelector('.popup__close')
            .addEventListener('click', this.close.bind(this));
    }
    open(event) {
        this.setEventListeners();
        if (event.target.classList.contains('user-info__edit-button')) {
           
            const {name, about} = this.userinfoElement.getUserInfo();

            this.formElement.elements.nameUser.value = name;
            this.formElement.elements.jobUser.value = about;
        } 
    }

       close() {
        this.popupElement.classList.remove('popup_is-opened');
        if (this.formElement) {
            this.formElement.reset();
        }

    }//*

    
      toggleNewPopup() {
        document.forms.new.reset();
        document.querySelector('.popup').classList.toggle('popup_is-opened');
    }
    
    
    toggleEditPopup() {
    
    const editPoppup = document.querySelector('#profile');
    editPoppup.classList.toggle('popup_is-opened');
    document.forms.edit.reset();
    
    }
    eventListeners() {
    
    document.querySelector('.user-info__button').addEventListener('click', this.toggleNewPopup);
    document.querySelector('.popup__close').addEventListener('click', this.toggleNewPopup);
    document.querySelector('.user-info__edit-button').addEventListener('click', this.toggleEditPopup);
    document.querySelector('#popup__close-edit').addEventListener('click', this.toggleEditPopup);
   
    }
}  /**/