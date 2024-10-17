const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    background: './src/background.ts', // Фоновый скрипт
    contentScript: './src/contentScript.ts', // Контентный скрипт
    popup: './src/index.tsx' // Основное приложение с React (если есть popup)
  },
 
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',// Файлы будут называться background.js, contentScript.js и popup.js
    // publicPath: '/'
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
    },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all', // Опционально, если хотите разделять код на части
    },
  },
  devServer: {
    static: './dist',
  },
};
