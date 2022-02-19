// env: jasmine.
try {
  fail();
} catch (e) {
  // eslint-disable-line no-empty
}

// env: jest and mocha.
describe();

// Avoid extra `no-unused-vars` violations.
function noop() {
  // do nothing
}

// `array-callback-return`.
[1, 2].map(number => number + 1);

// `consistent-this`.
const self = this;

noop(self);

// `curly`.
let mixedRules = true;

if (mixedRules) {
  mixedRules = false;
} else {
  mixedRules = true;
}

// `dot-notation`.
const dotNotation = {};

dotNotation.foo = 'bar';

// `id-match`.
let idmatch;
let idMatch;
let IdMatch;
let IDMatch;
let IDMATCH;
let ID_MATCH;
let ID_M_ATCH;

noop(idmatch);
noop(idMatch);
noop(IdMatch);
noop(IDMatch);
noop(IDMATCH);
noop(ID_MATCH);
noop(ID_M_ATCH);
noop(__dirname);
noop(`${__dirname}`);

// `mocha/no-exclusive-tests`.
describe('noExclusiveTests', () => {
  it('should work');
});

// `new-cap`.
const Cap = require('cap');
const newCap = new Cap();

noop(newCap);

// `no-class-assign`.
class NoClassAssign {}

noop(NoClassAssign);

// `no-const-assign`.
let noConstAssign = true;

noConstAssign = false;

noop(noConstAssign);

// `no-constant-condition`.
const noConstantCondition = true;

if (noConstantCondition) {
  noop(noConstantCondition);
}

// `no-dupe-class-members`.
class NoDupeClassMembers {
  bar() {
    return 'bar';
  }

  foo() {
    return 'foo';
  }
}

noop(NoDupeClassMembers);

// `no-labels`.
const noLabels = { label: true };

while (noLabels.label) {
  break;
}

// `no-multi-str`.
const noMultiStr = `Line 1
  Line 2`;

noop(noMultiStr);

// `no-this-before-super`.
const NoThisBeforeSuper = require('no-this-before-super');

class Child extends NoThisBeforeSuper {
  constructor() {
    super();
    this.foo = 'bar';
  }
}

noop(Child);

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
let { bar } = {};
let [biz] = bar;
let baz = bar[biz];

bar.baz = bar.biz;
bar = biz.bar;
biz = baz[0];
baz = bar;

// `prettier/prettier`.
const singleQuote = 'true';

noop(singleQuote);

const maximumLineLength = '120';

noop(maximumLineLength);

// `require-atomic-updates`.
(async (foo = {}) => {
  await foo;

  foo.bar = 'biz';
})();

// `require-await`.
(async () => {
  await noop();
})();

// `rulesdir/explicit-sinon-use-fake-timers`
const sinon = {};

sinon.useFakeTimers({ toFake: ['Date'] });

// `sort-imports`.
import 'import-1';
import * as Import6 from 'import-2';
import { Import5, import4 } from 'import-3';
import { import3 } from 'import-4';
import Import2 from 'import-5';
import import1 from 'import-6';

noop(Import2);
noop(Import5);
noop(Import6);
noop(import1);
noop(import3);
noop(import4);

// `sort-keys`.
const sortObjectProps = {
  var1: 'foo',
  var9: 'bar',
  var10: 'biz'
};

noop(sortObjectProps);

// `spaced-comment`.
// spaced comment.

// `sql-template/no-unsafe-query`.
const db = {
  query: noop()
};
const foo = 'foo';
const sql = 'sql-tag';

db.query(sql`SELECT ${foo} FROM bar`);
db.query(`SELECT foo FROM bar`);

// `yoda`.
let yoda = true;

if (yoda === true) {
  yoda = false;
}

(async () => {
  const foobar = ['a', 'b', 'c'];

  for await (const foo of foobar) {
    foo.test = foo;
  }
})();
