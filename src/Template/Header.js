import React from 'react';
import './Header.css';

export default class Header extends React.Component{

    // ---- METHODS ----

    render(){
        return <div id="header">
            <nav>
                <ul>
                    <li>
                        <div className="hidden-div-container">
                            <span>Article</span>
                            <div className="hidden-div">
                                <a href="/">La liste des articles</a>
                                <a href="/article/new">Créer un article</a>
                            </div>
                        </div>
                    </li>
                </ul>
            </nav>
        </div>
    }
}