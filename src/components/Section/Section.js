import React from 'react';
import { withRouter } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import { Home, About } from '../../pages';

class Section extends React.Component {

    render() {
        return (
            <section>
                <Route exact path="/" component={Home}/>
                <Route path="/about" component={About}/>
                {/* <Home/> */}
            </section>
        );
    }
}

export default withRouter(Section);