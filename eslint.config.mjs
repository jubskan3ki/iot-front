import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import prettierPlugin from 'eslint-plugin-prettier';
import vuePlugin from 'eslint-plugin-vue';
import vueParser from 'vue-eslint-parser';

export default [
	// 🚫 FICHIERS IGNORÉS
	{
		ignores: ['dist/**', 'node_modules/**', '.output/**', '.nuxt/**'],
	},

	// 🔧 BASE - Tous les fichiers
	{
		files: ['**/*.{js,ts,vue}'],
		plugins: {
			prettier: prettierPlugin,
		},
		rules: {
			// Formatage
			'prettier/prettier': 'error',

			// Code propre
			'no-debugger': 'error',
			'no-var': 'error',
			'prefer-const': 'error',
		},
	},

	// 🎭 VUE - Composants Vue
	{
		files: ['**/*.vue'],
		languageOptions: {
			parser: vueParser,
			parserOptions: {
				parser: tsParser,
				ecmaVersion: 'latest',
				sourceType: 'module',
			},
		},
		plugins: {
			vue: vuePlugin,
			'@typescript-eslint': tsPlugin,
		},
		rules: {
			// Structure des composants
			'vue/component-tags-order': ['error', { order: ['template', 'script', 'style'] }],
			'vue/component-api-style': ['error', ['script-setup']],

			// Nommage
			'vue/component-name-in-template-casing': ['error', 'PascalCase'],
			'vue/attribute-hyphenation': ['error', 'always'],

			// Erreurs communes
			'vue/no-unused-components': 'warn',
			'vue/no-unused-vars': 'warn',
			'vue/multi-word-component-names': 'off',
			'vue/no-v-html': 'off',

			// TypeScript dans Vue
			'@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
		},
	},

	// 🔷 TYPESCRIPT - Fichiers .ts
	{
		files: ['**/*.ts'],
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				project: './tsconfig.app.json',
				ecmaVersion: 'latest',
				sourceType: 'module',
			},
		},
		plugins: {
			'@typescript-eslint': tsPlugin,
		},
		rules: {
			// Variables et types
			'@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
			'@typescript-eslint/consistent-type-imports': 'error',

			// Bonnes pratiques
			'@typescript-eslint/prefer-optional-chain': 'warn',
		},
	},
];
