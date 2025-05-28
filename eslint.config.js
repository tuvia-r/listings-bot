import eslintPluginTs from '@typescript-eslint/eslint-plugin';
import eslintParserTs from '@typescript-eslint/parser';

/** @type {import('eslint').Linter.Config[]} */
export default [
    {
        ignores: ['dist/', 'drizzle/', '*.js'],
    },
    {
        files: ['**/*.ts'],
        languageOptions: {
            parser: eslintParserTs,
            parserOptions: {
                ecmaVersion: 2021,
                sourceType: 'module',
            },
        },
        plugins: {
            '@typescript-eslint': eslintPluginTs,
        },
        rules: {
            ...eslintPluginTs.configs.recommended.rules,
            '@typescript-eslint/no-explicit-any': 'off',
        },
    },
];
