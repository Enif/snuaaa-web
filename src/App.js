import React, { Component } from 'react';
import './App.css';
import Header from './components/Header'
import Aside from './components/Aside';
import Section from './containers/Section/Section';
import Footer from './components/Footer';

//[TODO] componentDidMount에서 token vaild 확인하여 login state 유지 시켜줘야함.(새로고침시 로그아웃 방지)
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