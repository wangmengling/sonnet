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
    chunkFilename: '[name].js'
  },
  module: {
    rules: [
        {test: /\.css$/, loader: "style!css?sourceMap!postcss"},
        {test: /\.less$/, loader: "style!css!less|postcss"},
        {test: /\.scss$/, loader: "style!css!sass|postcss"},
        {
            test: /\.(js|jsx)$/,
            use: ['babel-loader'],
            exclude: /node_modules/,
            // include: path.join(__dirname, 'App')
        },
        {test: /\.jsx$/, loader: "jsx-loader"},
        {test: /\.(jpg|png)$/, loader: "url?limit=8192"},
        {
            test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
            loader: 'file-loader'
        },
        {test: /\.json$/,loader: 'json'},
        {test: /\.html$/,loader: 'raw'},
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    // new HtmlWebpackPlugin({template: './public/index.html'})
  ]
};

module.exports = config;