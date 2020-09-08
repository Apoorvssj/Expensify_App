

import React from 'react';
import {Link} from 'react-router-dom';


//destructuring props from the expense object,we can also get dispatch from it,
//id : id using shorthand ,passing to removeExpenser
 const ExpenseListItem = ({dispatch, id, description , amount , createdAt}) => (
    <div>
    <Link to={`/edit/${id}`}>
    <h3>Description : {description}</h3>
    </Link>
    <p>Amount: {amount} - CreateD At: {createdAt}</p>
    </div>
);


//export default connect()(ExpenseListItem);



export default ExpenseListItem;