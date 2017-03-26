
export default `import React from 'react';
import { Entity } from 'aframe-react';
import Text from './components/Text';
import Counter from './GenericCounter';

export default ({initialValue, ...other}) => (
  <GenericCounter
    initialValue={initialValue}
    render={(props, state) => (
      <Text
        onClick={props.onClick}
        text={\`Count: \${state.count}\`}
        color='#DADADA'
        position={'-1.75 1 -1'}
        {...other}
      />
    )}
  />
);`
