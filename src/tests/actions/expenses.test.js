//done() lets jest know, to not to consider a test success or failure until done() is callled

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {startAddExpense,addExpense, editExpense, removeExpense, setExpenses, startSetExpenses, startRemoveExpense} from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

//test changed in v3 f15 for async action

//we will call this over and over again in all of our test cases,here we are creating a configuration,so we can allow the test cases to all create the same mock store
const createMockStore = configureMockStore([thunk]);

//setting dummy data to firebase , but remeber our mock data is different , in firebase we require our mock data to be set with unique ids as childs to root node
beforeEach((done) => {
    const expenseData = {};
    //destructuring and returning a object with unique id to hold them in database
    expenses.forEach(({ id, description, note, amount, createdAt }) => {
        //es6 shorthand
        expenseData[id] = { description, note, amount, createdAt };
    });
    database.ref('expenses').set(expenseData).then(() => done());//using done , to make beforEach wait for this to complete,if not some test cases may run before the data gets saved
});

test('should setup remove expense action object', () =>{
    const action = removeExpense({ id: '123abc' });
    //we are gonna pass in the object in toBe we would expect to get back from removeExpense()
    //toBe is not gonna work when comparing arrays or objects,as we need to compare there properties not themselves as they will be false, so use toEqual //v2 f12
    expect(action).toEqual({ 
        type: 'REMOVE_EXPENSE',
        id: '123abc'
    });
});

test('should setup edit expense action object', () =>{
    const action = editExpense('123abc', {note: 'New note value'});
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: '123abc',
        updates: {
            note: 'New note value'
        }
    });
});

test('should setup add expense action object with the provided values', () => {
    const action = addExpense(expenses[2]);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: expenses[2]
    });
});

// test('should setup add expense action object with the provided values', () => {
//     const expenseData = {
//         description: 'Rent',
//         amount: 109500,
//         createdAt: 1000,
//         note: 'This was last months rent'
//     };
//     const action = addExpense(expenseData);
//     expect(action).toEqual({
//         type: 'ADD_EXPENSE',
//         expense: {
//             ...expenseData,
//             //now id is generated at random here ,so we are gonna use expect.any() ,this allows us to just assert something about the type(we say hey we expect this to be an object a boolean a no. a string,etc.)
//             id: expect.any(String)
//         }
//     });
// });

// test('should setup add expense action object with defualt values', () => {
//     const action = addExpense();
//     expect(action).toEqual({
//         type: 'ADD_EXPENSE',
//         expense: {
//             id: expect.any(String),
//             description: '',
//             note: '',
//             amount: 0,
//             createdAt: 0
//         }
//     });
// });

//adding 2 new tests to test async addexpense action--------------------------
//need to import configureMockStore and thunk
//currently these test cases are writing to the real database, we need to create a separate test databse for them, v5 f15 
test('should add expense to database and store', (done) => {
    const store = createMockStore({});
    const expenseData = {
        description: 'Mouse',
        amount: 3000,
        note: 'This one is better',
        createdAt: 1000
    };
     //using promise chaining , now we can make some assertions knowing that the data should have been saved to firebase and the action should have been disppatched
    store.dispatch(startAddExpense(expenseData)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseData
            }
        });
        //this id is the one firebase provided
        //retuning promise in promise chaining
        return database.ref(`expenses/${actions[0].expense.id}`).once('value');
       
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseData);
        done(); // need to tell jest itt is a asynchronus test, now it will wait until firebase to complete,then we run assertions, and then say we are done making assertions
    });;

});

test('should add expense with defaults to database and store', (done) => {
    const store = createMockStore({});
    const expenseDefaults = {
        description: '',
        amount: 0,
        note: '',
        createdAt: 0
    };
    store.dispatch(startAddExpense({})).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseDefaults
            }
        });
        return database.ref(`expenses/${actions[0].expense.id}`).once('value');
       
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseDefaults);
        done(); 
    });;
});

//----------------for set expenses------------------------------
test('should setup set expense action object with data', ()=> {
    const action = setExpenses(expenses);
    expect(action).toEqual({
        type: 'SET_EXPENSES',
        expenses
    });
});

test('should fetch the expenses from firebase', (done) => {
    const store = createMockStore({});
    store.dispatch(startSetExpenses()).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'SET_EXPENSES',
            expenses
        });
        done();
    });
});

//------------------------async test case for startRemoveExpense
test('should remove expense from firebase', (done) => {
    const store = createMockStore({});
    const id = expenses[2].id;
    store.dispatch(startRemoveExpense({ id })).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'REMOVE_EXPENSE',
            id
        });
        //returning promise to pass it to next then(),//promise chaning
        return database.ref(`expenses/${id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toBeFalsy(); //snapshot.val will return null, cuz that expense was deleted
        done();
    });
});