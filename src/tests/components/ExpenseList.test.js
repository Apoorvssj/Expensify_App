//when we are testing react components, we wanna test the unconnected version, becoz we want to be able to provide a set of dynamic props,so we dont want the props to come from redux store,instead we are gonna provide expenses directly.

import React from 'react';
import {shallow} from 'enzyme';
import toJSON from 'enzyme-to-json';
import {ExpenseList} from '../../components/ExpenseList'; // not grabbing default one that is connected to the store
import expenses from '../fixtures/expenses';

test('should render ExpenseList with expenses', () => {
    const wrapper = shallow(<ExpenseList expenses={expenses}/>);
    expect(toJSON(wrapper)).toMatchSnapshot();
});

test('should render ExpenseList with empty message', () => {
    const wrapper = shallow(<ExpenseList expenses={[]}/>);
    expect(toJSON(wrapper)).toMatchSnapshot();
});