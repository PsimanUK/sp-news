import React, { Component } from 'react';
import { Router } from '@reach/router';
import './App.css';
import Header from './components/Header';
import NavBar from './components/NavBar';
import Articles from './components/Articles';
import IndividualArticle from './components/IndividualArticle';
import ErrorFrame from './components/ErrorFrame';

class App extends Component {

  state = { user: 'weegembump' }

  render() {
    return (
      <div className="App">
        <Header user={this.state.user} />
        <br />
        <NavBar />
        <Router>
          <Articles path="/" />
          <Articles path="/articles" />
          <Articles path="/topics/:topic_slug" />
          <IndividualArticle path="/articles/:article_id" username={this.state.user} />
          <ErrorFrame errorMessage="Error 404: path not found." default />
        </Router>
      </div>
    );
  }
}

export default App;
