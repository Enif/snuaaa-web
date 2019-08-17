import React from 'react';
import { Route } from 'react-router-dom';
import Header from 'containers/Header';
import Footer from 'components/Footer';
import SideBar from 'components/Home/SideBar';
import RiseSet from 'components/Home/RiseSet';

function DefaultRoute({ component: Component, ...rest }) {
    return (
        <Route {...rest} render={routeProps => (
            <>
                <Header />
                <div className="section-wrapper">
                    <section>
                        <div className="side-left">
                            <RiseSet />
                        </div>
                        <SideBar />
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
