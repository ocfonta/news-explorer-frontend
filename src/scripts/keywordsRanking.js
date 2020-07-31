
export default class KeywordsRanking {
  constructor() {

  }
 _keyWordsRank(data) {
  let keysArray = [];
    const dada = data.article
    for (let icon in dada) {
    let keyObj = {};
    let keyValue =  dada[icon].keyword ;
    keyObj.word = keyValue.toLowerCase();
    keysArray.push(keyObj);
    }
    const result = new Object;
    keysArray.forEach(item => result[item.word] ? result[item.word]++ : result[item.word] = 1);
    const countObject = Object.keys(result).map(item => {
        return {
          word: item,
          sum: result[item]
        }
      });
    countObject.sort(function (a, b) {
      if (a.sum < b.sum) {
        return 1;
      }
      if (a.sum > b.sum) {
        return -1;
      }
      return 0;
    });
    return countObject;

   }

  keywordsAdd(data) {
   if (data.article.length === 0) {
        document.querySelector('.news-header__keywords').textContent = 'У вас нет сохраненных статей. Вы можете сохранить их из вкладки "Главная"';
   } else {
    document.querySelector('.news-header__keywords').textContent = 'По ключевым словам: ';
    const keywordPlace = document.createElement('span');
    keywordPlace.classList.add('news-header__keyword');
    document.querySelector('.news-header__keywords').appendChild(keywordPlace);
   const keywords = this._keyWordsRank(data);

   if (keywords.length >= 3) {
       if (keywords.length === 3) {
        keywordPlace.textContent = `${keywords[0].word}, ${keywords[1].word} и ${keywords[2].word}`;
       } else {
        keywordPlace.textContent = `${keywords[0].word}, ${keywords[1].word} и ${keywords.length -2} другим`;
       }
   } else if (keywords.length === 2) {
    keywordPlace.textContent = `${keywords[0].word} и ${keywords[1].word}`;
   } else {
    keywordPlace.textContent = `${keywords[0].word}`;
   }

  }


}

}
