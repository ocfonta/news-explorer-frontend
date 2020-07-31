

import "./style.css";
import Popup from "./scripts/popup.js";
import FormValidator from './scripts/utils/formValidator.js';

import Api from './scripts/api/api.js';
import NewsApi from './scripts/api/newsApi.js';
import {configMain, configNews} from './scripts/constants/config.js'
import MenuChange from './scripts/utils/menuChange.js';
import NewsCards from './scripts/components/newsCards.js';
import Cards from './scripts/components/Cards.js';

const newForm = document.forms.signup;
const authForm = document.forms.signin;
const authToken = localStorage.getItem('auth');

const menuChangeFunc = new MenuChange();
const popupAuth = new Popup(document.getElementById('signin'), authForm );
const popupNew = new Popup(document.getElementById('signup'), newForm);
const popupSuccess= new Popup(document.getElementById('successfully'));

const apiMain = new Api(configMain, popupAuth, popupNew, popupSuccess, menuChangeFunc);

// проверка аутентификации
if (authToken !== null) {
  apiMain.getUserInfo();
  menuChangeFunc.visible(document.querySelector('.menu__button_type_saves'));
  menuChangeFunc.visible(document.querySelector('.menu__button_type_profile'));

}
else if (authToken === null) {
 document.querySelector('.menu__button_type_saves').classList.add('nolog');
 document.querySelector('.menu__button_type_profile').classList.add('nolog');
 document.querySelector('.menu__button_type_auth').classList.remove('nolog');
}
document.querySelector('.menu__button_type_profile').addEventListener('click', () => {
  apiMain.logOut();
});
// вход
document.forms.signin.addEventListener('submit', (event) => {
  event.preventDefault();
  const email = document.forms.signin.email.value;
  const password = document.forms.signin.password.value;
  apiMain.signin(email, password)
  .catch((res) => apiMain.errorHandler(res));
});
// регистрация
document.forms.signup.addEventListener('submit', (event) => {
  event.preventDefault();
  const email = document.forms.signup.email.value;
  const password = document.forms.signup.password.value;
  const name = document.forms.signup.name.value;
  apiMain.signup(email, password, name)
  .catch((res) => apiMain.errorHandler(res));
});
// открытие попапа
popupAuth.setEventListeners();
popupNew.setEventListeners();
document.querySelector('.menu__button_type_auth').addEventListener('click', () => {
  popupAuth.open();
});
// валидатор вход
const popupAuthValidate = new FormValidator(document.getElementById('signin'));
popupAuthValidate.setEventListeners(document.querySelector('#email'));
popupAuthValidate.setEventListeners(document.querySelector('#password'));
document.forms.signin.addEventListener('input', (event) => {
  popupAuthValidate.setSubmitButtonStateAuth(event);
});
// валидатор регистрация
const popupNewValidate = new FormValidator(document.getElementById('signup'));
popupNewValidate.setEventListeners(document.querySelector('#emailreg'));
popupNewValidate.setEventListeners(document.querySelector('#passwordreg'));
popupNewValidate.setEventListeners(document.querySelector('#namereg'));
document.forms.signup.addEventListener('input', (event) => {
  popupNewValidate.setSubmitButtonStateNew(event);
});
// блок новостей

// карточки отрисовка

const newsCard = new NewsCards(
  (img, date, description, content, source, link, keyword) => {
    const card = new Cards(img, date, description, content, source, link, keyword, apiMain, null);
    card.createCard();
    return card;
  },
  0
);
// поиск по кейворду
document.forms.newstheme.addEventListener('submit', (event) => {

  event.preventDefault();
  const newsKeyword = document.forms.newstheme.elements.news.value;

  const newsApiReq = new NewsApi(configNews, newsKeyword);

  if (newsKeyword !== '') {
    newsCard.сleanAll();
    newsApiReq.getNews()
    .then((data) => {
      document.querySelector('.news-result_type_prelouder').classList.add('invisible');
      document.querySelector('.news-result_type_success').classList.remove('invisible');
      newsCard.renderCard(data);
      document.querySelector('.button_type_show').addEventListener('click', () => {
        newsCard.renderCard(data);
      });
    })
    .catch((res) => {
    newsApiReq.handleError(res);
    console.log(res);
    document.querySelector('.news-result_type_notfound').classList.remove('invisible');
    document.querySelector('.news-result_type_success').classList.add('invisible');
    document.querySelector('.news-result__notf-title').textContent = 'Во время запроса произошла ошибка';
    document.querySelector('.news-result__notf-description').textContent = 'Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз';
    });
  } else  {
    document.querySelector('.news-result_type_notfound').classList.remove('invisible');
    document.querySelector('.news-result_type_success').classList.add('invisible');
    document.querySelector('.news-result__notf-description').textContent = 'Вы не ввели тему новости';
  }
});
 menuChangeFunc.mobileListener()


