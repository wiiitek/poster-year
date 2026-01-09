// @ts-check

import eslint from '@eslint/js';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';

export default defineConfig(
  {
    ignores: [
      'dist/**',
      'node_modules/**',
      'playwright-report/**',
      'test-results/**',
    ]
  },
  eslint.configs.recommended,
  tseslint.configs.recommended,
  {
    rules: {
      // turn off the base Eslint rule
      'semi': 'off',
      // configure the other one to not allow for semicolons
      '@/semi': ['error', 'never']
    }
  }
);
