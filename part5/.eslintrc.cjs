module.exports = {
   root: true,
   env: {
     browser: true,
     es2020: true,
     "vitest-globals/env": true
   },
   extends: [
     'eslint:recommended',
     'plugin:react/recommended',
     'plugin:react/jsx-runtime',
     'plugin:react-hooks/recommended',
     'plugin:vitest-globals/recommended',
   ],
   ignorePatterns: [
      'dist', 
      '.eslintrc.cjs',
      'node_modules',
      'build',
      'coverage',
      'vite.config.js',
      'testSetup.js'
   ],
   parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
   settings: { react: { version: '18.2' } },
   plugins: ['react-refresh'],
   rules: {
     "indent": [
       "error",
       3
     ],
     "eqeqeq": "error",
     "object-curly-spacing": [
       "error", "always"
     ],
     "arrow-spacing": [
       "error", { "before": true, "after": true }
     ],
     "no-console": 0,
     "react/react-in-jsx-scope": "off",
     "react/prop-types": 0,
     "no-unused-vars": 0,
     "semi": ["error", "always"]  // Enforce semicolons at the end of statements
   },
}
