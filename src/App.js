import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Header from './components/Header'
import Aside from './components/Aside';
import Section from './components/Section/Section';

class App extends Component {
  render() {
    return (
      <div>
{/*         <Header /> */}
        <Aside />
        <Section/>
      </div>
    );
  }
}

export default App;
