import React from 'react';
import {shallow} from 'enzyme';
import moment from 'moment';
import toJSON from 'enzyme-to-json';
import ExpenseForm from '../../components/ExpenseForm';
import expenses from '../fixtures/expenses';

//test will fail cuz we are using moment() instance to get the current date back,which will change everytime we run test so snapshots will be different,a snapshot will never be equal to previuous one
//To fix this we will be mocking(creating a fake version) of the moment library,which allows us to define what happens when the code actually calls this,to return a moment() at an specific point in time.

test('should render ExpenseForm correctly', () => {
    const wrapper = shallow(<ExpenseForm />);//render expense form
    expect(toJSON(wrapper)).toMatchSnapshot();
});

test('should render ExpenseForm correctly with expense data', () => {
    const wrapper = shallow(<ExpenseForm expense={expenses[1]}/>);
    expect(toJSON(wrapper)).toMatchSnapshot();
});

//------------------User Interaction -----------------------

//in simulate we write string corresponding to the event like -  for onSubmit event ,onClick event,onChange event we write submit,click,change respectively

//for onSubmit event handler function(by us) ,when error value changes,it sets state to correct value
test('should render error for invalid form submission',() => {
    const wrapper = shallow(<ExpenseForm />);
    expect(toJSON(wrapper)).toMatchSnapshot();//before error state shows up
    //now for user interaction we will simulate it,find takes in by id ,by class or in this case tag name
    //first argument is the event , we are typing in submit,in expeenseform onSubmit handler expects e object so to pass it , we can do it by second argument
    wrapper.find('form').simulate('submit', {
        preventDefault: () => {} //it was  what used through e in onSubmit handler , so defining to fake it , to use it in our tests
    });
    expect(wrapper.state('error').length).toBeGreaterThan(0);//by default error is empty , so after we submit form by simulation we can have error state value
    expect(toJSON(wrapper)).toMatchSnapshot();//snapshot after error state chnages
});

//for onChange event handler function(by us) ,when discription value changes,it sets state to correct value
test('should set description on input change', () => {
    const value = 'New description';
    const wrapper = shallow(<ExpenseForm />);
    //accessing first input (by using at) which is for the description input,need to use fetch by index cuz we have multiplle inputs in expense form
    wrapper.find('input').at(0).simulate('change', {
        target: {value} //cuz in expenseform we have e.target.value ,so to fake e in it
    });
    expect(wrapper.state('description')).toBe(value);
});

//for onNoteChange
test('should set note on textarea change', () => {
    const value = 'New note for text area'
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('textarea').simulate('change',{
        target: {value}
    });
    expect(wrapper.state('note')).toBe(value);//accessing state by .state ,use .state() only to read entire state
});

//for onAmountChange with valid amount(input)
test('should set amount if valid input', () => {
    const value = '23.50'
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('input').at(1).simulate('change',{
        target: {value}
    });
    expect(wrapper.state('amount')).toBe(value);//accessing state by .state
});

//for onAmountChange with invalid amount(input)
test('should set amount if invalid input', () => {
    const value = '12.122'
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('input').at(1).simulate('change',{
        target: {value}
    });
    expect(wrapper.state('amount')).toBe('');//accessing state by .state
});

//--------spies---------------

//whole goal of spies is to create functions that are fake functions ,created by jest for us, and we can make assertions about them like check if fake func. was called or called 5 times or called with specific arguments,etc. 

//spy for this.props.onSubmit,when we have valid data error gets cleared and prop onSubmit gets called with the correct stuff
test('should call onSubmit prop for valid form submission', () => {
    const onSubmitSpy = jest.fn(); // retuens a spy
    /*
    onSubmitSpy();//calling
    expect(onSubmitSpy).toHaveBeenCalled();//this will through an error if our spy was never called
    */
//    onSubmitSpy('Apoorv', 'India');
//    expect(onSubmitSpy).toHaveBeenCalledWith('Apoorv', 'India');
    const wrapper = shallow(<ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy}/>);
    wrapper.find('form').simulate('submit', {
        preventDefault: () => {} 
    });
    expect(wrapper.state('error')).toBe('');
    //now we want to check what it was called with =  the object we are hoping for
    expect(onSubmitSpy).toHaveBeenLastCalledWith({
        //defining exact obj becos expenses have id property as well,which we dont have in this.props.onSubmit in ExpenseForm
        description: expenses[0].description,
        amount: expenses[0].amount,
        note: expenses[0].note,
        createdAt: expenses[0].createdAt
    });//to make sure that the spy was not just called but called with the correct stuff

});

//not working due to something with SingleDatePicker it is 3rd party component 
/*

test('should set new date on date change', () => {
    const now = moment(); 
    const wrapper = shallow(<ExpenseForm />);
    //in enzyme docs, we can use props to access all of them or just get on using prop(key)
    wrapper.find('SingleDatePicker').prop('onDateChange')(now);
    expect(wrapper.state('createdAt')).toEqual(now);
});

test('should set calender focus on change', () => {
    const focused = true;
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('SingleDatePicker').prop('onFocusChange')({focused});
    expect(wrapper.state('calenderFocused')).toBe(focused);
});
*/
