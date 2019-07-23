// Avoid extra `no-unused-vars` violations.
function noop() {
  // do nothing
}

// `consistent-this`.
const consistentThis = this;

noop(consistentThis);

// `curly`.
let curly = true;

if (curly) curly = false;

// `dot-notation`.
const dotNotation = {};

dotNotation['foo'] = 'bar';

// `id-match`.
let id_mátch;

noop(id_mátch);

// `mocha/no-exclusive-tests`.
describe.only('noExclusiveTests', () => {
  it('should not work');
});

// `mocha/no-identical-title`.
describe('noIdenticalTitle', () => {
  it('should not work');
  it('should not work');
});

// `mocha/no-nested-tests`.
it('noNestedTests', () => {
  it('should not work');
});

// `mocha/no-sibling-hooks`.
describe('noSiblingHooks', () => {
  before(() => {});
  before(() => {});
});

// `new-cap`.
const cap = require('cap');

new cap();

// `newline-before-return`.
function funcThatReturns(bar) {
  if (!bar) {
    return;
  }
  return bar;
}

funcThatReturns('foo');

// `no-class-assign`.
class NoClassAssign {}

NoClassAssign = 'foobar';

noop(NoClassAssign);

// `no-const-assign`.
const noConstAssign = true;

noConstAssign = false;

noop(noConstAssign);

// `no-constant-condition`.
if (true) {
  noop(true);
}

// `no-dupe-class-members`.
class NoDupeClassMembers {
  foo() {
    return 'bar';
  }

  foo() {
    return 'foo';
  }
}

noop(NoDupeClassMembers);

// `no-empty`.
try {
  noop();
} catch (e) {}

// `no-labels`.
noLabels: {
  break noLabels;
}

// `no-multi-str`.
const noMultiStr = 'Line 1 \
  Line 2';

noop(noMultiStr);

// `no-this-before-super`.
const NoThisBeforeSuper = require('no-this-before-super');

class Child extends NoThisBeforeSuper {
  constructor() {
    this.foo = 'bar';
    super();
  }
}

noop(Child);

// `no-underscore-dangle`.
class NoUnderscoreDangle {
  constructor() {
    this._foo();
  }
}

noop(new NoUnderscoreDangle());

// `no-unused-vars`
const foobar = '';

// `padding-line-between-statements`.
const newLineAfterVar = 'foo';
noop(newLineAfterVar);

// `prefer-destructuring`.
const bar = {};
const biz = bar.biz;
const baz = biz[0];

noop(biz, baz);

// `prettier/prettier`.
const singleQuote = "true";

noop(singleQuote);

const maximumLineLength = 'prettier dictates that lines of code must not exceed a length limit of 120 characters maximum';

noop(maximumLineLength);

// `require-await`.
(async () => {})();

// `sort-imports`.
import import1 from 'import-1';
import { import2 } from 'import-2';

noop(import1);
noop(import2);

// `sort-keys`.
const sortObjectProps = {
  var1: 'foo',
  var10: 'bar',
  var9: 'biz'
};

noop(sortObjectProps);

// `spaced-comment`.
//Comment missing space.

// `sql-template/no-unsafe-query`.
const db = {
  query: noop()
};
const foo = 'foo';

db.query(`SELECT ${foo} FROM bar`);

// `yoda`.
let yoda = true;

if (true === yoda) {
  yoda = false;
}
