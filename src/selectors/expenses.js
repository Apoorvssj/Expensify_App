//startdate and enddate filters changed to moment v13 f11

import moment from 'moment';

// Get visible expenses(filtering expenses)
//destructuring filters
const getVisibleExpenses = (expenses,{ text,sortBy,startDate,endDate }) => {
    //filter and sort both returns an array so we can chain them together to get filtered and sorted array
return expenses.filter((expense) => {
    const createdAtMoment = moment(expense.createdAt);
    const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, 'day') : true;//it will be always true if there is no startDate,becoz we will never filter things based off of that ,if it is not their(as we have given user ability to clear dates in react-dates in dashboard page)
    const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, 'day') : true;
    const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());

    return startDateMatch && endDateMatch && textMatch; //if all of these are true the filter will return true and the array(expense) will be kept in expenses array
}).sort((a,b) => {
    if(sortBy === 'date'){
        return a.createdAt < b.createdAt ? 1 : -1; //if this is true 1 will be returned means b will come first,otherwise -1 will be returned means a will come first
    } 
    else if(sortBy === 'amount'){
        return a.amount < b.amount ? 1 : -1;
    }
});
};

export default getVisibleExpenses;

// before moment

/* 

{
    const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate; // always true for non numbers ,also for undefined .but dont worry we will let undefined filter it
    const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
    const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());

    return startDateMatch && endDateMatch && textMatch; //if all of these are true the filter will return true and the array(expense) will be kept in expenses array
}

*/