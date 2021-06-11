const env = {
  amd: true,
  browser: true,
  commonjs: true,
  es6: true,
  node: true,
}

const extends_ = [
  'plugin:react/recommended',
  'plugin:prettier/recommended',
  'plugin:import/typescript',
  'plugin:@typescript-eslint/eslint-recommended',
  'plugin:@typescript-eslint/recommended',
]

const globals = {
  Atomics: 'readonly',
  SharedArrayBuffer: 'readonly',
}

const plugins = [
  '@typescript-eslint/eslint-plugin',
  'react',
  'react-hooks',
  'import',
]

const rules = {
  'import/order': 2,
  'jsx-quotes': [2, 'prefer-double'],
  'max-len': [1, 120, 2],
  'no-shadow': 2,
  'no-console': 0,
  '@typescript-eslint/no-empty-function': 0,
  '@typescript-eslint/no-unused-vars': 2,
  '@typescript-eslint/no-use-before-define': ['error'],
  '@typescript-eslint/no-var-requires': 0,
  'react-hooks/rules-of-hooks': 2,
  'react-hooks/exhaustive-deps': 2,
  'react/display-name': 0,
  'react/no-this-in-sfc': 2,
  'react/no-unescaped-entities': 2,
  'react/no-unused-prop-types': 2,
  'react/prop-types': 2,
}

const settings = {
  'import/resolver': {
    typescript: {
      alwaysTryTypes: true,
    },
  },
}

module.exports = {
  env,
  extends: extends_,
  globals,
  plugins,
  parser: '@typescript-eslint/parser',
  rules,
  settings,
}
