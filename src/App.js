import React from 'react';
import './App.css';
import Articles from './Articles/Articles'
import ArticleFull from './Articles/ArticleFull'
import ArticleNew from './Articles/ArticleNew'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from './Template/Header';

function App(){
	return <>
		<Header />
		<Router>
			<Switch>
          		<Route exact path="/" component={ Articles } />
				<Route exact path="/article/new" component={ ArticleNew } />
				<Route path="/article/:id" component={ ArticleFull } />
			</Switch>
		</Router>
	</>
}

export default App;