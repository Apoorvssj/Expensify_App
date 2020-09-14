import React from 'react';
import { Router, Route, Switch, Link ,NavLink} from 'react-router-dom';
import { createBrowserHistory } from 'history';
import ExpenseDashboardPage from '../components/ExpenseDashboardPage';
import AddExpensePage from '../components/AddExpensePage';
import EditExpensePage from '../components/EditExpensePage';
import NotFoundPage from '../components/NotFoundPage';
import LoginPage from '../components/LoginPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
//Route will be chnaged to our definded privateroute,to control routing according to user authentication(wether user is logged in ,he can go anywhere in app, but if logged out ,should only see login page and cannot go to any url without logging in)

//for LoginPage route will be changed to PublicRoute, explained in PublicRoute.js

//all the components separated to different componenets , real AppRouter.js
//So leaving this example in playground folder in renaming it AppRouter_example.js


 
 //browser router needs to go  - v3 f16 becoz, we need to use history api outside of the context of  component registered to a route in app.js for firebase.auth().onAuthStateChanged,so we have manually  do register browser history
 // first install history npm package,which react router was doing for us behind the scenes, create history,then swutch browserRouter which uses browser history by default and change it to Router to pass in our history
 //router is changed to private rout explained above

 export const history = createBrowserHistory();


   //using shorthand(impicit return)
   //header will not have all the props pased by Route to components cuz its not its component
   const AppRouter = () => (
    //  <BrowserRouter>
    <Router history={history}>
    <div>
    <Switch>
    <PublicRoute path="/" component={LoginPage} exact={true} />
    <PrivateRoute path="/dashboard" component={ExpenseDashboardPage} />
    <PrivateRoute path="/create" component={AddExpensePage} />
    <PrivateRoute path="/edit/:id" component={EditExpensePage} />
    <Route component={NotFoundPage} />
  </Switch>
    </div>
    </Router>
   );

   export default AppRouter;

