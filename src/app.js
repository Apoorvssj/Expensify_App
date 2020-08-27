//import validator from 'validator';
import React from 'react';
import ReactDOM from 'react-dom';
import IndecisionApp from './components/IndecisionApp';
import 'normalize.css/normalize.css';
import './styles/styles.scss';



  
  //with the help of babel-transform-class-properties plugin converts new syntax to old synrax for old browsers

  class OldSyntax{
      constructor() {
          this.name = 'Mike';
          this.getGreeting = this.getGreeting.bind(this);
      }
      getGreeting() {
          return `Hi. My name is ${this.name}.`;
      }
  }
const oldSyntax = new OldSyntax();
//console.log(oldSyntax);
const getGreeting = oldSyntax.getGreeting;
console.log(getGreeting());

//--------------------------New class properties syntax
class NewSyntax {
   // these two are class properties
    name= 'Jen';
    //we use arrow functions,becoz arrow functions dont bind their own 'this' vlaue, they have set their 'this' to parent scope ,which means here for arrow functions on class properties it is always set to class instance ,so no way to breeak 'this binding'
    getGreeting = () => {
        return `Hi. My name is ${this.name}.`
    }; //semicolon after a class property is appreciable,we didnot use them on regular es6 methods 
}
  const newSyntax = new NewSyntax();
  //console.log(newSyntax);
  const newGetGreeting = newSyntax.getGreeting;
console.log(newGetGreeting());
  
  
 
  

  
 
  
  
  // const jsx = (
  //   <div>
  //   <Header />
  //   <Action />
  //   <Options />
  //   <AddOption />
  //   </div>
  // );
  
  // ReactDOM.render(jsx,document.getElementById('app'));
  
  //-----------Stateless functional component example
  //no need of render () function
  //they donot have state, but have access to props ,which can be passed as arguments rather than this keyword due to arrow functions
  // const User = (props) => {
  //   return (
  //     <div>
  //     <p>Name: {props.name}</p>
  //     <p>Age: {props.age}</p>
  //     </div>
  //   );
  // }
  
  // ReactDOM.render(<User name="Apoorv" age={26} />,document.getElementById('app'));
  
  ReactDOM.render(<IndecisionApp />,document.getElementById('app'));