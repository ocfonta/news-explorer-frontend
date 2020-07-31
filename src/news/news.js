
import "./news.css";
import Api from '../scripts/api/api';
import {configMain} from '../scripts/constants/config.js'
import NewsCards from '../scripts/components/newsCards.js';
import Cards from '../scripts/components/Cards.js';
import MenuChange from '../scripts/utils/menuChange.js';
import KeywordsRanking from '../scripts/utils/keywordsRanking.js';


const authToken = localStorage.getItem('auth');

const apiMain = new Api(configMain, null, null, null, null);
const keyRank = new KeywordsRanking();
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

    // Грета у вас * сохраненных статей
    const newsAmount = document.querySelector('.news-header__articles-amount');
    newsAmount.textContent = data.article.length;
    // Настройка кейвордов
     keyRank.keywordsAdd(data);
     newsCard.renderSavedCard(data);

  });

  const menuChangeFunc = new MenuChange();
  menuChangeFunc.mobileListener()