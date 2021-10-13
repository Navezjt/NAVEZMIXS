const pkg = require('./package.json')
const { execSync } = require('child_process')
const pkgVersion = `${process.env.PKG_VERSION || pkg.version}`

// http://schacon.github.io/git/git-show
const buildDate = execSync('git show -s --format=%ci HEAD')
  .toString()
  .replace(/[\r\n]+$/, '')

const commitSha = execSync('git rev-parse --short HEAD')
  .toString()
  .replace(/[\r\n]+$/, '')

const plugins = [
  ['macros'],
  [
    'transform-define',
    {
      __VERSION__: pkgVersion,
      __DEV__: process.env.NODE_ENV !== 'production',
      __BUILD_DATE__: buildDate,
      __COMMIT_SHA__: commitSha
    }
  ]
]

if (process.env.NODE_ENV === 'production') {
  // plugins.push(['transform-remove-console', { exclude: ['error', 'warn'] }])
  plugins.push(['transform-remove-console'])
}
module.exports = {
  presets: ['next/babel'],
  plugins
}
