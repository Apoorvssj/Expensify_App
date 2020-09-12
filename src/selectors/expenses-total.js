import getVisibleExpenses from './expenses';

const getExpensesTotal = (expenses) => {
    return expenses.map((expense) => expense.amount).reduce(
        (accumulator, currentValue) => accumulator + currentValue, 0);
  
};

export default getExpensesTotal;