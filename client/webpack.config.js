const path = require('path');
const Dotenv = require('dotenv-webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const RefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const webpack = require('webpack');

const port = process.env.PORT || 8080;

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@presentational': path.resolve(
        __dirname,
        './src/components/presentational'
      ),
      '@service': path.resolve(__dirname, './src/services'),
      '@public': path.resolve(__dirname, './public'),
      '@': path.resolve(__dirname, './src'),
    },
  },
  entry: { app: ['babel-polyfill', './src/index'] },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|jpeg)$/,
        use: ['file-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      favicon: './public/favicon.ico',
    }),
    new CleanWebpackPlugin(),
    new RefreshWebpackPlugin(),
    new Dotenv({
      path: './.env',
    }),
    new webpack.ProvidePlugin({
      React: 'react',
    }),
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'bundle.[hash].js',
  },
  devServer: {
    host: 'localhost',
    historyApiFallback: true,
    port: port,
    hot: true,
  },
};
