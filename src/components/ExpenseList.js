//exporting named export(unconnected version) as well to test it in ExpenseList.test.js,cuz default one is connected to the store

import React from 'react';
import {connect} from 'react-redux';//connect ,connects our components to the redux store
import ExpenseListItem from './ExpenseListItem';
import selectExpenses from '../selectors/expenses';

//stateless functional component,unconnected component,this component doesn't need to worry about store.subscribe or store.getstate,instead all of that is done for us by reat-redux,jwe need to just care about how to render,so it is a presentational component
export const ExpenseList = (props) => (
  <div className="content-container">
    <div className="list-header">
      <div className="show-for-mobile">Expenses</div>
      <div className="show-for-desktop">Expense</div>
      <div className="show-for-desktop">Amount</div>
    </div>
    <div className="list-body">
    {props.expenses.length === 0 ? (
        <div className="list-item list-item--message">
        <span>No expenses</span>
        </div>
      
    ) : (
      props.expenses.map((expense) => {
        return <ExpenseListItem key={expense.id} {...expense} />;
      })
    )}
    </div>
  </div>
);

//way1
//It maps the store state to the component's props
//we have access to state and props ,see EditExpensePage.js
//as the store changes this  is automatically gonna re run(cuz it is the state),this is the function returning a hoc
const mapStateToProps = (state) => {
    //name of the keys can be anything
    return {
        expenses: selectExpenses(state.expenses, state.filters)
    };
}
//connected version of ExpenseList
export default connect(mapStateToProps)(ExpenseList);//we call connect and we define the things we want to get off of the store(mapStateToProps),and we define the component (ExpenseList) that we want to crate the connected version ofand the end result is a brand new component(ExpenseList) which is just our component with the props from the store.
//also when using connect we if want to read or read and write to the store we have to use maStateToProps, but if we only want to write to the store we can only write like this = export default connect()(ExpenseList); no need to pass the state,just need to connect it to be able to access dispatch();like done in ExpenseListItem.js ,also eg for both read and write done in ExpenseListFilters.js

//way 2
// export default connect((state) => {
//     return {
//         expenses: state.expenses
//     }
// })(ExpenseList);

//way3
// const ConnectedExpenseList = connect((state) => {
//     return {
//         expenses: state.expenses
//     }
// })(ExpenseList);

// export default ConnectedExpenseList;