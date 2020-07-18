 
    
   export class CardList {
        constructor(card, api) {
            this.card = card;
       
            this.api = api;
            this.addCard = this.addCard.bind(this);
            this.render = this.render.bind(this);
      
      
        }
      
        addCard(imageUrl, cardName){
        document.querySelector('.places-list').appendChild(this.card.createCard(imageUrl, cardName));

        }
      
        render(arrayData) {
          for (let element of arrayData) {
            this.addCard(element.link, element.name);
           }
        }
        addButtons() {
        const listContainer = document.querySelector('.places-list');
        listContainer.addEventListener('click', this.card.like);
        listContainer.addEventListener('click', this.card.remove);
        document.querySelector('#popup-img').addEventListener('click', this.card.zoom);
               
   
        }
        getApi() {
          this.api.getInitialCards() 
            .then((data) => {
      
             return this.render(data);
              
             
            })
           .catch((err) => {
            console.log(err);
           })
        }
    }
  
