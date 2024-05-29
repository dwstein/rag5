const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');

// Load environment variables from .env file
const env = dotenv.config().parsed;

// Reduce it to a nice object, the same as before
const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    port: 3000,
    proxy: [
      {
        // context: ['/'],
        // context: ['/api'], // Proxy only API requests
        context: ['/api', '/auth', '/users', '/admin', '/home'], // Proxy all backend routes
        target: process.env.API_BASE_URL || 'http://localhost:9000',
        changeOrigin: true,
        logLevel: 'debug',
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin(envKeys)
  ],
};
