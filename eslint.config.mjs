// eslint.config.js
import flypeng from '@flypeng/eslint-config';

/** @type {import('eslint').Linter.Config[]} */
export default [
    ...flypeng(),
    {
        ignores: ['**/dist/**', '**/node_modules/**', '**/example/**'],
    },
];
