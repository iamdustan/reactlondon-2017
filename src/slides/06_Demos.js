/* @flow */

import React from 'react';
import {
  Centered,
  FullScreen, Title,
} from '../components';
import Multislide from '../components/multislide';

const defaultColor = '#000000';
const Pane = ({color, text}) => () => (
  <FullScreen background={color || defaultColor}>
    <Centered><Title>{text}</Title></Centered>
  </FullScreen>
);

const slides = [
  Pane({text: 'CounterDOM'}),
  Pane({text: 'CounterIOS'}),
  Pane({text: 'CounterBlessed'}),
  Pane({text: 'CounterAframe'}),
  Pane({text: 'CounterHardware'}),
];

export default Multislide(slides);
