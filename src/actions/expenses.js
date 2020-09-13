import { v4 as uuidv4 } from 'uuid';
import database from '../firebase/firebase';

//changed in v2 f15

//------see expenses-action-before-async.js in playground , to see before asynchronous action generator
//using startAddExpense as the function for async action(middle thunk needed,to dispatch functions)

//now in every other file where we dispatched addExpense, we will change that to startAddExpense , in AddExpensePage.js


// ADD_EXPENSE action generator
export const addExpense = (expense) => ({
    type: 'ADD_EXPENSE',
    expense
});

//alternate way of setting up defualt values,rather than in function argument as done in old file in playground

export const startAddExpense = (expenseData = {}) => {
    //retuning a function not object,
    //this function is internally called by redux with dispatch
    return (dispatch) => {
        //destructuring expenseData , to set defualts
        const {
            description = '',
            note = '',
            amount = 0,
            createdAt = 0
        } = expenseData;
        //es6 shortcut syntax to define properties in objects
        const expense = {description, note, amount, createdAt};
        //retuning for promise chaining in expense.test.js in actions
        return database.ref('expenses').push(expense).then((ref) => {
            //to change store
            dispatch(addExpense({
                id: ref.key, //now id is generated by firebase so need of uuid
                ...expense
            }));
        });
    };
};

//REMOVE_EXPENSE action generator
//default value is not needed for id, id : id using shorthand
export const removeExpense = ({id} = {}) => ({
    type: 'REMOVE_EXPENSE',
    id 
    
});

//EDIT_EXPENSE action generator
//no need to set defualts,becoz if dont have the id we wont be updating it in the first place
export const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});