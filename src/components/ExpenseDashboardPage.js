import React from 'react';
import ExpenseList from './ExpenseList';
import ExpenseListFilters from './ExpenseListFilters';
import ExpensesSummary from './ExpensesSummary';

//using shorthand(impicit return)
const ExpenseDashboardPage = () => (
    <div>
       <ExpensesSummary />
       <ExpenseListFilters />
       <ExpenseList />
    </div>
   );

export default ExpenseDashboardPage;