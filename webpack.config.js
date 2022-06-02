require('webpack')
var path = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'dist.min.js',
    path: path.resolve(__dirname, './dist')
  }
}
