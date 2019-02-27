import React from 'react';
import { Redirect } from 'react-router'
import AboutAAA from '../../components/About/aboutAAA';
import Contact from '../../components/About/contact';
import Equipment from '../../components/About/equipment';
import Observation from '../../components/About/observation';
import History from '../../components/About/history';
import Officers from '../../components/About/officers';

class About extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            aboutIndex: this.props.match.params.aaa,
        }
    }

    static getDerivedStateFromProps(props, state) {
        return {
            aboutIndex: props.match.params.aaa
        }
    }

    renderComponent = () => {
        if (this.state.aboutIndex === 'aboutAAA') return (<AboutAAA/>);
        else if (this.state.aboutIndex === 'contact') return (<Contact/>);
        else if (this.state.aboutIndex === 'equipment') return (<Equipment/>);
        else if (this.state.aboutIndex === 'observation') return (<Observation/>);
        else if (this.state.aboutIndex === 'history') return (<History/>);
        else if (this.state.aboutIndex === 'officers') return (<Officers/>);
        else return (<AboutAAA/>);
    }
    
    render() {
        console.dir(window.location)
        return (                               
            this.renderComponent()
        );
    }
}

export default About