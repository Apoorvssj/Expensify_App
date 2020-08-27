import React from 'react';
import AddOption from './AddOption';  //we can leave .js extension
import Header from './Header';
import Action from './Action';
import Options from './Options';
import OptionModal from './OptionModal';

//<Header /> is out react componenet of class Header
//same as <Header></Header>
export default class IndecisionApp extends React.Component {
  state = {
      options: [],
      selectedOption: undefined
  };

  handleDeleteOptions = () => {
    //explicitly returning object
    // this.setState(() => {
    //   return {
    //     options: []
    //   }
    // });
    //implicit returning object using arraow function
    this.setState(() => ({options: [] }));
  };

  handleClearSelectedOption = () => {
   this.setState(() => ({selectedOption: undefined }));
  };

  handleDeleteOption = (optionToRemove) => {
    this.setState((prevState) => ({
         options: prevState.options.filter((option) => {
             return optionToRemove !== option; //loops over and remove the element which returns  false,and then it returns a brand new array
         })
    }));
  };

  handlePick = () => {
    const randomNum = Math.floor(Math.random() * this.state.options.length);
    const option = this.state.options[randomNum];
    //alert(option);
    this.setState(() => ({
       selectedOption: option
    }));
  };

  handleAddOption = (option) => {

        //returns two strings if all goes well means it will return undefined(will return no message)
        if(!option) {
          return 'Enter valid value to add item';
        }else if (this.state.options.indexOf(option) > -1){
          //returns -1 if there is no element // returns index of array
          return 'This option already exists';
         }

    this.setState((prevState) => ({options : prevState.options.concat(option) }));
  };
    
  
    componentDidMount() {
         try{
          const json = localStorage.getItem('options');
          const options = JSON.parse(json);
      
          if(options) {
             this.setState(() => ({ options }));
          }
         }catch (e){
           //do nothing at all,try catch if valid json data is not present
         }
  
      
  
    }
  
    componentDidUpdate(prevProps,prevState){
      //to stop storing data on removeall hitting continously multiple times
      if(prevState.options.length !== this.state.options.length) {
        const json = JSON.stringify(this.state.options);
        localStorage.setItem('options', json);
      }
    }
  
    
    render(){
     // const title = 'Indecision';
      const subtitle = 'Put your life in the hands of a computer';
     
      return (
        <div>
          <Header  subtitle={subtitle}/>
          <div className="container">
          <Action 
          hasOptions={this.state.options.length > 0}
          handlePick={this.handlePick}/>
          <div className="widget">
          <Options 
          options={this.state.options}
          handleDeleteOptions={this.handleDeleteOptions}
          handleDeleteOption={this.handleDeleteOption}/>
          <AddOption 
          handleAddOption={this.handleAddOption}/>
          </div>
         </div>
         
          <OptionModal 
          selectedOption={this.state.selectedOption}
          handleClearSelectedOption={this.handleClearSelectedOption}/>
        </div>
      );
    }
  }