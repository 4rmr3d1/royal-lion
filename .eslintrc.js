module.exports = {
  extends: [
    "eslint:recommended",
    'plugin:react/recommended',
    'standard'
  ],
  env: {
    "browser": true
  },
  rules: {
    "react/prop-types": 0,
    "react/jsx-first-prop-new-line": [1, "multiline"],
    "react/jsx-max-props-per-line": [
      1,
      {
        "maximum": 1,
        "when": "always"
      }
    ],
    "react/jsx-closing-bracket-location": [1, "tag-aligned"],
    "react/jsx-sort-props": [1, { callbacksLast: true }],
    "indent": ["error", 2]
  }
}
