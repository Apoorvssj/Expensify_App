import React from 'react';
import {Link} from 'react-router-dom';

//using shorthand(impicit return)
const NotFoundPage = () => (
    <div>
       404! - <Link to="/">Go Home</Link>
    </div>
   );

   export default NotFoundPage;