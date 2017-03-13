/* @flow */

import React from 'react';
import {Motion, spring} from 'react-motion';
import Codemirror from 'react-codemirror';
import 'codemirror/mode/javascript/javascript';

import {Title, Centered} from '../components';
import Multislide from '../components/multislide';
import HardwareDevtools from '../resources/react-hardware-devtools.gif';
import BlessedDevtools from '../resources/react-motion-framer-blessed.gif';

const s = {
  position: 'absolute',
  fontSize: 42,
  top: '15%',
  width: '100%',
  textAlign: 'center',
  fontFamily: 'menlo',
};

const Steps = [
  // 1
  () => [
    <Title.Small style={s}>$ yarn install react-devtools-core</Title.Small>,
    <Centered>
      <img src={HardwareDevtools} />
    </Centered>
  ],

  // 2
  () => [
    <Title.Small style={s}>$ yarn install react-devtools-core</Title.Small>,
    <Centered>
      <img src={BlessedDevtools} />
    </Centered>
  ],
];

export default Multislide(Steps, '#000000');

