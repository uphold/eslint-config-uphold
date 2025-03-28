const React = null;

// Avoid extra `no-unused-vars` violations.
function noop() {
  // Do nothing
}

// `react-hooks/exhaustive-deps`.
const useCallback = noop;

function MyComponent(props) {
  useCallback(() => {
    noop(props.foo?.bar?.baz);
  }, [props]);
}

noop(MyComponent);

// `react-hooks/rules-of-hooks`.
const useEffect = noop;

const RulesOfHooks = () => {
  useEffect(noop);

  return null;
};

noop(RulesOfHooks);

// `react/prefer-stateless-function`.
class PreferStatelessFunction extends React.Component {
  getFoo = () => <div>Hello</div>;

  render() {
    return this.getFoo();
  }
}

noop(PreferStatelessFunction);

// React/JSX `prettier` support
const PrettierReact = () => <div />;

noop(PrettierReact);

// new-cap exception for `Bignumber`
const BigNumber = () => {};

noop(BigNumber());
