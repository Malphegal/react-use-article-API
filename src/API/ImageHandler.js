const PORT = 8080;
const BASE_URL = `http://localhost:${PORT}/image/`;
const BASE_URL_ARTICLE = BASE_URL + "article/";

const DEFAULT_ARTICLE_NAME = "noImage.png";

export default new class ImageHandler{
    async getArticleImage(path){
        let url = `${BASE_URL_ARTICLE}${path}`;
        return fetch(url)
            .then(response => response.url);
    }

    getDefaultArticleImage(){
        let url = `${BASE_URL_ARTICLE}${DEFAULT_ARTICLE_NAME}`;
        return fetch(url)
            .then(response => response.url);
    }
}()