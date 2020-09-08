import React from 'react';
import {connect} from 'react-redux';
import ExpenseForm from './ExpenseForm';
import {addExpense} from '../actions/expenses';

//v14 f12
//changing to class based component to avoid defining onSubmit function inline(which gets recalculated and redefined on every render),instead we will reference it

export class AddExpensePage extends React.Component {
   onSubmit = (expense) => {
// props.dispatch(addExpense(expense));//added all the data to the redux store
this.props.addExpense(expense);//adding this in order to test
this.props.history.push('/');//one of many props provided by router(can see components dev tools),without refresh it will got to dashboard page using browser routing,it is exactly equal to clicking a link
   };
   render() {
      return (
         <div>
         <h1>Add Expense</h1>
         <ExpenseForm 
           onSubmit={this.onSubmit}/>
      </div>
      );
   }
}
  

//export default AddExpensePage; without connect

//added this in order to test, as addExpense was an imported function,v14 f12,it is a way to return your dispatcher functions allowing you to abstract them away from the component,seee react-redux docs
const mapDisptachToProps = (dispatch) => ({
   addExpense: (expense) => dispatch(addExpense(expense))
});

export default connect(undefined, mapDisptachToProps)(AddExpensePage); //first argument in mapStatesToProp,we dont need it so undefined