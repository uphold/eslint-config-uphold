// Avoid extra `no-unused-vars` violations.
function noop() {
  // do nothing
}

// `array-callback-return`.
[1, 2].map(() => {});

// `no-console`.
console.log('foo');

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

// `no-dupe-keys`.
const noDupeKeys = { foo: 'bar', foo: 'biz' };

noop(noDupeKeys);

// `no-irregular-whitespace`.
// Comments should not have irregular spaces.
noop('Strings cannot have irregular spaces', `String templates cannot have irregular spaces`);

// `no-labels`.
noLabels: {
  break noLabels;
}

// `no-multi-str`.
const noMultiStr = 'Line 1 \
  Line 2';

noop(noMultiStr);

// `no-this-before-super`.
function NoThisBeforeSuper() {}

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

function funcThatReturns(bar) {
  if (!bar) {
    return;
  }
  return bar;
}

funcThatReturns('foo');

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

// promise/prefer-await-to-then
((foo = {}) => {
  foo.then({});
})();

// `require-await`.
(async () => {})();

// `rulesdir/explicit-sinon-use-fake-timers`
const sinon = {};

sinon.useFakeTimers();

// `sort-destructure-keys/sort-destructure-keys`.
const foobject = {
  FOXTROT: 0,
  alpha: 1,
  beta: 2,
  charlie: 3,
  delta: 4
};

const { beta, alpha } = foobject;
const { delta, FOXTROT } = foobject;
const { delta: Echo, charlie } = foobject;

noop(alpha);
noop(beta);
noop(charlie);
noop(delta);
noop(Echo);
noop(FOXTROT);

// `sort-imports-requires/sort-imports`.
import import1 from 'import-1';
import { import2 } from 'import-2';

noop(import1);
noop(import2);

// `sort-imports-requires/sort-requires`.
const import3 = require('import-1');
const { import4 } = require('import-2');

noop(import3);
noop(import4);

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
