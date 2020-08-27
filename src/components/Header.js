import React from 'react';

//using shothand return syntax explained in OptionModal
const Header = (props) =>  (
      <div className="header">
      <div className="container">
      <h1 className="header__title">{props.title}</h1>
      {props.subtitle && <h2 className="header__subtitle">{props.subtitle}</h2>}
      </div>
     
      </div>
    );
  
  
  //default prop values,these are applied if no props are passed,it is an object ,both functionsal componenets and class comppononets can take default props
  Header.defaultProps = {
      title: 'Indecision'
  };

export default Header;