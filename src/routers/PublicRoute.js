//tackilng opposite of private route
//now issue is even if the user is  logged in , user can visit to the login page(to login) by  clicking dashboard link or default on
//if the user is logged in , there is no reason for the login page to be shown to user , so public route is created to make login page unaccessible for the logged in user, and login page should only be available for  unthenticated/logged out users

//PublicRoute will be only used for LoginPage in AppRouter.js

//v6,v7 in f16

import React from 'react';
import {connect} from 'react-redux';
import {Route,Redirect} from 'react-router-dom';

//everything explained in prev. PrivateRooute.js

//destructuring
export const PublicRoute = ({
    isAuthenticated,
    component: Component,
    ...rest
}) => (
    //impilictly returning jsx
    <Route {...rest} component={(props) => (
        //render the component if we are not authenticated, if yes will redirect to dashboard page,dont worry PublicRoute will be only used for LoginPage in AppRouter.js
        //implicityly returning jsx
        isAuthenticated ? (
            <Redirect to="/dashboard" />
        ) : (
            <Component {...props} /> 
        )
    )}/>
    //...props - props like history
);

//implicit return
const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.uid
});

export default connect(mapStateToProps)(PublicRoute);