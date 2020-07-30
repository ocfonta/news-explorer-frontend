
export default class NewsCards {
  constructor(cardCreate, articleNum) {
    this.cardCreate = cardCreate;
    this.articleNum = articleNum;

  }

  renderCard(inNewsCards) {
    const card = inNewsCards.articles;
    if (card.length === 0) {
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
      if(!(card[i].urlToImage == null || card[i].publishedAt == null ||  card[i].title == null || card[i].description == null || card[i].source.name == null))
      {
        this.saveCard (
          this.cardCreate(card[i].urlToImage, card[i].publishedAt, card[i].title, card[i].description, card[i].source.name, card[i].url, card[i]._id)
          )
      } else {
        this.articleNum++;
      }
        lengthPoint++;
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
    const card = inSaveCards.article;
    if (card.length === 0) {
      document.querySelector('.news-result_type_notfound').classList.remove('invisible');

    }
    else {
      document.querySelector('.news-result_type_notfound').classList.add('invisible');
    for (let i = 0; i < card.length; i++) {
      this.deleteCard (

        this.cardCreate(card[i].image, card[i].date, card[i].title, card[i].text, card[i].source, card[i].keyword, card[i].link, card[i]._id)
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