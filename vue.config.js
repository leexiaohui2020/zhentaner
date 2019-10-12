const path = require('path')

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        base: path.join(__dirname, 'src/app'),
        common: path.join(__dirname, 'src/app/common')
      }
    }
  }
}