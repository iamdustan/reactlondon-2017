/* @flow */

import React from 'react';
import {Motion, spring} from 'react-motion';

import {Title} from '../components';
import Multislide from '../components/multislide';

import MotionDOM from '../resources/react-motion-framer-dom.gif';
import MotionBlessed from '../resources/react-motion-framer-blessed.gif';

const s = {
  position: 'absolute',
  top: '10%',
  width: '100%',
  textAlign: 'center',
};

const Steps = [
  // 1
  () => [
    <Title.Centered>
      <div style={{fontSize: 42, padding: '0.2em'}}>Cheng Lou</div>
      React Motion
    </Title.Centered>
  ],

  // 2
  () => [
    <Title.Small style={s}>React Motion</Title.Small>,
    <Motion
      defaultStyle={{opacity: 0, position: 'absolute', top: '20%', width: '100%', textAlign: 'center'}}
      style={{opacity: spring(1, {stiffness: 5, damping: 5}), position: 'absolute', top: '20%', width: '100%', textAlign: 'center'}}>
      {interpolatingStyle => (
        <div style={{...interpolatingStyle}}>
          <img src={MotionDOM} alt="React Motion on DOM" />
        </div>
      )}
    </Motion>
  ],

  // 3
  () => [
    <Title.Small style={s}>React Motion</Title.Small>,
    <Motion
      defaultStyle={{opacity: 0, position: 'absolute', top: '20%', width: '100%', textAlign: 'center'}}
      style={{opacity: spring(1, {stiffness: 5, damping: 5}), position: 'absolute', top: '20%', width: '100%', textAlign: 'center'}}>
      {interpolatingStyle => (
        <div style={{...interpolatingStyle, position: 'absolute'}}>
          <img src={MotionBlessed} alt="React Motion on DOM" />
        </div>
      )}
    </Motion>,
  ],
];
export default Multislide(Steps, '#000000');

