import js from "@eslint/js";
import tseslint from "typescript-eslint";
import prettierConfig from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";
import globals from "globals";

export default [
	js.configs.recommended,
	...tseslint.configs.recommended,

	{
		files: ["**/*.{ts,mts,cts,tsx,js,jsx,mjs,cjs}"],
		languageOptions: {
			globals: {
				...globals.node,
			},
		},
		plugins: {
			prettier: prettierPlugin,
		},
		rules: {
			"prettier/prettier": "error",
		},
	},
	prettierConfig,

	{
		ignores: ["dist/", "node_modules/"],
	},
];
