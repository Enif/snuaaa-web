import React from 'react';
import AboutAAA from './contents/aboutAAA';
import Contact from './contents/contact';
import Equipment from './contents/equipment';
import Observation from './contents/observation';
import History from './contents/history';
import Officers from './contents/officers';

class About extends React.Component {

    state = {
        aboutIndex: 0
    }

    setIndex = (index) => {
        this.setState({
            aboutIndex: index
        })
    }

    //TODO : If aboutIndex doesn't change, component shouldn't update;
    
    render() {
        return (
            <div>
                <div className="intro-div-wrapper" id="intro-top">
                    <a onClick={(e) => this.setIndex(0)} className="intro-title"><p>AAA는?</p></a>
                    <a onClick={(e) => this.setIndex(1)} className="intro-title"><p>찾아오는 길 &amp; 연락처</p></a>
                    <a onClick={(e) => this.setIndex(2)} className="intro-title"><p>장비소개</p></a>
                    <a onClick={(e) => this.setIndex(3)} className="intro-title"><p>김태영 기념관측소 소개</p></a>
                    <a onClick={(e) => this.setIndex(4)} className="intro-title"><p>동아리발자취</p></a>
                    <a onClick={(e) => this.setIndex(5)} className="intro-title"><p>역대 회장단 / 임원진</p></a>
                </div>
                
                {
                    (() => {
                        console.log(this.state.aboutIndex);
                        if (this.state.aboutIndex == 0) return (<AboutAAA/>);
                        if (this.state.aboutIndex == 1) return (<Contact/>);
                        if (this.state.aboutIndex == 2) return (<Equipment/>);
                        if (this.state.aboutIndex == 3) return (<Observation/>);
                        if (this.state.aboutIndex == 4) return (<History/>);
                        if (this.state.aboutIndex == 5) return (<Officers/>);
                    })()
                }
            </div>
        );
    }
}

export default About