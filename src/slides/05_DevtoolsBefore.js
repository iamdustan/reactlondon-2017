import React from 'react';
import Typewriter from 'react-typewriter';
const source = `
function tryToConnect() {
  ws.send('attach:agent');
  var _interval = setInterval(() => ws.send('attach:agent'), 500);
  ws.onmessage = evt => {
    if (evt.data.indexOf('eval:') === 0) {
      clearInterval(_interval);
      initialize(evt.data.slice('eval:'.length));
    }
  };
}

function initialize(text) {
  try {
    // FOR_BACKEND is used by the eval'd code
    eval(text); // eslint-disable-line no-eval
  } catch (e) {
    console.error('Failed to eval: ' + e.message);
    return;
  }
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.inject !== 'function') {
    console.log('__REACT_DEVTOOLS_GLOBAL_HOOK__.inject is not a function!');
    console.log('This could mean you’re attempting to inject for a second time.');
  } else {
    __REACT_DEVTOOLS_GLOBAL_HOOK__.inject({
      CurrentOwner: require('react/lib/ReactCurrentOwner'),
      InstanceHandles: require('react/lib/ReactInstanceHandles'),
      Mount: require('../ReactHardwareMount')['default'],
      Reconciler: require('react/lib/ReactReconciler'),
      // TextComponent: require('ReactNativeTextComponent'),
    });
  }

  ws.onmessage = handleMessage;
}
`;

const style = {
  fontSize: 24,
  fontWeight: 300,
  padding: '2.5% 15%',
};
export default class DevtoolsBefore extends React.Component {
  render() {
    return (
      <div style={style}>
        <Typewriter typing={1} minDelay={0} maxDelay={33.3333}>
          <pre>{source}</pre>
        </Typewriter>
      </div>
    );
  }
}

