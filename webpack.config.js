const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
const webpack = require('webpack'); //to access built-in plugins
const path = require('path');

const config = {
  entry: {
      'app':[
          './src/index'
      ]
} ,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: './[name].bundle.js',
    publicPath: '/public/',
    // chunkFilename: '[name].js'
  },
  module: {
    rules: [
        {
          test: /\.(less|css)?$/, 
          loader: ["style-loader", "css-loader", "less-loader", "postcss-loader"]
        },
        {
            test: /\.(js|jsx)$/,
            use: ['babel-loader'],
            exclude: /node_modules/,
        },
        {test: /\.(jpg|png)$/, loader: "url?limit=8192"},
        // { test: /\.(woff|svg|eot|ttf)?$/, loader: "url-loader" },
        {
            test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
            loader: 'file-loader'
        },
        {test: /\.json$/,loader: 'json-loader'},
        {test: /\.html$/,loader: 'raw-loader'},
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
          warnings: false
      }
    }),
  ]
};

module.exports = config;