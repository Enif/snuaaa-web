import React, { Component } from 'react';
import './App.css';
import Header from './components/Header'
import Aside from './components/Aside';
import Section from './components/Section/Section';
import Footer from './components/Footer';

class App extends Component {
    render() {
        return (
            <div>
                <Header /> 
                <div id="contents-wrapper">
                    <Aside class="aside-left" />
                    <Section/>
                    <Aside class="aside-right" />
                </div>
                <Footer />
            </div>
        );
    }
}

export default App;