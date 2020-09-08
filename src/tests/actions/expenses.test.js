import {addExpense, editExpense, removeExpense} from '../../actions/expenses';

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
    const expenseData = {
        description: 'Rent',
        amount: 109500,
        createdAt: 1000,
        note: 'This was last months rent'
    };
    const action = addExpense(expenseData);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            ...expenseData,
            //now id is generated at random here ,so we are gonna use expect.any() ,this allows us to just assert something about the type(we say hey we expect this to be an object a boolean a no. a string,etc.)
            id: expect.any(String)
        }
    });
});

test('should setup add expense action object with defualt values', () => {
    const action = addExpense();
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            id: expect.any(String),
            description: '',
            note: '',
            amount: 0,
            createdAt: 0
        }
    });
});