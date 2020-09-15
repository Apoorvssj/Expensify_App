import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {startLogin, startLogout} from '../actions/auth';

//changed on v3 f17 from navlink to link

export const Header = ({ startLogout }) => (
  <header className="header">
    <div className="content-container">
      <div className="header__content">
        <Link className="header__title" to="/dashboard">
          <h1>Expensify</h1>
        </Link>
        <button className="button button--link" onClick={startLogout}>Logout</button>
      </div>
    </div>
  </header>
);

const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout())
});

export default connect(undefined, mapDispatchToProps)(Header);
// <NavLink to="/help" activeClassName="is-active">Help</NavLink>
