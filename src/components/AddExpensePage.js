import React from 'react';
import {connect} from 'react-redux';
import ExpenseForm from './ExpenseForm';
// import {addExpense} from '../actions/expenses';
import {startAddExpense} from '../actions/expenses';

//addExpense changed to startAddExpense in v2 f15, to enable async action

//v14 f12
//changing to class based component to avoid defining onSubmit function inline(which gets recalculated and redefined on every render),instead we will reference it

export class AddExpensePage extends React.Component {
   onSubmit = (expense) => {
// props.dispatch(addExpense(expense));//added all the data to the redux store
this.props.startAddExpense(expense);//adding this in order to test
this.props.history.push('/');//one of many props provided by router(can see components dev tools),without refresh it will got to dashboard page using browser routing,it is exactly equal to clicking a link
   };
   render() {
      return (
        <div>
          <div className="page-header">
            <div className="content-container">
              <h1 className="page-header__title">Add Expense</h1>
            </div>
          </div>
          <div className="content-container">
            <ExpenseForm onSubmit={this.onSubmit} />
          </div>
        </div>
      );
   }
}
  

//export default AddExpensePage; without connect

//added this in order to test, as addExpense was an imported function,v14 f12,it is a way to return your dispatcher functions allowing you to abstract them away from the component,seee react-redux docs
const mapDisptachToProps = (dispatch) => ({
   startAddExpense: (expense) => dispatch(startAddExpense(expense))
});

export default connect(undefined, mapDisptachToProps)(AddExpensePage); //first argument in mapStatesToProp,we dont need it so undefined