  
export default class Api {
    constructor(config) {
        this.config = config;
        this.headers = config.headers;
    }
    getInitialCards() {
        return this.req('/cards', 'GET');
    }

    getUserInfo() {
        return this.req('/users/me', 'GET');
    }

    setUserInfo(name, about) {
        return this.patch('/users/me', 'PATCH', name, about);
    }

    uploadCards(placeName, placeLink){
        return this.post ('/cards', 'POST', placeName, placeLink);
    }

    delCards(cardId){
        return this.del ('/cards/', 'DELETE', cardId);
    }

    patch(url, method, name, about) {
        return fetch(
            this.config.baseUrl + url,
            {
                method: method,
                headers: this.headers,
                body: JSON.stringify({
                    name: name,
                    about: about
                })
            })
            .then(this.handleResult)
            .catch(this.handleError);
    }

    del(url, method, cardId) {
        return fetch(
            this.config.baseUrl + url + cardId,
            {
                method: method,
                headers: this.headers,
            })
            .then(this.handleResult)
            .catch(this.handleError);
    }

    post(url, method, placeName, placeLink) {
        return fetch(
            this.config.baseUrl + url,
            {
                method: method,
                headers: this.headers,
                body: JSON.stringify({
                    name: placeName,
                    link: placeLink
                })
            })
            .then(this.handleResult)
            .catch(this.handleError);
    }

    req(url) {
        return fetch(this.config.baseUrl + url, this.config)
            .then(this.handleResult)
            .catch(this.handleError);
    }


    handleResult(res) {
        if (res.ok) {
            return res.json();
        }
    }

    handleError(e) {
        return {error: e};
    }
}