import ts from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import prettier from 'eslint-plugin-prettier';
import importPlugin from 'eslint-plugin-import';

export default {
  files: ['**/*.ts', '**/*.tsx'],
  languageOptions: {
    parser: tsParser,
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: {
    '@typescript-eslint': ts,
    react: reactPlugin,
    'react-hooks': reactHooks,
    prettier,
    import: importPlugin,
  },
  rules: {
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-empty-function': 'warn',
    'react-hooks/exhaustive-deps': 'off',
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    'react/jsx-filename-extension': [
      'warn',
      { extensions: ['.tsx', '.jsx'] },
    ],
    'react-hooks/rules-of-hooks': 'error',
    'prettier/prettier': [
      'error',
      {
        "plugins": ["prettier-plugin-organize-imports"],
        "semi": true,
        "singleQuote": true,
        "trailingComma": "all",
        "tabWidth": 4,
        "printWidth": 80
      },
    ],
  },
};
