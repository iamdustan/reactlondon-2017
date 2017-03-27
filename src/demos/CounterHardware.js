
export default `import React from 'react';
import { Button } from 'react-hardware';
import { BlinkingLed } from './BlinkingLed';
import Counter from './GenericCounter';

export default (baseProps) => (
  <Counter
    {...baseProps}
    render={(props, state) => [
      <BlinkingLed
        pin={baseProps.led || 13}
        count={state.count}
      />,
      <Button
        pin={baseProps.button || 2}
        onUp={props.onClick}
      />,
    ]}
  />
);`
