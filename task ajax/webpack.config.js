"use strict"

const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
  entry: './start.js',
  output: {
    filename: 'bundle.js',
    library: 'start'
	},

  watch: NODE_ENV == 'development',

  watchOptions: {
    aggregateTimeout: 200
  },

  devtool: NODE_ENV == 'development' ? 'source-map' : null,
}
