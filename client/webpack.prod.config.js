const path = require('path');
const Dotenv = require('dotenv-webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  mode: 'production',
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@slice': path.resolve(__dirname, './src/slice'),
      '@paymentSlice': path.resolve(__dirname, './src/paymentSlice'),
      '@calendarSlice': path.resolve(__dirname, './src/calendarSlice'),
      '@settingSlice': path.resolve(__dirname, './src/settingSlice'),
      '@presentational': path.resolve(
        __dirname,
        './src/components/presentational'
      ),
      '@service': path.resolve(__dirname, './src/services'),
      '@public': path.resolve(__dirname, './public'),
      '@util': path.resolve(__dirname, './util'),
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
      {
        test: /\.csv$/,
        use: './csvLoader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      favicon: './public/favicon.ico',
    }),
    new CleanWebpackPlugin(),
    new Dotenv({
      path: `./.env.${process.env.NODE_ENV}`,
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
};
