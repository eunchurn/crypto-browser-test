module.exports = {
  extends: ["@repo/eslint-config/next.js"],
  rules: {
    "@typescript-eslint/no-unsafe-call": "off",
    "@typescript-eslint/no-unsafe-assignment": "off",
    "@typescript-eslint/no-unsafe-return": "off",
    "no-console": "warn"
  }
};
