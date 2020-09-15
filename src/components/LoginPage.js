import React from 'react';
import {connect} from 'react-redux';
import {startLogin} from '../actions/auth';

//destructuring
export const LoginPage = ({ startLogin }) => (
    <div className="box-layout">
    <div className="box-layout__box">
    <h1 className="box-layout__title">Expensify</h1>
    <p>It's time to get your expenses under control.</p>
    <button onClick={startLogin} className="button">Login with Google</button>
    </div>
    </div>
);

//implicit return
const mapDispatchToProps = (dispatch) => ({
    startLogin: () => dispatch(startLogin())
});

//undefined is for mapStateToProps,cuz we dont need state
export default connect(undefined, mapDispatchToProps)(LoginPage);

