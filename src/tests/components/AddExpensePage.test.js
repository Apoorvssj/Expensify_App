import React from 'react';
import {shallow} from 'enzyme';
import {AddExpensePage} from '../../components/AddExpensePage';
import expenses from '../fixtures/expenses';


//global lifecycle methods , for avoiding redudancy, see jest docs and v14 f12
let addExpense,history,wrapper;
beforeEach(() => {
    //giving fresh copies(version) of thses before each test case,it will run this code before each test case
     addExpense = jest.fn(); //spy
     history = { push: jest.fn() };//spy
     wrapper = shallow(<AddExpensePage addExpense={addExpense} history={history}/>);
});


test('should render AddExpensePage correctly',() => {
    expect(wrapper).toMatchSnapshot();
});

test('should handle onSubmit', () => {
    //calling onSubmit() method of class AddExpensePage and passing our dummy data in it
    wrapper.find('ExpenseForm').prop('onSubmit')(expenses[1]);//with this we passed real correct data and successfully ran all of the code in onSubmit method of class AddExpensePage
    //now we can make some assertions,to check if our spies were called with correct data
    expect(history.push).toHaveBeenLastCalledWith('/');
    expect(addExpense).toHaveBeenLastCalledWith(expenses[1]);
});