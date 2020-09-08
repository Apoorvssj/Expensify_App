const path = require('path');

module.exports = {
   entry: './src/app.js',
   output: {
       path: path.join(__dirname,'public'),
       filename: 'bundle.js'
   },
   module: {
       rules: [{
           loader: 'babel-loader',
           test: /\.js$/,
           exclude: /node_modules/
       }, {
           test: /\.s?css$/,
           use: [
               'style-loader',
               'css-loader',
               'sass-loader'
           ]

       }]
   },
   devtool: 'cheap-module-eval-source-map',
   devServer: {
    contentBase: path.join(__dirname, 'public'),
    publicPath: '/public/',
    historyApiFallback: true //this tells dev-server that we will be handling routing via client side code and it should return our main "/" page or all routes and let the code decide what to show(tells all pages/404 pages to send back the html file,video 4 folder 9) 
   }
};