import React from 'react';
import ImageHandler from '../API/ImageHandler';
import APIHandler from '../API/APIHandler';
import Comment from './Comment';

export default class articleFull extends React.Component{
    
    // ---- CONSTRUCTORS ----
    
    constructor(props) {
        super(props);
        this.state = {
            article: undefined,
            image: undefined,
            comments: [],
        };
    }

    // ---- METHODS ----

    componentDidMount(){
        APIHandler.getArticle(this.props.match.params.id).then(data => this.setState({ article: data }, () => {
            let image = data["image"];
            if (image !== undefined)
                ImageHandler.getArticleImage(image).then(data => this.setState({ image: data }));
            let comments = data["comments"];
            comments.forEach(c => {
                APIHandler.getCommentsOf(c.split('/').pop()).then(data => this.setState({ comments: [...this.state.comments, data] }));
            });
        }));
    }

    render(){
        let article = this.state.article;
        if (article !== undefined)
            return <div className="articleShortContainer">
                <div className="articleShortNameContainer">
                    <h3 className="articleShortName">{ article["name"] }</h3>
                </div>
                { this.state.image !== undefined ? <img alt="" src={ this.state.image } className="articleShortImage"/> : undefined }
                <p>{ article["description"] }</p>
                <h4>Commentaires :</h4>
                { this.state.comments.map((i, index) => <Comment comment={ i } key={ index } />) }
            </div>
        return null;
    }
}