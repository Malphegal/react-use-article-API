import React from 'react';
import './App.css';
import Articles from './Articles/Articles'
import ArticleFull from './Articles/ArticleFull'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App(){
	return (
		<Router>
			<Switch>
          		<Route exact path="/" component={ Articles } />
				<Route path="/article/:id" component={ ArticleFull } />
			</Switch>
		</Router>
	);
}

export default App;