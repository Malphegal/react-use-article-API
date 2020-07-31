import React from 'react';
import './ArticleShort.css';
import { Link } from "react-router-dom";
import ImageHandler from '../API/ImageHandler';

export default class Article extends React.Component{

    // ---- CONSTRUCTORS ----
    
    constructor(props) {
        super(props);
        this.state = {
            image: undefined,
        };
    }

    // ---- METHODS ----

    componentDidMount(){
        let image = this.props.article["image"];
        if (image !== undefined)
            ImageHandler.getArticleImage(image).then(data => this.setState({ image: data }))
        else
            ImageHandler.getDefaultArticleImage().then(data => this.setState({ image: data }));
    }

    render(){
        return <Link to={ "/article/" + this.props.article["id"] }><div className="articleShortContainer">
            <div className="articleShortNameContainer">
                <h3 className="articleShortName">{ this.props.article["name"] }</h3>
            </div>
            { this.state.image !== undefined ? <img alt="" src={ this.state.image } className="articleShortImage"/> : undefined }
        </div></Link>
    }
}
