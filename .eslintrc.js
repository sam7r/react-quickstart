module.exports = {
  "parser": "babel-eslint",
  "env": {
    "browser": true,
    "es6": true,
    "commonjs": true
  },
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "globals": {
    "process": true,
    "__dirname": true
  },
  "rules": {
    "object-curly-spacing": ["error", "always"],
    "prefer-const": ["error", {"destructuring": "all"}],
    "curly": ["off"],
    "object-shorthand": ["error", "always"],
    "react/no-danger": [0],
    "no-process-env": [0],
    "no-console": [0],
    "no-process-env": [0],
    "space-before-blocks": ["error", "always"],
    "space-before-function-paren": ["error", "never"],
    "space-infix-ops": ["error"],
    "space-in-parens": ["error", "never"],
    "max-len": ["warn", 100],
    "semi": ["error", "always"],
    "no-empty-function": ["error", { "allow": ["arrowFunctions"] }],
    "quotes": ["error", "single"]
  },
  "settings": {
    "import/resolver": {
      "babel-module": {}
    }
  },
  "extends": ["eslint:recommended", "plugin:react/recommended"],
  "plugins": ["react"],
}
