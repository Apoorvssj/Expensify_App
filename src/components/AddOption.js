import React from 'react';

export default class AddOption extends React.Component {
  state = {
      error: undefined
  };
    handleAddOption = (e) => {
      e.preventDefault();
      //passing e means grabbing the event
      const value = e.target.elements.option.value.trim();
      const error = this.props.handleAddOption(value);
    
       this.setState(() => ({error}));//same as error: error ,it is object shorthand in es6
  
       if(!error) {
         //if no error message the form clears out
         e.target.elements.option.value = '';
       }
    };
  
    //{this.state.error && <p>{this.state.error}</p>} here if this.state.error is undefined (which is falsy) <p> will not render ,if it has a value (it is truthy) <p> will be rendered
    render(){
      return (
        <div>
        {this.state.error && <p className="add-option-error">{this.state.error}</p>}
        <form className="add-option" onSubmit={this.handleAddOption}>
        <input className="add-option__input" type="text" name="option" />
        <button className="button">Add option</button>
        </form>
        </div>
      );
    }
  }