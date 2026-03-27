import eslintPluginAstro from 'eslint-plugin-astro';
import format from 'eslint-plugin-format';
import pluginVue from 'eslint-plugin-vue';
import tseslint from 'typescript-eslint';
import vueParser from 'vue-eslint-parser';

export default [
  ...tseslint.configs.recommended,
  ...pluginVue.configs['flat/recommended'],
  ...eslintPluginAstro.configs.recommended,
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tseslint.parser,
        sourceType: 'module',
      },
    },
  },
  {
    files: ['**/*.{js,ts,jsx,tsx,vue,astro}'],
    plugins: {
      format,
    },
    rules: {
      'format/dprint': [
        'error',
      ],
      'format/oxfmt': [
        'error',
        {
          sortTailwindcss: true,
        },
      ],
    },
  },
  {
    ignores: ['dist/', '.astro/', 'node_modules/'],
  },
];
