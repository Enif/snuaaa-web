import React from 'react';
import { Route } from 'react-router-dom';
import Header from 'containers/Header'
import Footer from 'components/Footer';

function DefaultRoute({ component: Component, ...rest }) {
    return (
        <Route {...rest} render={routeProps => (
            <>
                <Header />
                <div className="section-wrapper">
                    <section>
                        <Component {...routeProps} />
                    </section>
                </div>
                <Footer />
            </>
        )}
        />
    )
}

export default DefaultRoute;
