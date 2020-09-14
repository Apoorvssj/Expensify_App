//this is for , locking user out of the app , so when the user is not logged in , user will not be able see components or use app , and can only see login page to login page, once user is logged in, user can than have access to the app

import React from 'react';
import {connect} from 'react-redux';
import {Route,Redirect} from 'react-router-dom';//when redirect renders it redirects you
import Header from '../components/Header';



//v6 f16

//rest operator ,  when we are creating objects or arrays we spread using spread operator by ...objectname , but when we are destrucutring an object lets say it is having 10 props in it, now we destructured 5 props that we needed separately , now to get all the stuff we didnot destructured we use Rest opertator by ...rest to get a rest variable , and rest is just a name , we can name it to anything

//destructuring
export const PrivateRoute = ({
    isAuthenticated,
    component: Component, //renaming to capital letter cuz we will be rendering it , good practice,not necessary
    ...rest
}) => (
    //impilictly returning jsx
    <Route {...rest} component={(props) => (
        //passing all the props that were passed to route
        //render the component if we are authenticated, if not will redirect to login page
        //implicityly returning jsx
        isAuthenticated ? (
            <div>
            <Header />
            <Component {...props} /> 
            </div>
        ) : (
            <Redirect to="/" />
        )
    )}/> // passing rest containing everything(like path,exact) except isAuthenticated and component,but we know Route in AppRouter.js(main router) requires components as well,so will pass it, by conditional logic, to control routing according to authentication
    //...props - props like history
);

//implicit return
const mapStateToProps = (state) => ({
    isAuthenticated: !!state.auth.uid
   // by state.auth.uid we will get undefined if unauthenticated and there is no uid , and we will get the user id string value is we are authenticated, but we need true or false , so flipping those in their actual boolean values by !!,now we will get true if authenticated, false otherwise
});

export default connect(mapStateToProps)(PrivateRoute);