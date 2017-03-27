
export default `import React from 'react';
import {
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import Counter from './GenericCounter';
import styles from './styles.ios.js';

export default (baseProps) => (
  <GenericCounter
    {...baseProps}
    render={(props, state) => (
      <TouchableHighlight
        onPress={props.onClick}
        underlayColor={'transparent'}
      >
        <View style={styles.container}>
          <Text style={baseProps.style}>
            Counter:
          </Text>
          <Text style={baseProps.style}>{state.count}</Text>
        </View>
      </TouchableHighlight>
    )}
  />
);`
