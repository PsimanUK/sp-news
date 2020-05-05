import React, { Component } from 'react';
import { Router } from '@reach/router';
import './App.css';
import Header from './components/Header';
import NavBar from './components/NavBar';
import Articles from './components/Articles';
import IndividualArticle from './components/IndividualArticle';

class App extends Component {

  state = { user: '' }

  render() {
    return (
      <div className="App">
        <Header />
        <br />
        <NavBar />
        <Router>
          <Articles path="/" />
          <Articles path="/topics/:topic_slug" />
          <IndividualArticle path="/:article_id" />
          <IndividualArticle path="/:article_id/comments" />
        </Router>
      </div>
    );
  }
}

export default App;
