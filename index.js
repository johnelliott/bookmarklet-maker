var transform = require('babel-core').transform
var minify = require("uglify-js").minify
var copyLinks = require('./copy-links')

module.exports = function makeBookmarklet () {
 return `javascript:((${build()})())`
}

if (require.main === module) {
  process.stdout.write(module.exports())
}

function build () {
  return uglify(babelString(copyLinks.toString()))
}

function babelString (string) {
  var result = transform(string, {
    presets: [{
      env: {
        targets: {
          browsers: ['iOS 7', 'Last 2 versions']
        }
      }
    }]
  })
  return result.code
}

function uglify (es5string) {
  var result = minify(es5string, {fromString: true})
  return result.code
}
