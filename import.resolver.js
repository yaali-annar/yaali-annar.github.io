const path = require('path')

const srcPath = path.resolve(__dirname, './src') + '/'
const subPaths = [
  'components',
  'constants',
  'contexts',
  'hooks',
  'routes',
  'styles',
  'utils',
]
const alias = subPaths.reduce(
  (accummulator, subPath) => ({
    ...accummulator,
    [`@${subPath}`]: `${srcPath}${subPath}`,
  }),
  {},
)

module.exports = {
  resolve: {
    modules: ['node_modules'],
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias,
  },
}
