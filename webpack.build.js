var config = require('./webpack.config.js')

config.entry = {
  'vue-expanding-preview': './src/index.js',
}

config.output = {
  filename: './dist/[name].js',
  library: 'VueExpandingPreview',
  libraryTarget: 'umd'
}


module.exports = config
