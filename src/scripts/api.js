

export default class Api {
  constructor(config, popupAuth, popupNew, popupSuccess, menuChange) {
      this.config = config;
      this.headers = config.headers;
      this.popupAuth = popupAuth;
      this.popupNew = popupNew;
      this.popupSuccess = popupSuccess;
      this.menuChange = menuChange;

  }
  // Вход
  signin(email, password) {
    return this._postSignIn ('/signin', 'POST', email, password);
  }
  _postSignIn (url, method, email, password) {
    return fetch(
      this.config.baseUrl + url,
      {
        method: method,
        headers: this.headers,
        credentials: 'include',
        withCredentials: true,
        body: JSON.stringify({
          email: email,
          password: password
        })
      })
      .then((data) => this._handleResult(data))
      .catch((e) => this._errorHandler(e));
  }
// регистрация
  signup(email, password, name) {
    return this._postSignUp ('/signup', 'POST', email, password, name);
  }
  _postSignUp (url, method, email, password, name) {
    return fetch(
      this.config.baseUrl + url,
      {
        method: method,
        headers: this.headers,
        credentials: 'include',
        withCredentials: true,
        body: JSON.stringify({
          email: email,
          password: password,
          name: name
        })
      })
      .then((data) => this._handleResult(data))
      .catch((e) => this._errorHandler(e));
  }
// обработчик попапов
  _handleResult(res) {
    const popupAuth = document.querySelector('#signin');
    const popupNew = document.querySelector('#signup');
    const errMessage = document.querySelector('#server-error');
       if (res.ok) {
        if (popupAuth.classList.contains('popup__is-open')) {

          this.popupAuth.close();
             this.menuChange.visible(document.querySelector('.menu__button_type_saves'));
             this.menuChange.visible(document.querySelector('.menu__button_type_profile'));
             localStorage.setItem('auth', '1');
             this.getUserInfo();
             if (!document.querySelector('.news-result_type_success').classList.contains('invisible')) {
              document.querySelectorAll('.card__nolog-notice').forEach(n => n.classList.add('invisible'));
              document.querySelectorAll('.card__save-button').forEach(n => n.classList.remove('card__save-button_state_nolog'));
             }
        }
        if (popupNew.classList.contains('popup__is-open')) {
          this.popupNew.close();
          this.popupSuccess.toggleSuccessPopup();
        }
           return res.json();
       }
       else {
         if (res.status === 409) {
           errMessage.classList.remove('invisible');
           errMessage.textContent = 'Такой Email зарегистрирован';
           }
           if (res.status === 401 || res.status === 400) {

             errMessage.classList.remove('invisible');
             errMessage.textContent = 'Неверный Email или пароль';
           }
           return {error: res.status};
       }
   }
  //  информация о пользователе
   getUserInfo() {
  return  this._getUserInfo('/users/me','GET');
   }
   _getUserInfo(url, method) {
    return fetch(
      this.config.baseUrl + url,
      {
        method: method,
        headers: this.headers,
        credentials: 'include',
        withCredentials: true,
      })
      .then((data) => this._handleResultOther(data))
      .then((data) => {
        this._addUserName(data);
      })
      .catch((e) => this._errorHandler(e));
   }
   _addUserName (data) {
     const nameUser = data.name;
     const logOutButt = document.querySelector('.menu__link-logout-name');
     const userNameSaves = document.querySelector('.userName');
     logOutButt.textContent = nameUser;
     userNameSaves.textContent = nameUser;
   }
  // сохранение статьи
  saveNews(keyword, title, text, date, source, link, image) {
    return this._postNews(keyword, title, text, date, source, link, image);
  }
  _postNews(keyword, title, text, date, source, link, image) {
    const url = this.config.baseUrl + '/articles';

    return fetch(
      url,
      {
        method: 'POST',
        headers: this.headers,
        credentials: 'include',
        withCredentials: true,
        body: JSON.stringify({
          keyword: keyword,
          title: title,
          text: text,
          date: date,
          source: source,
          link: link,
          image: image,
        }),
      },
    )
      .then((data) => this._handleResultOther(data))
      .catch((e) => this._errorHandler(e));
  }
  // получить  сохраненные статьи
   getUserSaves() {
   return this._getSaves('/articles','GET');
   }
   _getSaves(url, method) {
    return fetch(
      this.config.baseUrl + url,
      {
        method: method,
        headers: this.headers,
        credentials: 'include',
        withCredentials: true,
      })
      .then(this._handleResultOther)
      .catch((e) => this._errorHandler(e));
   }
   // удаление статьи
  deleteNews(id) {
    return this._deleteNews(id);
  }

  _deleteNews(id) {
    const url = this.config.baseUrl + '/articles/' + id;
    return fetch(
      url,
      {
        method: 'DELETE',
        credentials: 'include',
        withCredentials: true,
        headers: this.headers,
      },
    )
      .then(this._handleResult)
      .catch(this._errorHandler);
  }
  //  выход
   logOut() {
    this._logOut('/logout','POST');
  }
  _logOut(url, method) {
    localStorage.clear();
    document.cookie = 'jwt=; Path=/; Expires=Thu, 03 Nov 1999 00:00:00 GMT;';
    window.location.reload();
    return fetch(this.config.baseUrl + url, {
      method: method,
      credentials: 'include',
      withCredentials: true,
    })
      .then(this._handleResultOther)
      .catch(this._errorHandler);
  }

  _handleResultOther(res) {
    if (res.ok) {
      return res.json();
    } else {
      return {error: res.status};
    }
  }
  _errorHandler(e) {
      return {error: e.message};
  }
}
