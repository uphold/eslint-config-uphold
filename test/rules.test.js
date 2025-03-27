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

const runDirectoryTests = ({ directory, path }) => {
  describe(directory, async () => {
    const files = await fs.readdir(`${import.meta.dirname}/${path}/${directory}`, { withFileTypes: true });

    for (const file of files) {
      if (file.isDirectory()) {
        runDirectoryTests({ directory: file.name, path: `${path}/${directory}` });

        continue;
      }

      if (file.isFile() && file.name.endsWith('.js')) {
        const { name, rule, tests } = await import(`${path}/${directory}/${file.name}`);

        ruleTester.run(name, rule, tests);
      }
    }
  });
};

/**
 * Run tests for all rules.
 */

runDirectoryTests({ directory: 'rules', path: '.' });
