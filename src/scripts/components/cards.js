

export default class Cards {
  constructor( img, date, description, content, source, link, keyword, apiMain, id) {
     this.img = img;
      this.link = link;
    this.date = date;
    this.description = description;
    this.content = content;
    this.source = source;
    this.keyword = keyword;
    this.apiMain = apiMain;
    this.id = id;

    this._dateFormat = this._dateFormat.bind(this);
    this.createCard = this.createCard.bind(this);

  }




     createCard() {


      //  состояние логина
    const token = localStorage.getItem('auth');
 const parent = document.querySelector('.cards-container');
    // контейнер
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('card');
    // контейнер сохранить
    const cardSaveButton = document.createElement('div');
    cardSaveButton.classList.add('card__save-button');


    //  notice
    const nologNotice = document.createElement('span');
    nologNotice.classList.add('card__nolog-notice');
    nologNotice.textContent = 'Войдите, чтобы сохранять статьи';
    // иконка сохранить
    const saveButton = document.createElement('button');
    saveButton.classList.add('card__save-icon');
    saveButton.classList.add('card__save-icon_state_nosaved');
    saveButton.type = "button";
    this.saveButton = saveButton;
    //  кейворд
    const keyword = document.createElement('span');
    keyword.classList.add('card__keyword');
    keyword.textContent = this.keyword;
    //  создание ссылки
    const card = document.createElement('a');
    card.classList.add('card__link');
    card.target = '_blank';
    card.href = this.link;

  // картинка
    const image = document.createElement('img');
     image.classList.add('card__image');
     image.src = this.img;
     image.alt = 'image';

   // date
    const date = document.createElement('span');
    date.classList.add('card__date');
    const dateString = this._dateFormat(this.date.slice(0,10));

    date.textContent = dateString;
   // description
    const description = document.createElement('p');
    description.classList.add('card__description');

      if (this.description.length > 45) {
        description.textContent = `${this.description.slice(0, 45)}...`;
    } else {
    description.textContent = this.description;
    }
  // content
  const content = document.createElement('p');
  content.classList.add('card__content');
  if (this.content.length > 140) {
    content.textContent = `${this.content.slice(0, 140)}...`;
  } else {
    content.textContent = this.content;
  }
  // source
  const source = document.createElement('p');
  source.classList.add('card__source');
  source.textContent = this.source;

  card.appendChild(image);
  card.appendChild(date);
  card.appendChild(description);
  card.appendChild(content);
  card.appendChild(source);
  if (token === null) {
    cardSaveButton.appendChild(nologNotice);
    cardSaveButton.classList.add('card__save-button_state_nolog');
  }
  if(token !== null) {
    cardSaveButton.classList.remove('card__save-button_state_nolog');
  }
  cardSaveButton.appendChild(saveButton);
  cardDiv.appendChild(keyword);
  cardDiv.appendChild(cardSaveButton);

  cardDiv.appendChild(card);
  parent.appendChild(cardDiv);
 this.cardElement = cardDiv;
  return cardDiv;

  }
   saveArticleCreate() {


    const parent = document.querySelector('.cards-container');
       // контейнер
       const cardDiv = document.createElement('div');
       cardDiv.classList.add('card');
       const cardDeleteButton = document.createElement('div');
       cardDeleteButton.classList.add('card__delete-button');

       const deleteNotice = document.createElement('span');
       deleteNotice.classList.add('card__delete-notice');
       deleteNotice.textContent = 'Убрать из сохранённых';

       const deleteButton = document.createElement('button');
    deleteButton.classList.add('card__delete-icon');
       deleteButton.type = "button";
       this.deleteButton = deleteButton;
       //  кейворд
       const keyword = document.createElement('span');
       keyword.classList.add('card__keyword');
       keyword.textContent = this.keyword;
       //  создание ссылки
       const card = document.createElement('a');
       card.classList.add('card__link');
       card.target = '_blank';
       card.href = this.link;

     // картинка
       const image = document.createElement('img');
        image.classList.add('card__image');
        image.src = this.img;
        image.alt = 'image';

      // date
       const date = document.createElement('span');
       date.classList.add('card__date');
       const dateString = this._dateFormat(this.date.slice(0,10));

       date.textContent = dateString;
      // description
       const description = document.createElement('p');
       description.classList.add('card__description');

         if (this.description.length > 45) {
           description.textContent = `${this.description.slice(0, 45)}...`;
       } else {
       description.textContent = this.description;
       }
     // content
     const content = document.createElement('p');
     content.classList.add('card__content');

     if (this.content.length > 140) {
       content.textContent = `${this.content.slice(0, 140)}...`;
     } else {
       content.textContent = this.content;
     }
     // source
     const source = document.createElement('p');
     source.classList.add('card__source');
     source.textContent = this.source;
     cardDeleteButton.appendChild(deleteNotice);
     cardDeleteButton.appendChild(deleteButton);
     card.appendChild(image);
     card.appendChild(date);
     card.appendChild(description);
     card.appendChild(content);
     card.appendChild(source);
     cardDiv.appendChild(keyword);
     cardDiv.appendChild(cardDeleteButton);
     cardDiv.appendChild(card);
     parent.appendChild(cardDiv);
     this.parent = parent;
    this.cardElement = cardDiv;
 return cardDiv;
   }
   setEventListeners(e, event) {
    this.cardElement.querySelector(e).addEventListener('click', event.bind(this));

  }
  save() {
    if (localStorage.getItem('auth') !== null) {
      if(this.saveButton.classList.contains('card__save-icon_state_nosaved')) {
          const keyword = document.forms.newstheme.elements.news.value;
    this.apiMain.saveNews(keyword, this.description, this.content, this.date, this.source, this.link, this.img)
    .then((data) => {
      this.id = data.data._id;
      this.saveButton.classList.remove('card__save-icon_state_nosaved');
      this.saveButton.classList.add('card__save-icon_state_saved');
    });

    } else {
      this.apiMain.deleteNews(this.id)
      .then(() =>  {
        this.saveButton.classList.add('card__save-icon_state_nosaved');
        this.saveButton.classList.remove('card__save-icon_state_saved');
      });
    }
  }
  }

  delete(event) {

    this.apiMain.deleteNews(this.id)
    .then(() => {

      const delCard = event.target.closest('.card');
      const delContainer = event.target.closest('.cards-container');
      const newsAmount = document.querySelector('.news-header__articles-amount');
      const num = newsAmount.textContent - 1;
      newsAmount.textContent = num;
      // document.querySelector('.news-header__keywords-more').textContent = `${(num - 2)} другим` ;
      delContainer.removeChild(delCard);
    } );



  }
   _dateFormat (date) {
    var options = {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }

      var dateFix = new Date(date);
      return dateFix.toLocaleString('ru', options);
    }


}

