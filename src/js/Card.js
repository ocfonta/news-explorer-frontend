

export class Card {
    constructor () {
        this.like = this.like.bind(this);
        this.remove = this.remove.bind(this);
        this.createCard = this.createCard.bind(this);
  
        
    }
     
       createCard(imageUrl, cardName) {
        
        this.imageUrl = imageUrl;
        this.cardName = cardName;

        const listContainer = document.querySelector('.places-list');
        listContainer.addEventListener('click', this.like);
        listContainer.addEventListener('click', this.remove);
        listContainer.addEventListener('click', this.zoom);
        const cardPlace = document.createElement('div');
        const image = document.createElement('div');
        const cardDescription = document.createElement('div');
        const name = document.createElement('h3');
      
        const iconDelete = document.createElement('button');
        const likeIcon = document.createElement('button');
      
        cardPlace.classList.add('place-card');
        image.classList.add('place-card__image');
        cardDescription.classList.add('place-card__description');
        name.classList.add('place-card__name');
        
        iconDelete.classList.add('place-card__delete-icon');
        likeIcon.classList.add('place-card__like-icon');
       
      
        listContainer.appendChild(cardPlace);
        cardPlace.appendChild(image);
        cardPlace.appendChild(cardDescription);
        cardDescription.appendChild(name);
        
        image.appendChild(iconDelete);
        cardDescription.appendChild(likeIcon);
      
        name.textContent = cardName;
        image.setAttribute('style',
        `background-image: url(${imageUrl})`); 
        return cardPlace;
       }
    like(event) {
        const likeEvent = event.target;
        if (likeEvent.classList.contains('place-card__like-icon')) {
          likeEvent.classList.toggle('place-card__like-icon_liked');
        }
    }
    remove(event) {
        const deleteEvent = event.target;
        if (deleteEvent.classList.contains('place-card__delete-icon')) {
            document.querySelector('.places-list').removeChild(deleteEvent.parentElement.parentElement);
        }
    }
    zoom(event) {
        event.preventDefault();
        const targetImg = document.querySelector('#popup-img');
       
         if (event.target.classList.contains('place-card__image')) {
         
           targetImg.classList.add('popup_is-opened');
           const url = event.target.style.backgroundImage;
           const openImageBackground = document.querySelector('#popup__content-img');
           openImageBackground.style.backgroundImage = url;
           openImageBackground.style.backgroundSize="cover";
           openImageBackground.style.height="80vh";
           openImageBackground.style.width="80vw";
         } else if (event.target.classList.contains('popup__close')) {
          
           document.querySelector('#popup-img').classList.remove('popup_is-opened');
         }
       
    }

    } 
