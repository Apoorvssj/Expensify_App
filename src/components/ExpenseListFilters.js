//this component is not just reading from the store,but also writing to it using dispatch
//changed from stateless functional component to class component v13 f11,in order to use DateRangePicker of react-dates lib which requires local component state,also now we need to change props to this.props cuz it is a class

//Refractoring done in v16 f12

import React from 'react';
import {connect} from 'react-redux';
import {DateRangePicker} from 'react-dates';
import {setTextFilter,sortByDate,sortByAmount,setStartDate,setEndDate} from '../actions/filters';

//onChange handler takes a function,and every single time input changes function fires
//when we use connect ,we have send props by us like filters,but also we have a prop which we get automatically to dispatch actions,which is dispatch ,see react dev tool
//here  we are using dispatch to change the store/state to setTextFilter  =  whatever user types in the field

//When we set up our form inputs,things like text input or select drop downs like below ,and we use value and onchange ,we're creating a controlled input.(value controlled by js).Alternative form field used in indecision app

export class ExpenseListFilters extends React.Component {
    state = {
        calenderFocused: null
    };
    //not creating variables,but using destructuring
    onDatesChange = ({ startDate, endDate }) => {
        this.props.setStartDate(startDate);
        this.props.setEndDate(endDate);
    };
    onFocusChange = (calenderFocused) => {
        this.setState(() => ({ calenderFocused }));
    };
    onTextChange = (e) => {
            this.props.setTextFilter(e.target.value);  
    };
    onSortChange = (e) => {
        if(e.target.value === 'date'){
            this.props.sortByDate();
        }else if(e.target.value === 'amount') {
            this.props.sortByAmount();
        }
    };
    render() {
        return (
          <div className="content-container">
            <div className="input-group">
              <div className="input-group__item">
                <input
                  type="text"
                  className="text-input"
                  placeholder="Search expenses"
                  value={this.props.filters.text}
                  onChange={this.onTextChange}
                />
              </div>
              <div className="input-group__item">
                <select
                  className="select"
                  value={this.props.filters.sortBy}
                  onChange={this.onSortChange}
                >
                  <option value="date">Date</option>
                  <option value="amount">Amount</option>
                </select>
              </div>
              <div className="input-group__item">
                <DateRangePicker
                  startDate={this.props.filters.startDate}
                  startDateId="startDate"
                  endDate={this.props.filters.endDate}
                  endDateId="endDate"
                  onDatesChange={this.onDatesChange}
                  focusedInput={this.state.calenderFocused}
                  onFocusChange={this.onFocusChange}
                  showClearDates={true}
                  numberOfMonths={1}
                  isOutsideRange={() => false}
                />
              </div>
            </div>
          </div>
        );
    }
};

//implicitly returning object,
const mapStateToProps = (state) => ({
   // we can return anything we want,here we are returning an object
        filters: state.filters
});

const mapDispatchToProps = (dispatch) => ({
    setTextFilter: (text) => dispatch(setTextFilter(text)),//implicit retun with es6 shorthand syntax
    sortByDate: () => dispatch(sortByDate()),
    sortByAmount: () => dispatch(sortByAmount()),
    setStartDate: (startDate) => dispatch(setStartDate(startDate)),
    setEndDate: (endDate) => dispatch(setEndDate(endDate))
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilters);