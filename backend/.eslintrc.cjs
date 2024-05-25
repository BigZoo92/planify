module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended', // TypeScript rules
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended' // Active l'intégration de Prettier
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: [
    'react-refresh',
    '@typescript-eslint', // Ajout du plugin TypeScript
    'prettier' // Active le plugin Prettier
  ],
  rules: {
    'prettier/prettier': [
      'error',
      {
        'endOfLine': 'auto'
      }
    ],
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    '@typescript-eslint/no-unused-vars': 'of', // Signale les variables non utilisées
    '@typescript-eslint/no-explicit-any': 'of',
    '@typescript-eslint/ban-types': 'warn',
  },
  
}
