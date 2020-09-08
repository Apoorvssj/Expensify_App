//SET_TEXT_FILTER action generator
export const setTextFilter = (text  = '') => ({
    type: 'SET_TEXT_FILTER',
    text
});

//SORT_BY_DATE action generator
export const sortByDate = () => ({
    type: 'SORT_BY_DATE',
});

//SORT_BY_AMOUNT action generator
export const sortByAmount = () => ({
    type: 'SORT_BY_AMOUNT',
});

//SET_START_DATE
export const setStartDate = (startDate) => ({
    type: 'SET_START_DATE',
    startDate
});

//SET_END_DATE
//we dont need to pass undefined as default value,cuz it already the default value by default(so if there is a number passed in great,if not this will be undefined by default)
export const setEndDate = (endDate) => ({
    type: 'SET_END_DATE',
    endDate
});