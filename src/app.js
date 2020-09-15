import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';//Provider component is going to allow us to provide the store to all of the components that make up ou app.
import AppRouter, {history} from './routers/AppRouter';
import configureStore from './store/configureStore';
// import {addExpense} from './actions/expenses';
import {startSetExpenses} from './actions/expenses';
import {login,logout} from './actions/auth';
import getVisibleExpenses from './selectors/expenses';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
import {firebase} from './firebase/firebase';
// import './playground/promises';
import LoadingPage from './components/LoadingPage'


const store = configureStore();
/*
 store.dispatch(addExpense({description: 'Water bill', amount: 4500 }));
 store.dispatch(addExpense({description: 'Gas bill', createdAt: 1000 }));
 store.dispatch(addExpense({description: 'Rent', amount: 109500 }));
// store.dispatch(setTextFilter('water'));

const state = store.getState();
    const visibleExpenses = getVisibleExpenses(state.expenses,state.filters);
    console.log(visibleExpenses);

 */   

const jsx = (
    //provider takes a prop (store) 
    <Provider store={store}>
    <AppRouter />
    </Provider>
);

//refactoring done in v4 f16
let hasRendered = false;
const renderApp = () => {
    //check we are not rendered yet, and render the app
    if(!hasRendered) {
        ReactDOM.render(jsx ,document.getElementById('app'));
        hasRendered = true;
    }
};

 ReactDOM.render(<LoadingPage /> ,document.getElementById('app'));
 

 //this function keeps track the state of authentication
 //it runs the callback func. when the authentication status chnages
 firebase.auth().onAuthStateChanged((user) => {
     if(user) {
         store.dispatch(login(user.uid));//user auth id
 //loading, and then as sson as data comes ,it will dispatch to render our jsx, to render all the expenses
 store.dispatch(startSetExpenses()).then(() => {
    renderApp();
    //if user is loggen in, and is on login page,redirect user to dashboard page
    if(history.location.pathname === '/') {
        history.push('/dashboard');
    }
 });
}else {
    store.dispatch(logout());
    renderApp();
    history.push('/')
};
 });

