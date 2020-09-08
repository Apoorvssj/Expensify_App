import moment from 'moment';

//dummy data for testing 

//defualt values
const filters = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
};

//when data is populated
const altFilters = {
    text: 'bills',
    sortBy: 'amount',
    startDate: moment(0), // jan1 1970
    endDate: moment(0).add(3, 'days')
};

export {filters, altFilters}; //shorthand for exporting multiple things at a same time