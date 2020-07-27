
export default class NewsApi {
  constructor(config, keyword) {
      this.config = config;
      this.keyword= keyword;
  }
  getNews() {
    return this._newsRequest('GET');
  }

  _newsRequest() {
    return fetch(this.config.reqNewsString + 'q=' + this.keyword + this.config.apiKey)
      .then(document.querySelector('.news-result_type_prelouder').classList.remove('invisible'))
      .then(this._handleResult)
      .catch(this._handleError);
  }

  _handleResult(res) {
    if (res.ok) {

      return res.json();
    }
  }

  _handleError(e) {
    return { error: e };
  }

}
