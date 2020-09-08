import moment from 'moment';
import selectExpenses from '../../selectors/expenses';
import expenses from '../fixtures/expenses';

//getVisibleExpenses ===  selectExpenses becoz it is default export



test('should filter by text value', () => {
    //setting only text,  rest all are default
    const filters = {
        text: 'e',
        sortBy: 'date',
        startDate: undefined,
        endDate: undefined
    };
    const result = selectExpenses(expenses, filters);
    //first item is going to be creadit card ,ciz sort by date,Gum should be filtered out
    expect(result).toEqual([expenses[2], expenses[1]]);
});

test('should filter by startDate', () => {
    const filters = {
        text: '',
        sortBy: 'date',
        startDate: moment(0),
        endDate: undefined
    };
    const result = selectExpenses(expenses, filters);
    //rent should get filtered out cuz it is in the past,and we start from present(jan 1 1970) to future
    expect(result).toEqual([expenses[2], expenses[0]]);
});

test('should filter by endDate', () => {
    const filters = {
        text: '',
        sortBy: 'date',
        startDate: undefined,
        endDate: moment(0).add(2, 'days')
    };
    const result = selectExpenses(expenses, filters);
    //credit card should get filtered out cuz it is in the future,and we end at 2 days after from present(jan 1 1970)
    expect(result).toEqual([expenses[0], expenses[1]]);
});

test('should sort by date', () => {
    const filters = {
        text: '',
        sortBy: 'date',
        startDate: undefined,
        endDate: undefined
    };
    const result = selectExpenses(expenses, filters);
    //latest comes first
    expect(result).toEqual([expenses[2], expenses[0], expenses[1]]);
});

test('should sort by amount', () => {
    const filters = {
        text: '',
        sortBy: 'amount',
        startDate: undefined,
        endDate: undefined
    };
    const result = selectExpenses(expenses, filters);
    expect(result).toEqual([expenses[1], expenses[2], expenses[0]]);
});



