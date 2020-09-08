import React from 'react';
import {shallow} from 'enzyme';
import moment from 'moment';
import {ExpenseListFilters} from '../../components/ExpenseListFilters';
import {filters, altfilters, altFilters} from '../fixtures/filters';


let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper;

beforeEach(() => {
   setTextFilter = jest.fn();
   sortByDate = jest.fn();
   sortByAmount = jest.fn();
   setStartDate = jest.fn();
   setEndDate = jest.fn();
   wrapper = shallow(
       <ExpenseListFilters 
       filters={filters}
       setTextFilter={setTextFilter}
       sortByDate={sortByDate}
       sortByAmount={sortByAmount}
       setStartDate={setStartDate}
       setEndDate={setEndDate}
       />
   );
});

test('should render EsxpenseListFilters correctly', () => {
    expect(wrapper).toMatchSnapshot();
});

test('should render EsxpenseListFilters with alt data correctly', () => {
    //to set/update props see enzyme docs , v16 f12
    wrapper.setProps({
        filters: altFilters
    });
    expect(wrapper).toMatchSnapshot();
});

test('should handle text change', () => {
    const value = 'rent';
    wrapper.find('input').simulate('change', {
        target: {
            value
        }
    });
    //we expect that set text filter got called with that data in ExpenseListFilters.js
    expect(setTextFilter).toHaveBeenLastCalledWith(value);
});

test('should sort by date', () => {
    wrapper.setProps({
        filters: altFilters //changing to amount first from date
    });
    const value = 'date'; //then changing to date,in user interaction(simulate())
    wrapper.find('select').simulate('change', {
        target: {
            value
        }
    });
    expect(sortByDate).toHaveBeenCalled();
});

test('should sort by amount', () => {
    const value = 'amount'; // changing to amount from date(default value),in user interaction(simulate())
    wrapper.find('select').simulate('change', {
        target: {
            value
        }
    });
    expect(sortByAmount).toHaveBeenCalled();
});

//having issue with DateRangePicker(3rd party)
/*
test('should handle date changes', () => {
    const startDate = moment(0).add(4, 'years');
    const endDate = moment(0).add(8, 'years');
    wrapper.find('DateRangePicker').prop('onDatesChange')({startDate, endDate});
    expect(setStartDate).toHaveBeenLastCalledWith(startDate);
    expect(setEndDate).toHaveBeenLastCalledWith(endDate);
});

test('should handle date focus changes', () => {
    const calenderFocused = 'endDate';
    wrapper.find('DateRangePicker').prop('onFocusChange')(calenderFocused);
    expect(wrapper.state('calenderFocused')).toBe(calenderFocused);
});

*/
