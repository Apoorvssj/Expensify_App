import {createStore,combineReducers} from 'redux';
import expensesReducer from '../reducers/expenses';
import filtersReducer from '../reducers/filters';

export default () => {
//Store creation
//combineReducers lets uss combine multiple reducers to the createStore,it takes object as an argument,whose key is going to be the root state name,and value is the reducer handling it
const store = createStore(
    combineReducers({
        expenses: expensesReducer,
        filters: filtersReducer
    }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() //done to connect store to redux dev tools in chrome
);

return store;
};

