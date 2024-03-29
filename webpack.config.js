const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: './src/app.js',
    output: {
      path: path.join(__dirname, 'public'),
      filename: 'bundle.js'
    },
    module: {
      rules: [{
        loader: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/,

      },
      {
        test: /\.s?css$/,
        use: [
               MiniCssExtractPlugin.loader,
               {
                   loader: 'css-loader',
                   options: {
                       sourceMap: true
                   }
               },
               {
                   loader: 'sass-loader',
                   options: {
                       sourceMap: true
                   }
               }
           ]
      }]
    },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "styles.css",
      chunkFilename: "[id].css"
    })
  ],
  devServer: {
      contentBase: path.join(__dirname, "public"),
      historyApiFallback: true
    }
};
