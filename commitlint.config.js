const typeEnum = [
  'chore',
  'feat',
  'fix',
  'docs',
  'style',
  'refactor',
  'test',
  'revert',
  'codestyle',
  'package',
  'build',
];

module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', typeEnum],
    'header-max-length': [2, 'always', 160],
  },
};
