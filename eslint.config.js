import tsParser from '@typescript-eslint/parser';
import tseslint from 'typescript-eslint';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default [
  {
    ignores: ['dist/', 'node_modules/', '.env', 'uploads']
  },
  tseslint.configs.base,
  {
    files: ['**/*.ts', '**/*.tsx', 'src/**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json',
      },
      globals: {
        process: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
    },
    rules: {
      'no-console': 'warn',
      'no-unused-expressions': 'error',
      'no-undef': 'off',
      'no-unused-vars': 'off',
      'prefer-const': 'error',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      '@typescript-eslint/explicit-function-return-type': 'off',
    },
  },

  eslintPluginPrettierRecommended,
];

