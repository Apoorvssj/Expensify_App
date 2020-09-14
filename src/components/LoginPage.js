import React from 'react';
import {connect} from 'react-redux';
import {startLogin} from '../actions/auth';

//destructuring
export const LoginPage = ({ startLogin }) => (
    <div>
    <button onClick={startLogin}>Login</button>
    </div>
);

//implicit return
const mapDispatchToProps = (dispatch) => ({
    startLogin: () => dispatch(startLogin())
});

//undefined is for mapStateToProps,cuz we dont need state
export default connect(undefined, mapDispatchToProps)(LoginPage);

