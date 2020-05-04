import React from 'react';
import './App.css';
import Header from './components/Header';
import NavBar from './components/NavBar';
import MainBody from './components/MainBody';

function App() {
  return (
    <div className="App">
      <Header />
      <br />
      <NavBar />
      <MainBody />
    </div>
  );
}

export default App;
