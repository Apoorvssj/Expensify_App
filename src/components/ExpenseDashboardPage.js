import React from 'react';
import ExpenseList from './ExpenseList';
import ExpenseListFilters from './ExpenseListFilters';

//using shorthand(impicit return)
const ExpenseDashboardPage = () => (
    <div>
       <ExpenseListFilters />
       <ExpenseList />
    </div>
   );

export default ExpenseDashboardPage;