const CracoAlias = require('craco-alias')
const { ESLINT_MODES } = require('@craco/craco')

module.exports = {
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        aliases: {
          '@app': './src'
        }
      }
    }
  ],
  eslint: {
    mode: ESLINT_MODES.file,
    loaderOptions: eslintOptions => {
      return { ...eslintOptions, ignore: true }
    }
  }
}