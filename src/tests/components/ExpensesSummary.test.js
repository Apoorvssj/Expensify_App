import React from 'react';
import {shallow} from 'enzyme';
import {ExpensesSummary} from '../../components/ExpensesSummary';
import expenses from '../fixtures/expenses';

test('should correctly render ExpensesSummary with 1 expense', () => {
    const wrappper = shallow(<ExpensesSummary expenseCount={1}
        expensesTotal={235}/>);
    expect(wrappper).toMatchSnapshot();
});

test('should correctly render ExpensesSummary with multiple expenses', () => {
    const wrappper = shallow(<ExpensesSummary expenseCount={2}
        expensesTotal={435}/>);
    expect(wrappper).toMatchSnapshot();
});
