import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Header from '../components/Header'
import Aside from '../components/Aside';
import Section from '../components/Section/Section';

class App extends Component {
    render() {
        return (
            <div>
                <Header /> 
                <div id="contents-wrapper">
                    <Aside />
                    <BrowserRouter>
                        <Section/>
                    </BrowserRouter>
                </div>
                
                
            </div>
        );
    }
}

export default App;