import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import './ArticleNew.css';
import APIHandler from '../API/APIHandler';

export default class ArticleNew extends React.Component{
    
    // ---- CONSTRUCTORS ----

    constructor(props){
        super(props);
        this.state = {
            textarea: '',
        }
    }

    // ---- METHODS ----

    render(){
        return <div className="new-container">
            <h2>Nouvel article</h2>
            <Formik
                initialValues={{ name: '', description: '' }}
                validate = {values => {
                    const errors = {};

                    // -- Name
                    if (!values.name)
                        errors.name = "Il faut un nom à l'article !";
                    else if (values.name.length < 3)
                        errors.name = "Un nom d'article doit avoir au moins 3 caractères !";

                    // -- Description
                    if (!values.description)
                        errors.description = "Il faut un descriptif à l'article !";
                    else if (values.description.length < 10)
                        errors.description = "Une description doit au moins avoir 10 caractères !";

                    return errors;
                }}
                onSubmit = {(values, { setSubmitting }) => {
                    setTimeout(async () => {
                        let id = await APIHandler.createArticle(JSON.stringify(values, null, 0));
                        if (typeof id === "number")
                            window.location.replace(`/article/${id}`);
                        setSubmitting(false);
                    }, 400);
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <label>Nom de l'article</label>
                        <Field type="text" name="name" id="name" />
                        <ErrorMessage className="form-error" name="name" component="div" />
                        <label>Description de l'article</label>
                        <Field type="text" name="description" />
                        <ErrorMessage className="form-error" name="description" component="div" />
                        <button type="submit" disabled={ isSubmitting }>Créer</button>
                    </Form>
                )}
            </Formik>
        </div>
    }
}