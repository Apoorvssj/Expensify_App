import React from 'react';
import {shallow} from 'enzyme';
import {AddExpensePage} from '../../components/AddExpensePage';
import expenses from '../fixtures/expenses';


//test case changed to test async action in v3 f15
//addexpense changed to startAddExpense

//global lifecycle methods , for avoiding redudancy, see jest docs and v14 f12
let startAddExpense,history,wrapper;
beforeEach(() => {
    //giving fresh copies(version) of thses before each test case,it will run this code before each test case
    startAddExpense = jest.fn(); //spy
     history = { push: jest.fn() };//spy
     wrapper = shallow(<AddExpensePage startAddExpense={startAddExpense} history={history}/>);
});


test('should render AddExpensePage correctly',() => {
    expect(wrapper).toMatchSnapshot();
});

test('should handle onSubmit', () => {
    //calling onSubmit() method of class AddExpensePage and passing our dummy data in it
    wrapper.find('ExpenseForm').prop('onSubmit')(expenses[1]);//with this we passed real correct data and successfully ran all of the code in onSubmit method of class AddExpensePage
    //now we can make some assertions,to check if our spies were called with correct data
    expect(history.push).toHaveBeenLastCalledWith('/');
    expect(startAddExpense).toHaveBeenLastCalledWith(expenses[1]);
});