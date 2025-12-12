/**
 * Module dependencies.
 */

import dayjs from 'dayjs';
import dayjsCustomParseFormat from 'dayjs/plugin/customParseFormat.js';
import dayjsUtcPlugin from 'dayjs/plugin/utc.js';
import path from 'node:path';

/**
 * Enable support for custom parse format and parse and display UTC to Day.js.
 */

dayjs.extend(dayjsCustomParseFormat);
dayjs.extend(dayjsUtcPlugin);

/**
 * Constants.
 */

const FILENAME_REGEX = /^([0-9]{14})-([a-z0-9-]+)$/;

/**
 * `database-migration-filename-format` rule.
 * - Validates that database migration file names are formatted correctly.
 *
 * @type {import('eslint').Rule.RuleModule}
 */

const databaseMigrationFilenameFormat = {
  create(context) {
    return {
      Program(node) {
        const { filename: filepath } = context;
        const { name: filename } = path.parse(filepath);
        const regexMatchResult = filename.match(FILENAME_REGEX);

        if (!regexMatchResult) {
          context.report({ data: { filepath }, messageId: 'invalidFormat', node });

          return;
        }

        const [, dateTimeString] = regexMatchResult;
        const dateTime = dayjs(dateTimeString, 'YYYYMMDDHHmmss', true).utc();

        if (!dateTime.isValid()) {
          context.report({ data: { dateTimeString, filepath }, messageId: 'malFormedDateTime', node });

          return;
        }

        if (dateTime.isAfter(dayjs().utc())) {
          context.report({ data: { dateTimeString, filepath }, messageId: 'dateTimeInTheFuture', node });

          return;
        }
      }
    };
  },
  meta: {
    docs: {
      description:
        'Database migration file names are in the format `YYYYMMDDHHMMSS-<name>`, where `name` must match the regex `[a-z0-9-]+`, the date/time is UTC and is not in the future, e.g. `20251212173900-foo-bar-biz`.'
    },
    messages: {
      dateTimeInTheFuture: 'Date and time are valid but cannot be in the future',
      invalidFormat:
        'File name is not in the correct format. Expected format is YYYYMMDDHHMMSS-<name>, e.g. 20251212173900-foo-bar-biz',
      malFormedDateTime: 'Date and/or time are malformed: {{dateTimeString}}. Expected format: YYYYMMDDHHMMSS'
    },
    type: 'layout'
  }
};

/**
 * Export `database-migration-filename-format` rule.
 */

export default databaseMigrationFilenameFormat;
