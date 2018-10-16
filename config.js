const path = require('path')

module.exports = {
  port: 4000,
  buildPath: path.join(__dirname, 'build'),
  indexPath: path.join(__dirname, 'build', 'index.html')
}
