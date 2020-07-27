const BASE_URL = "http://localhost:8005/image/";
const BASE_URL_ARTICLE = BASE_URL + "article/";

export default new class ImageHandler{
    async getArticleImage(path){
        let url = BASE_URL_ARTICLE + path;
        return fetch(url)
            .then(response => response.url);
    }
}()