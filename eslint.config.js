const uphold = require('./src');

module.exports = [
  ...uphold,
  {
    ignores: ['!**/.release-it.js', 'test/fixtures']
  }
];
