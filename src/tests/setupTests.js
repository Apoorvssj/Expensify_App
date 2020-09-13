// to configure test environment adapter
//it will aloow us to set tup enzyme adapter once ,and use it everywhere,we willl wire up adapter with enzyme to work with it

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16.1';
//require('dotenv').config({ path: '.env.test' }); or
import DotEnv from 'dotenv';

DotEnv.config({ path: '.env.test' });

Enzyme.configure({
    adapter: new Adapter()
});