//Expenses Reducer
const expensesReducerDefaultState = [];

const expensesReducer = (state = expensesReducerDefaultState, action) => {
  switch (action.type) {
      case 'ADD_EXPENSE':
          return [
              //spread operator
              ...state,
              action.expense
          ];
        case 'REMOVE_EXPENSE':
            return state.filter(( {id} ) => id !== action.id); //destructuring state array and taking id from it as id
        case 'EDIT_EXPENSE':
            return state.map((expense) => {
                if(expense.id === action.id) {
                    return {
                        //first adding all properties of expense array then overriding it with new values with spread operator
                        ...expense,
                        ...action.updates
                    };
                } else {
                    return expense; //no chnage
                }
            });  
        case 'SET_EXPENSES':
            return action.expenses  ;   
      default:
          return state;
  }
};

export default expensesReducer;