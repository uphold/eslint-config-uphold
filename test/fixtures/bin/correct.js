const fs = require('node:fs');

// `no-console`.
console.log('foo');

// no-sync.
fs.writeFileSync('foo.txt', 'Hello, world!');

// `no-process-exit`.
process.exit(0);
