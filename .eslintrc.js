module.exports = {
  extends: ["eslint:recommended", "prettier", "plugin:flowtype/recommended"],
  parser: "babel-eslint",
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 6
  },
  env: {
    es6: true,
    jest: true,
    node: true
  },
  plugins: ["prettier", "import", "flowtype"],
  globals: {
    testRule: true
  },
  rules: {
    "prettier/prettier": [
      "error",
      {
        printWidth: 100,
        singleQuote: true,
        trailingComma: "es5"
      }
    ]
  }
};
