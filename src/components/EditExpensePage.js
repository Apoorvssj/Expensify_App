import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import {editExpense, removeExpense} from '../actions/expenses';

//refactored like AddExpensePage.js in v15 f12


//props.match.params.id is seen from console //v8 f9
export class EditExpensePage extends React.Component {
    onSubmit = (expense) => {
      this.props.editExpense(this.props.expense.id,expense);
      this.props.history.push('/');
    };
    onRemove = () => {
      this.props.removeExpense({ id: this.props.expense.id });
      this.props.history.push('/');
    };
    render() {
       return(
            <div>
               <ExpenseForm 
               expense={this.props.expense}
               onSubmit={this.onSubmit}/>
               <button onClick={this.onRemove}>Remove</button>
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
      editExpense: (id, expense) => dispatch(editExpense(id, expense)),
      removeExpense: (data) => dispatch(removeExpense(data))
   
  
});

// export default EditExpensePage;
export default connect(mapSateToProps, mapDisptachToProps)(EditExpensePage);