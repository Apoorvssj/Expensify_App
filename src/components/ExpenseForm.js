import React from 'react';
import moment from 'moment';
import 'react-dates/initialize';
import {SingleDatePicker} from 'react-dates';


//We created it separatly to reuse it for both addexpensepage.js and editexpensepage.js,as they need different dispatch actions,we will pass all data through onSubmit prop to them

//why we choose class instead of stateless functional componnent=
//The big pitcure goal here is to use local component state to track the changes to all of these inputs,only when the user actually submits the form ,we will do something with that info.when it is submitted we will send it off to redux to either edit the existing expense or create a new one

const now = moment();//we are gona get a instance of moment,no need to use new keyword like Date()
console.log(now.format('MMM Do, YYYY'));

export default class ExpenseForm extends React.Component {
    //we need to define our state in the constructor function to access the props(expense prop from EditExpensePage.js)
    constructor(props){
        super(props);
//terinary operator to make sure page works for both AddExpensePage(where we are not passing expense object so want emppty strings) and EditExpensePage(where we are passing expense object as a prop)
        this.state = {
            description: props.expense ? props.expense.description : '',
            note: props.expense ? props.expense.note : '',
            amount: props.expense ? (props.expense.amount / 100).toString() : '',//converting cents to dollars and from number to string
            createdAt: props.expense ? moment(props.expense.createdAt) : moment(),//passing the timestamp from createdAt
            calenderFocused: false,
            error: ''
        };
    }
    onDescriptionChange = (e) => {
        const description = e.target.value;
        this.setState(() => ({ description }));//implicit returning object,and using shorthand es6 for description: description
    };
    onNoteChange = (e) => {
        const note = e.target.value;
        this.setState(() => ({ note }));
        //or 
        // e.persist();//necessary when using e.target.value in a callback
        // this.setState(() => ({note: e.target.vlaue}));
    };
    onAmountChange = (e) => {
        const amount = e.target.value;
        if(!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)){
            this.setState(() => ({ amount }));
        }
    };
    //gets called by the 3rd party lib. - react-dates
    onDateChange = (createdAt) => {
        //this is gonna called with moment instance when someone picks a new day from the calender.so createdAt is the new moment instance
        if(createdAt){
        this.setState(() => ({ createdAt }))
        }
    };
  
    //destructuiring and grabbing focused,as mentioned on github
    onFocusChange = ({ focused }) => {
  //when the user interacts with the calender,there are going to be times where the 3rd party lib. needs to tell us that it's going to close.
       this.setState(() => ({ calenderFocused: focused }));
    };
    onSubmit = (e) => {
        e.preventDefault();
        if(!this.state.description || !this.state.amount){
             this.setState(() => ({ error: "Please provide description and amount." }));
        }else {
            this.setState(() => ({ error: '' }));
            //passing all the data to addexpensepage.js and editexpensepage.js,onSubmit is the prop we got passed from parent - Addexpensepage.js/editexpensepage.js
            this.props.onSubmit({
                description: this.state.description,
                amount: parseFloat(this.state.amount, 10) * 100,//multiplied by 100 becoz we are working in cents,but user will enter in dollars
                createdAt: this.state.createdAt.valueOf(), //valueof() is to get timestamp in milliseconds in which js operates from the moment object as scene in moment docs
                note: this.state.note
            });
        }
    }
    render() {
        return (
          <div>
            {this.state.error && <p>{this.state.error}</p>}
            <form onSubmit={this.onSubmit}>
              <input 
                type="text" 
                placeholder="Description" 
                autoFocus
                value={this.state.description}
                onChange={this.onDescriptionChange} />
              <input 
                type="text" 
                placeholder="Amount" 
                value={this.state.amount}
                onChange={this.onAmountChange}/>
                <SingleDatePicker  
                date={this.state.createdAt}
                onDateChange={this.onDateChange}
                focused={this.state.calenderFocused}
                onFocusChange={this.onFocusChange}
                numberOfMonths={1}
                isOutsideRange={() => false}/>
              <textarea 
                placeholder="Add a note for your expense (optional)"
                value={this.state.note}
                onChange={this.onNoteChange}>
                </textarea>
              <button>Add Expense</button>
            </form>
          </div>
        );
    }
}