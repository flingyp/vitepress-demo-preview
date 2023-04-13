module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ['plugin:vue/essential', 'airbnb-base', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: ['vue', '@typescript-eslint'],
  // 0->off、1->warn、2->error
  rules: {
    'import/prefer-default-export': 0,
    'vue/no-multiple-template-root': 0, // Vue SFC 模板根模块
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true, // 对开发依赖设置为true，不报错
        optionalDependencies: false,
        peerDependencies: false,
        bundledDependencies: false
      }
    ],
    'import/extensions': 0,
    'import/no-unresolved': 0,
    'no-unused-vars': 1,
    'no-underscore-dangle': 0,
    'no-param-reassign': 0
  }
}
