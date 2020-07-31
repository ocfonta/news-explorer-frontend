
export default class NewsCards {
  constructor(cardCreate, articleNum) {
    this.cardCreate = cardCreate;
    this.articleNum = articleNum;

  }

  renderCard(inNewsCards) {
    const cards = inNewsCards.articles;
    if (cards.length === 0) {
      document.querySelector('.news-result_type_notfound').classList.remove('invisible');
      document.querySelector('.news-result__title').classList.add('invisible');
      document.querySelector('.button_type_show').classList.add('invisible');

    }
    else {
        document.querySelector('.button_type_show').classList.remove('invisible');
      let lengthPoint = this.articleNum;
      document.querySelector('.news-result_type_notfound').classList.add('invisible');
      document.querySelector('.news-result__title').classList.remove('invisible');
    for (let i = lengthPoint; i < (this.articleNum + 3); i++) {
      if(!(cards[i].urlToImage == null || cards[i].publishedAt == null ||  cards[i].title == null || cards[i].description == null || cards[i].source.name == null || cards[i].url == null))
      {
        this.saveCard (
          this.cardCreate(cards[i].urlToImage, cards[i].publishedAt, cards[i].title, cards[i].description, cards[i].source.name, cards[i].url, cards[i]._id)
          )
      } else {
        this.articleNum++;
      }

        lengthPoint++;
        if (cards.length === lengthPoint) {
          document.querySelector('.button_type_show').classList.add('invisible');
          break;
        }

    }
    this.articleNum = lengthPoint;
    }

    return this.articleNum;
  }
  сleanAll() {
this.articleNum = 0;
document.querySelector('.cards-container').textContent = '';
  }
  renderSavedCard(inSaveCards) {
    const cards = inSaveCards.article;
    if (cards.length === 0) {
      document.querySelector('.news-result_type_notfound').classList.remove('invisible');

    }
    else {
      document.querySelector('.news-result_type_notfound').classList.add('invisible');
    for (let i = 0; i < cards.length; i++) {
      this.deleteCard (

        this.cardCreate(cards[i].image, cards[i].date, cards[i].title, cards[i].text, cards[i].source, cards[i].keyword, cards[i].link, cards[i]._id)
        )
    }
    }

  }
  saveCard(newsCard) {

    newsCard.setEventListeners('.card__save-icon', newsCard.save);

  }
  deleteCard(newsCard) {
    newsCard.setEventListeners('.card__delete-icon', newsCard.delete);

  }
}