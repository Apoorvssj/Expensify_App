//server for production using express,do need to load assessts first by running buil:prod script
//this file will not run through webpack ,it is not something that's going to run in the browser,it is a file that we're going to run from the command line using the node terminal command

const path = require('path');
const express = require('express');
const app = express(); //instance of express

const port = process.env.PORT || 3000; //if we are on heroku we will read dynamic PORT value provided by heroku , if not use static port 3000 on our local machine

const publicPath = path.join(__dirname, '..', 'public');

app.use(express.static(publicPath)); //to customize express servers,it will be used to register some middleware
//middleware is something that runns for each request,so if someone makes a req. to the server we might want to run some code that logs something to the console,we are taking return value from express.static() call

//this lets us to set up some function to run when someone makes a GET request to our server ,rather than typing /help,/create for those pages we will use * ,to match all unmatched routes(which user requested but are not in public folder),means if it is in in the public folder great we'll serve that up, if it's not,we are going to serve up same thing every single time,which is defined here (we done samething with webpack dev server by setting historyApiFallback: true)
app.get('*', (req, res) => {
    //request and response are provided by express,
   // request object  contains info about the request and response object lets you manipulate the response your express server makes to whoever made the HTTP request
   //here we will just send our index.html back,and let react router handle page changes and load/reload
   res.sendFile(path.join(publicPath, 'index.html'));

});

//static port
app.listen(port, () =>{
    console.log('Server is up!');
}); //to start the server at port, also  it takes  a callback function which gets called when the server is actually up