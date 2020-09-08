import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';


test('should set default state', () => {
    const state = expensesReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual([]);
});

test('should remove expense by id', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: expenses[1].id 
    };
    const state = expensesReducer(expenses, action); //test data expenses array which we improted
    // rent of position 1 should be removed
    expect(state).toEqual([expenses[0], expenses[2]]);
});

test('should not remove expense if id not found', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: '-1' //doesnot exist in fixtures expenses array
    };
    const state = expensesReducer(expenses, action); 
    expect(state).toEqual(expenses);
});

test('should add an expense', () => {
    const expense = {
        id: '109',
        description: 'Laptop',
        note: '',
        amount: 29500,
        createdAt: 20000
    };
    const action = {
        type: 'ADD_EXPENSE',
        expense
    };
    const state = expensesReducer(expenses, action);
    //expect(state).toEqual(expenses.concat(expense)); or
    expect(state).toEqual([...expenses, expense]);
});

test('should edit an expense by id', () => {
    const amount = 122000;
    const action = {
        type: 'EDIT_EXPENSE',
        id: expenses[1].id,
        updates: {
            amount
        }
    };
    const state = expensesReducer(expenses, action);
    expect(state[1].amount).toEqual(amount);
});

test('should not edit an expense if id not found', () => {
    const amount = 122000;
    const action = {
        type: 'EDIT_EXPENSE',
        id: '-1', //this id doenot exist in expenses array which is imported
        updates: {
            amount
        }
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual(expenses);
});