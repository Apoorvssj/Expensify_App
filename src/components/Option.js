import React from 'react';

//using shothand return syntax explained in OptionModal 
const Option = (props) =>  (
      <div className="option">
      <p className="option__text">{props.count}. {props.optionText}</p>
      <button 
      className="button button--link"
      onClick={(e) => {
        //we dont want event object to pass above but pass in optionText
       // props.handleDeleteOption
       //so we gonna pass in a inline arrow function,having e as argument
       props.handleDeleteOption(props.optionText);
  
      }}
      >
      remove</button>
      </div>
    );
  

  export default Option; //unlike classes, we cannot write export default in the same line with const or let