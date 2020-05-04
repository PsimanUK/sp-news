import React from 'react';
import { Router } from '@reach/router';
import './App.css';
import Header from './components/Header';
import NavBar from './components/NavBar';
import Articles from './components/Articles';
import IndividualArticle from './components/IndividualArticle';

function App() {
  return (
    <div className="App">
      <Header />
      <br />
      <NavBar />
      <Router>
        <Articles path="/" />
        <Articles path="/topics/:topic_slug" />
        <IndividualArticle path="/:article_id" />
      </Router>
    </div>
  );
}

export default App;
