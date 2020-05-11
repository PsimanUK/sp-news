import React, { Component } from 'react';
import { Router } from '@reach/router';
import './App.css';
import Header from './components/Header';
import NavBar from './components/NavBar';
import Articles from './components/Articles';
import IndividualArticle from './components/IndividualArticle';
import ErrorFrame from './components/ErrorFrame';

class App extends Component {

  state = { user: 'weegembump', currentTopic: 'most popular' }

  render() {
    const { currentTopic, user } = this.state;
    return (
      <div className="App">
        <Header user={user} />
        <br />
        <NavBar currentTopicChanger={this.currentTopicChanger} />
        <Router>
          <Articles path="/" currentTopic={currentTopic} />
          <Articles path="/articles" currentTopic={currentTopic} />
          <Articles path="/topics/:topic_slug" currentTopic={currentTopic} />
          <IndividualArticle path="/articles/:article_id" username={this.state.user} />
          <ErrorFrame errorMessage="Error 404: path not found." default />
        </Router>
      </div>
    );
  }

  currentTopicChanger = (newTopic) => {
    this.setState({ currentTopic: newTopic })
  }
}

export default App;
