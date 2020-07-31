const BASE_URL = 'http://localhost:8000/api/';

export default new class APIHandler{

    // ---- GET

    async getArticles(){
        const url = `${BASE_URL}articles`;
        return fetch(url)
            .then(response => response.json())
            .then(data => data["hydra:member"])
            .catch((error) => console.error(error));
    }

    async getArticle(id){
        const url = `${BASE_URL}articles/${id}`;
        return fetch(url)
            .then(response => response.json())
            .catch((error) => console.error(error));
    }

    async getCommentsOf(id){
        const url = `${BASE_URL}comments/${id}`;
        return fetch(url)
            .then(response => response.json())
            .catch((error) => console.error(error));
    }

    async getTagName(id){
        const url = `${BASE_URL}tags/${id}`;
        return fetch(url)
            .then(response => response.json())
            .then(data => data.label)
            .catch((error) => console.error(error));
    }

    // ---- POST

    async createArticle(values){
        const url = `${BASE_URL}articles`;
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: values
        };
        return fetch(url, requestOptions)
            .then(response => response.json())
            .then(data => data.id);
    }

    async createComment(values){
        const url = `${BASE_URL}comments`;
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: values
        };
        return fetch(url, requestOptions)
            .then(response => response.json());
    }
}()