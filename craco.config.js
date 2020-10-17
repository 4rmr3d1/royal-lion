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
  },
  webpack: {
    alias: {
      'react-dom': '@hot-loader/react-dom'
    },
    configure: (webpackConfig) => {
      return {
        ...webpackConfig,
        entry: [
          'core-js/stable/promise',
          'core-js/stable/array/from',
          'core-js/stable/array/includes',
          'core-js/stable/array/filter',
          'core-js/stable/object/entries',
          'core-js/stable/object/assign',
          'core-js/stable/object/values',
          'core-js/stable/object/is-frozen',
          'core-js/stable/array/fill',
          'core-js/stable/array/find',
          ...webpackConfig.entry
        ]
      }
    }
  }
}
