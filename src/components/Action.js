import React from 'react';

//using shothand return syntax explained in OptionModal
const Action = (props) => (
      <div>
      <button 
      className="big-button"
      onClick={props.handlePick} 
      disabled={!props.hasOptions}>
      What should I do?
      </button>
      </div>
    );
  

  export default Action;