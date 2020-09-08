import React from 'react';
import { BrowserRouter, Route, Switch, Link ,NavLink} from 'react-router-dom';
import ExpenseDashboardPage from '../components/ExpenseDashboardPage';
import AddExpensePage from '../components/AddExpensePage';
import EditExpensePage from '../components/EditExpensePage';
import HelpPage from '../components/HelpPage';
import NotFoundPage from '../components/NotFoundPage';
import Header from '../components/Header';

//all the components separated to different componenets , real AppRouter.js
//So leaving this example in playground folder in renaming it AppRouter_example.js


 
 


   //using shorthand(impicit return)
   //header will not have all the props pased by Route to components cuz its not its component
   const AppRouter = () => (
    <BrowserRouter>
    <div>
    <Header />
    <Switch>
    <Route path="/" component={ExpenseDashboardPage} exact={true}/>
    <Route path="/create" component={AddExpensePage} />
    <Route path="/edit/:id" component={EditExpensePage} />
    <Route path="/help" component={HelpPage} />
    <Route component={NotFoundPage} />
  </Switch>
    </div>
    </BrowserRouter>
   );

   export default AppRouter;