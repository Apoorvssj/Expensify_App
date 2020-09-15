import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
// import {editExpense, removeExpense} from '../actions/expenses';
import {startEditExpense, startRemoveExpense} from '../actions/expenses';

//refactored like AddExpensePage.js in v15 f12


//props.match.params.id is seen from console //v8 f9
export class EditExpensePage extends React.Component {
    onSubmit = (expense) => {
      this.props.startEditExpense(this.props.expense.id,expense);
      this.props.history.push('/');
    };
    onRemove = () => {
      this.props.startRemoveExpense({ id: this.props.expense.id });
      this.props.history.push('/');
    };
    render() {
       return (
         <div>
           <div className="page-header">
             <div className="content-container">
               <h1 className="page-header__title">Edit Expense</h1>
             </div>
           </div>
           <div className="content-container">
             <ExpenseForm
               expense={this.props.expense}
               onSubmit={this.onSubmit}
             />
             <button className="button button--secondary" onClick={this.onRemove}>Remove Expense</button>
           </div>
         </div>
       );
    }
};


const mapSateToProps = (state,props) => {
   return {
      expense: state.expenses.find((expense) => expense.id === props.match.params.id)
   };
};   

const mapDisptachToProps = (dispatch, props) => ({
   startEditExpense: (id, expense) => dispatch(startEditExpense(id, expense)),
      startRemoveExpense: (data) => dispatch(startRemoveExpense(data))
   
  
});

// export default EditExpensePage;
export default connect(mapSateToProps, mapDisptachToProps)(EditExpensePage);