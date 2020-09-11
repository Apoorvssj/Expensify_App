

import React from 'react';
import {Link} from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';


//destructuring props from the expense object,we can also get dispatch from it,
//id : id using shorthand ,passing to removeExpenser
 const ExpenseListItem = ({dispatch, id, description , amount , createdAt}) => (
    <div>
    <Link to={`/edit/${id}`}>
    <h3>{description}</h3>
    </Link>
    <p>{numeral(amount / 100).format('$0,0.00')} 
        - 
       {moment(createdAt).format('MMMM Do, YYYY')}</p>
    </div>
);


//export default connect()(ExpenseListItem);



export default ExpenseListItem;