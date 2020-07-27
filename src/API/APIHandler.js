const BASE_URL = 'http://localhost:8000/api/';

export default new class APIHandler{
    async getArticles(){
        const url = BASE_URL + "articles";
        return fetch(url)
            .then(response => response.json())
            .then(data => data["hydra:member"])
            .catch((error) => console.error(error));
    }

    async getArticle(id){
        const url = BASE_URL + `articles/${id}`;
        return fetch(url)
            .then(response => response.json())
            .catch((error) => console.error(error));
    }

    async getCommentsOf(id){
        const url = BASE_URL + `comments/${id}`;
        return fetch(url)
            .then(response => response.json())
            .catch((error) => console.error(error));
    }
}()