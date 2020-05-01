const webpack = require('webpack');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = (env, options) => {
  const isProduction = options.mode === 'production';

  const config = {
    mode: isProduction ? 'production' : 'development',
    devtool: isProduction ? 'none' : 'source-map',
    watch: !isProduction,
    entry: ['./src/index.js', './src/sass/style.scss'],
    output: {
      filename: 'script.js',
      path: path.resolve(__dirname, 'dist')
    },

    devServer: {
      contentBase: path.resolve(__dirname, 'dist'),
      compress: true,
      port: 9000,
      writeToDisk: true
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: 'index.html'
      }),
      new MiniCssExtractPlugin({
        filename: 'style.css'
      }),
      new CopyPlugin([
        { from: './src/img', to: 'assets/img' },
        { from: './src/audio', to: 'assets/audio' }
      ]),
      ...(isProduction ? [new CleanWebpackPlugin()] : [])
    ],

    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        },
        {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'
          ]
        },
        {
          test: /\.(png|svg|jpe?g|gif)$/i,
          use: {
            loader: 'file-loader',
          },
        },
      ]
    },
  }

   return config;
}
