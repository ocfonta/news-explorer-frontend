
const urlMainApi = process.env.NODE_ENV === 'development' ? 'http://mestopraktikum.xyz' : 'http://mestopraktikum.xyz';
const urlNewsApi = process.env.NODE_ENV === 'development' ? 'https://praktikum.tk/news/v2/everything' : 'https://praktikum.tk/news/v2/everything';
const date = Date.now();
const to = new Date(date);
const from = new Date(date - 7*24*3600*1000);
const configMain = {
  baseUrl: urlMainApi,
  headers: {
    'Content-Type': 'application/json',

  },
};
const configNews = {
  baseUrl: urlNewsApi,
  headers: {
    'Content-Type': 'application/json',

  },
  apiKey: '&apiKey=22c8c8593b864e1fb716d6c82fb18678',
  reqNewsString: urlNewsApi + '?' + 'language=ru&' + 'sortBy=popularity&' + 'pageSize=100&' + 'from=' + from.toISOString() + '&' + 'to=' + to.toISOString() + '&',
};

module.exports = {configMain, configNews};