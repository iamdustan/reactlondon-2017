
export default `import React from 'react';
import Counter from './GenericCounter';
import styles from './styles.blessed.js';

export default (baseProps) => (
  <Counter
    {...baseProps}
    render={(props, state) => (
      <element
        top={baseProps.top}
        left={baseProps.left}
        right={baseProps.right}
        width={baseProps.width}
        height={5}
      >
        <box
          label={'Count'}
          class={styles.bordered}
        >
          <button
            align='center'
            valign='middle'
            height={3}
            left={0}
            right={0}
            style={{fg: 'white', bg:'#db4886'}}
            mouse
            onClick={props.onClick}
          >{state.count}</button>
        </box>
      </element>
    )}
  />
);`
