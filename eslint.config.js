import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import path from 'path'

export default tseslint.config(
  { 
    ignores: [
      'dist/**',
      'node_modules/**',
      '**/*.js',
      '!eslint.config.js'
    ] 
  },
  
  // Frontend files (src/ only - these need React rules)
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['src/**/*.ts', 'src/**/*.tsx'],  // ✅ Only src files
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        project: './tsconfig.app.json',
        tsconfigRootDir: path.resolve(),
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'quotes': ['error', 'single'],  // ✅ Add this - enforce single quotes
    },
  },
  
  // Shared files (used by both frontend and backend)
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['shared/**/*.ts', 'shared/**/*.tsx'],  // ✅ Shared files
    languageOptions: {
      ecmaVersion: 2022,
      globals: { ...globals.browser, ...globals.node }, // Both environments
      parserOptions: {
        project: ['./tsconfig.app.json', './tsconfig.node.json'], // Both configs
        tsconfigRootDir: path.resolve(),
      },
    },
    rules: {
      'quotes': ['error', 'single'],  // ✅ Add this - enforce single quotes
    },
  },
  
  // Backend files (functions/)
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['functions/**/*.ts', 'functions/**/*.tsx'],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.node,
      parserOptions: {
        project: './tsconfig.node.json',
        tsconfigRootDir: path.resolve(),
      },
    },
    rules: {
      'quotes': ['error', 'single'],  // ✅ Add this - enforce single quotes
    },
  },
  
  // Config files (TypeScript only)
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['vite.config.ts'],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.node,
      parserOptions: {
        project: './tsconfig.node.json',
        tsconfigRootDir: path.resolve(),
      },
    },
  },
  
  // JavaScript config files (no TypeScript rules)
  {
    extends: [js.configs.recommended],
    files: ['eslint.config.js'],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.node,
    },
  }
)