import moment from 'moment';
import filtersReducer from '../../reducers/filters';

//to set default values,whenn redux store first kicks in 
test('should setup default filter values', () => {
    //first action dispatched by redux store is @@init can see in redux devtools, // v6 f12,
    //passing undefined(nothing) as state,passing that @@init as action object
    const state = filtersReducer(undefined, {type: '@@INIT'});
    expect(state).toEqual({
        text: '',
        sortBy: 'date',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')
    });
});

test('should set sortBy to amount', () => {
    const state = filtersReducer(undefined, {type: 'SORT_BY_AMOUNT' });
    expect(state.sortBy).toBe('amount');
});

test('should set sortBy to date', () => {
    //now by default sortBy is already set to date, so in order to watch change and see that this action actually works we beed to first change it to amount
    const currentState = {
        text: '',
        startDate: undefined,
        endDate: undefined,
        sortBy: 'amount'
    }; 
    const action = { type: 'SORT_BY_DATE' };
    const state = filtersReducer(currentState, action);
    expect(state.sortBy).toBe('date');
});

test('should set text filter', () => {
    const text = 'This is my filter';
    const action  = {
        type: 'SET_TEXT_FILTER',
        text
    };
    const state = filtersReducer(undefined, action);
    expect(state.text).toBe(text);
});

test('should set start date filter', () => {
    const startDate = moment();
    const action  = {
        type: 'SET_START_DATE',
        startDate
    };
    const state = filtersReducer(undefined, action);
    expect(state.startDate).toEqual(startDate);
});

test('should set end date filter', () => {
    const endDate = moment();
    const action  = {
        type: 'SET_END_DATE',
        endDate
    };
    const state = filtersReducer(undefined, action);
    expect(state.endDate).toEqual(endDate);
});

