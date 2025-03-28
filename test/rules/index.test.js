/**
 * Module dependencies.
 */

import { RuleTester } from 'eslint';
import { describe, it } from 'node:test';
import fs from 'node:fs/promises';

RuleTester.describe = describe;
RuleTester.it = it;

const ruleTester = new RuleTester();

/**
 * Run tests for a directory.
 *
 * @param {object} options
 * @param {string} options.directory
 * @param {string} options.path
 */

const runDirectoryTests = ({ name, path }) => {
  describe(name, async () => {
    const files = await fs.readdir(`${import.meta.dirname}/${path}`, { withFileTypes: true });

    for (const file of files) {
      if (file.isDirectory()) {
        runDirectoryTests({ name: file.name, path: `${path}/${file.name}` });

        continue;
      }

      if (file.isFile() && file.name.endsWith('.js') && !file.name.endsWith('test.js')) {
        const { name, rule, tests } = await import(`${path}/${file.name}`);

        ruleTester.run(name, rule, tests);
      }
    }
  });
};

/**
 * Run tests for all rules.
 */

runDirectoryTests({ name: 'rules', path: '.' });
