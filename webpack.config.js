const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  entry: {
    'background/service-worker': './src/background/service-worker.js',
    'content/content-script': './src/content/content-script.js',
    'content/glyph-insights': './src/content/glyph-insights.js',
    'popup/popup': './src/popup/index.jsx',
    'popup-mini/popup': './src/popup-mini/popup.js',
    'graph-page/index': './src/graph-page/index.jsx'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react']
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/popup.html',
      filename: 'popup/index.html',
      chunks: ['popup/popup']
    }),
    new HtmlWebpackPlugin({
      template: './src/popup-mini/index.html',
      filename: 'popup-mini/index.html',
      chunks: ['popup-mini/popup']
    }),
    new HtmlWebpackPlugin({
      template: './src/graph-page/index.html',
      filename: 'graph-page/index.html',
      chunks: ['graph-page/index']
    }),
    new CopyPlugin({
      patterns: [
        { from: 'manifest.json', to: 'manifest.json' },
        { from: 'public/icons', to: 'icons', noErrorOnMissing: true }
      ]
    })
  ],
  devtool: process.env.NODE_ENV === 'production' ? false : 'cheap-module-source-map',
  optimization: {
    minimize: process.env.NODE_ENV === 'production'
  }
};
