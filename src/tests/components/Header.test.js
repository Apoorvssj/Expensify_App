/*

//using react-test-renderer - It allows us to render our components inside of just regular js code and then we can something about what got rendered

//we two ways to test react components shallow rendering and full DOM rendering
//Now in Header.js we are not worried about user interaction or lifecysle events,we are just concerned about what's getting rendered and shallow rendering does just that.It only renders the given component
//Full DOM rendering renders child components as well & Header.js will fail becoz child component NavLink expects to be used somewhere inside of a router

import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import Header from '../../components/Header';

test('should render Header correctly', ()=> {
    const renderer = new ReactShallowRenderer();
    renderer.render(<Header />);
  //  console.log(renderer.getRenderOutput());//it is gonna return the rendered output of the jsx you put in

//we are not gonna make assretions with toEqual directly about this object,but gonna use Snapshots(by jest),it allows us to track changes to data overtime
   expect(renderer.getRenderOutput()).toMatchSnapshot();//first time we run this test case it will always going to pass becoz there is no existing snapshot,so jest is going to go ahead and create a nnew one(it will create a snapshot of what the rendered Header output looked like),
   //Second time we run this test case it will compare with the existing one,if it's same test will pass,
   //if you want to save new change in Header.js for eg, so in cmd you can see a message to update snapshot press u , do it to uppdate snapshot with new data,but if you dont want to change(cuz it was not a feature but a mistake like typo or something) you can reject it normally and correct it in the file to match snapshot 1
}); 

*/

//v9 f12

//---------------WITH ENZYME-----------------------

//facing problem with snapshot serializer in config file(not getting just the rendered output) so using import statement and toJSON function

import React from 'react';
import {shallow} from 'enzyme';
/*
//dont need import as it is mentioned in config jest file
import toJSON from 'enzyme-to-json'; // allows us to see just the json output of snapshot created by enzyme in snapshots folder(makes enzyme work with snapshot testnig functionality)
*/
import toJSON from 'enzyme-to-json';
import {Header} from '../../components/Header';

test('should render Header correctly', () => {
    const wrapper = shallow(<Header startLogout={() => {}}/>);
    //find() - like jqauery or document query selector all ,it is going to allow us to select varoius elements inside of our component and make assertions about them
    // expect(wrapper.find('h1').length).toBe(1);
    // expect(wrapper.find('h1').text()).toBe('Expensify');
    
    //expect(toJSON(wrapper)).toMatchSnapshot(); no need to use toJSON since done in config jest file
    expect(toJSON(wrapper)).toMatchSnapshot();
});

test('should call startLogout on button click', () => {
  const startLogout = jest.fn();//spy
  const wrapper = shallow(<Header startLogout={startLogout}/>);
  wrapper.find('button').simulate('click');
  expect(startLogout).toHaveBeenCalled();
});
