const path = require('path');//require is the node.js way to import something,path is built-in so no need to install it
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

//to set environment variables , to create a separate databse for tests v5 f15
process.env.NODE_ENV = process.env.NODE_ENV || 'development';//it will be test in test(done in test script), production in production done by heroku , otherwise development in development
if(process.env.NODE_ENV === 'test'){
    //this npm module(dotenv) looks for .env files
   require('dotenv').config({ path: '.env.test' });
}else if (process.env.NODE_ENV === 'development'){
    require('dotenv').config({ path: '.env.development' });
}
//now env are not passed down to client side js (bundle.js),so to manually pass them we will use DefinePlugin in plugins

//reconfigured to return a function in v6 f13

module.exports = (env) => {
    const isProduction = env === 'production';
    console.log('env', env); // env flag in package.jon in build:prop script
    return {
        entry: './src/app.js',
        output: {
            path: path.join(__dirname,'public', 'dist'),
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
                   // 'style-loader',
                   isProduction ? MiniCssExtractPlugin.loader : 'style-loader',//changed  in v7 f13
                    'css-loader',
                    'sass-loader'
                ]
     
            }]
        },
        plugins: [
            new MiniCssExtractPlugin({filename: "styles.css"}),
            new webpack.DefinePlugin({
                //on this we can define variables we want to pass
                //this is the var we will set up in client side js , and getting its value from same variable in node environment
                //now defineplugin will set string values as value but not as string so we need add quotes or use stringify v5 f15
                'process.env.FIREBASE_API_KEY':JSON.stringify(process.env.FIREBASE_API_KEY),
                'process.env.FIREBASE_AUTH_DOMAIN':JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
                'process.env.FIREBASE_DATABASE_URL':JSON.stringify(process.env.FIREBASE_DATABASE_URL),
                'process.env.FIREBASE_PROJECT_ID':JSON.stringify(process.env.FIREBASE_PROJECT_ID),
                'process.env.FIREBASE_STORAGE_BUCKET':JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
                'process.env.FIREBASE_MESSAGING_SENDER_ID':JSON.stringify(process.env.FIREBASE_MESSAGING_SENDER_ID),
                'process.env.FIREBASE_APP_ID':JSON.stringify(process.env.FIREBASE_APP_ID),
                'process.env.FIREBASE_MEASUREMENT_ID':JSON.stringify(process.env.FIREBASE_MEASUREMENT_ID),
            })
        ],
        devtool: isProduction ? 'source-map' : 'inline-source-map',
        devServer: {
         contentBase: path.join(__dirname, 'public'),
         publicPath: '/dist/',//let's us specify where those bundled assets should live
         historyApiFallback: true //this tells dev-server that we will be handling routing via client side code and it should return our main "/" page or all routes and let the code decide what to show(tells all pages/404 pages to send back the html file,video 4 folder 9) 
        }
     };
};

