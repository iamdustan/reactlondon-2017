/* @flow */

import React from 'react';
import {Motion, spring} from 'react-motion';
// import Codemirror from 'react-codemirror';
// import 'codemirror/mode/javascript/javascript';

import {Title} from '../components';
import Multislide from '../components/multislide';
import HardwareDevtools from '../resources/react-hardware-devtools.gif';
import BlessedDevtools from '../resources/react-blessed-devtools.gif';

const s = {
  position: 'absolute',
  fontSize: 42,
  top: '10%',
  width: '100%',
  textAlign: 'center',
  fontFamily: 'menlo',
};

const Steps = [
  // 1
  () => [
    <Title.Centered>
      <div style={{fontSize: 42, padding: '0.2em'}}>{' '}</div>
      React Devtools
    </Title.Centered>
  ],

  // 1
  () => [
    <Title.Small style={s}>$ yarn install react-devtools-core</Title.Small>,
    <Motion
      defaultStyle={{opacity: 0, position: 'absolute', top: '20%', width: '100%', textAlign: 'center'}}
      style={{opacity: spring(1, {stiffness: 5, damping: 5}), position: 'absolute', top: '20%', width: '100%', textAlign: 'center'}}>
      {interpolatingStyle => (
        <div style={{...interpolatingStyle}}>
          <img src={HardwareDevtools} alt="React Devtools on Hardware" />
        </div>
      )}
    </Motion>
  ],

  // 2
  () => [
    <Title.Small style={s}>$ yarn install react-devtools-core</Title.Small>,
    <Motion
      defaultStyle={{opacity: 0, position: 'absolute', top: '20%', width: '100%', textAlign: 'center'}}
      style={{opacity: spring(1, {stiffness: 5, damping: 5}), position: 'absolute', top: '20%', width: '100%', textAlign: 'center'}}>
      {interpolatingStyle => (
        <div style={{...interpolatingStyle}}>
          <img src={BlessedDevtools} alt="React Devtools on Blessed" />
        </div>
      )}
    </Motion>
  ],
];

export default Multislide(Steps, '#000000');

