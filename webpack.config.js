const path = require('path');//require is the node.js way to import something,path is built-in so no need to install it
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

//reconfigured to return a function in v6 f13

module.exports = (env) => {
    const isProduction = env === 'production';
    console.log('env', env); // env flag in package.jon in build:prop script
    return {
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
                   // 'style-loader',
                   isProduction ? MiniCssExtractPlugin.loader : 'style-loader',//changed  in v7 f13
                    'css-loader',
                    'sass-loader'
                ]
     
            }]
        },
        plugins: [
            new MiniCssExtractPlugin({filename: "styles.css"})
        ],
        devtool: isProduction ? 'source-map' : 'inline-source-map',
        devServer: {
         contentBase: path.join(__dirname, 'public'),
         publicPath: '/public/',
         historyApiFallback: true //this tells dev-server that we will be handling routing via client side code and it should return our main "/" page or all routes and let the code decide what to show(tells all pages/404 pages to send back the html file,video 4 folder 9) 
        }
     };
};

