
import "./news.css";
import Api from '../scripts/api';
import {configMain} from '../scripts/config.js'
import NewsCards from '../scripts/newsCards.js';
import Cards from '../scripts/Cards.js';
import MenuChange from '../scripts/menuChange.js';

const authToken = localStorage.getItem('auth');

const apiMain = new Api(configMain, null, null, null, null);
// проверка авторизации
if (authToken !== null) {
  apiMain.getUserInfo();
}
else if (authToken === null) {
  location = './';
}
document.querySelector('.menu__button_type_profile').addEventListener('click', () => {
  apiMain.logOut();
});

const newsCard = new NewsCards(
  (img, date, description, content, source, keyword, link, id) => {
    const card = new Cards(img, date, description, content, source, link, keyword, apiMain, id);
    card.saveArticleCreate();
    return card;
  }, 0
);
apiMain.getUserSaves()
  .then((data) => {
    const newsAmount = document.querySelector('.news-header__articles-amount');
    let i = 0;
     document.querySelectorAll('.news-header__keyword').forEach((e) => {
         e.textContent = data.article[i].keyword;
         i++;
    });
    document.querySelector('.news-header__keywords-more').textContent = `${(data.article.length - 2)} другим` ;
    newsAmount.textContent = data.article.length;

     newsCard.renderSavedCard(data);

  });

  const menuChangeFunc = new MenuChange();
  menuChangeFunc.mobileListener()