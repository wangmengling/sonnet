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
          test: /\.less$/, 
          loader: ["style-loader", "css-loader", "postcss-loader", "less-loader"]  //postcss-loader 一定要放在  less-loader 前面 不然会出错
        },
        {
          test: /\.css$/, 
          loader: ["style-loader", "css-loader", "postcss-loader"]
        },
        // {
        //   test: /\.less$/, //antd的时候会出错
        //   use: ["style-loader", {loader: 'css-loader', options: {sourceMap: 1}}, "postcss-loader", "less-loader"]
        // },
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