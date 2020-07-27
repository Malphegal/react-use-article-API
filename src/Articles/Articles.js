import React from 'react';
import ArticleShort from './ArticleShort';
import API from '../API/APIHandler';
import './Articles.css';

export default class MyClass extends React.Component{

    // ---- CONSTRUCTORS ----
    
    constructor(props) {
        super(props);
        this.state = {
            articles: undefined
        };
    }

    componentDidMount(){
        API.getArticles().then(data => this.setState({ articles: data }));
    }
    
    render(){
        return <div>
                <h2>Nos articles</h2>
            <div className="articlesContainer">
                { this.state.articles !== undefined
                    ? this.state.articles.map((i, index) => <ArticleShort key={ index } article={ i } />)
                    : undefined }
            </div>
        </div>
    }
}