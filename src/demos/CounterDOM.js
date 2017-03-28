
export default `import React from 'react';
import GenericCounter from './Counter';

export default function Counter(rootProps) {
  return (
    <GenericCounter
      {...rootProps}
      render={(props, state) => (
        <div className='Container'>
          <h2 className='Header'>React.js Counter</h2>
          <div className='Button' onClick={props.onClick}>
            Click counter: {state.count}
          </div>
        </div>
      )}
    />
  );
}`
