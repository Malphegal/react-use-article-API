import React from 'react';
import './Comment.css';

export default class Comment extends React.Component{

    // ---- METHODS ----

    computeDate(date){
        date = Date.parse(date);
        date = new Intl.DateTimeFormat('fr-FR').format(date);
        return date;
    }

    render(){
        let comment = this.props.comment;
        return <div className="comment">
            <p>{ this.computeDate(comment.createdAt) }</p>
            <p>{ comment.content }</p>
        </div>
    }
}