import React from 'react';
import { withRouter } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import { Home, About, SignUp } from '../../pages';

class Section extends React.Component {

    render() {
        return (
            <section>
                <Route exact path="/" component={Home}/>
                <Route path="/about" component={About}/>
                <Route path="/signup" component={SignUp}/>
                {/* <Home/> */}
            </section>
        );
    }
}

export default withRouter(Section);