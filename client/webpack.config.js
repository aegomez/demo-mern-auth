// @ts-check

const path = require('path')

/** @type {import('webpack').Configuration} */
const config = {
  mode: 'development',
  entry: './src/index.tsx',
  output: {
    path: path.join(__dirname, 'public/js'),
    filename: 'main.js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [{
      test: /\.tsx?$/,
      include: [
        path.join(__dirname, 'src')
      ],
      loader: 'ts-loader',
      options: {
        transpileOnly: true
      }
    }]
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    compress: true,
    historyApiFallback: true,
    port: 9000,
    proxy: {
      '/api': 'http://localhost:5000'
    },
    publicPath: '/js/'
  }
}

module.exports = config;
