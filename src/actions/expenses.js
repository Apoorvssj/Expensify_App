import { v4 as uuidv4 } from 'uuid';

// ADD_EXPENSE action generator
export const addExpense = (
    {
        description = '',
        note = '',
        amount = 0,
        createdAt = 0
    } = {}
) => ({
    type: 'ADD_EXPENSE',
    expense: {
        id: uuidv4(),
        description,
        note,
        amount,
        createdAt
    }
});

//REMOVE_EXPENSE action generator
//default value is not needed for id, id : id using shorthand
export const removeExpense = ({id} = {}) => ({
    type: 'REMOVE_EXPENSE',
    id 
    
});

//EDIT_EXPENSE action generator
//no need to set defualts,becoz if dont have the id we wont be updating it in the first place
export const editExpense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
});