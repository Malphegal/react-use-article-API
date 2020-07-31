import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import ImageHandler from '../API/ImageHandler';
import APIHandler from '../API/APIHandler';
import Comment from './Comment';
import './ArticleFull.css';

export default class ArticleFull extends React.Component{
    
    // ---- CONSTRUCTORS ----
    
    constructor(props) {
        super(props);
        this.state = {
            article: undefined,
            image: undefined,
            comments: [],
            tags: [],
        };
    }

    // ---- METHODS ----

    componentDidMount(){
        APIHandler.getArticle(this.props.match.params.id).then(data => this.setState({ article: data }, () => {
            let image = data["image"];
            if (image !== undefined)
                ImageHandler.getArticleImage(image).then(data => this.setState({ image: data }));
            else
                ImageHandler.getDefaultArticleImage().then(data => this.setState({ image: data }));
            let comments = data["comments"];
            if (comments !== undefined)
                comments.forEach(c => {
                    APIHandler.getCommentsOf(c.split('/').pop()).then(data => this.setState({ comments: [...this.state.comments, data] }));
                });
            let tags = data["tags"];
            if (tags !== undefined)
                tags.forEach(c => {
                    APIHandler.getTagName(c.split('/').pop()).then(data => this.setState({ tags: [...this.state.tags, data] }));
                });
        }));
    }

    commentForm(){
        return <Formik
            initialValues={{ content: '' }}
            validate = {values => {
                const errors = {};

                // -- Content
                if (!values.content)
                    errors.content = "Il faut écrire quelque chose pour pouvoir poster !";
                else if (values.content.length < 10)
                    errors.content = "Vous devez écrire un message d'au moins 10 caractères !";

                return errors;
            }}
            onSubmit = {(values, { setSubmitting, setFieldValue }) => {
                setTimeout(async () => {
                    values.article = `/api/articles/${this.state.article.id}`;
                    let newComment = await APIHandler.createComment(JSON.stringify(values, null, 0));
                    this.setState({ comments: [...this.state.comments, newComment],  });
                    setFieldValue('content', '');
                    setSubmitting(false);
                }, 400);
            }}
        >
            {({ isSubmitting, setFieldValue }) => (
                <Form>
                    <label>Poster un commentaire </label>
                    <Field type="text" name="content" id="content" />
                    <ErrorMessage className="form-error" name="content" component="div" />
                    <button type="submit" disabled={ isSubmitting }>Poster</button>
                </Form>
            )}
        </Formik>;
    }

    render(){
        let article = this.state.article;
        if (article !== undefined && article['hydra:description'] === undefined)
            return <div id="article-full">
                <div id="article-container">
                    <div id="image-container">
                        <h2>{ article["name"] }{ this.state.tags.map((i, index) => <span className="tag" key={ index }>{ i }</span>) }</h2>
                        <img alt="Article" src={ this.state.image } />
                        <div id="description-container">
                            <h4>Description</h4>
                            <p>{ article["description"] }</p>
                        </div>
                    </div>
                </div>
                <div id="comments-container">
                    <h4>Commentaires :</h4>
                    { this.state.comments.map((i, index) => <Comment comment={ i } key={ index } />) }
                    { this.commentForm() }
                </div>
            </div>
        return null;
    }
}