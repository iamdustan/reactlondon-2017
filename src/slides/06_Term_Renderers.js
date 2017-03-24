/* @flow */

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import './codemirror.css';

import React from 'react';
import {
  Centered,
  FullScreen, Title,
} from '../components';
import Multislide from '../components/multislide';
import DomDemo from '../demos/dom';
import Codemirror from 'react-codemirror';
import 'codemirror/mode/javascript/javascript';

import NativeGif from '../resources/ato-counter-native.gif';
import BlessedGif from '../resources/ato-counter-blessed.gif';
import AframeGif from '../resources/ato-counter-aframe.gif';
import HardwareVideo from '../resources/react-hardware.mp4';
import CounterSource from '../demos/GenericCounter';

const defaultColor = '#000000';
const Pane = ({color, text, image, video, Comp}) => () => (
  <FullScreen background={color || defaultColor}>
    {Comp && <Comp />} {text && <Centered><Title>{text}</Title></Centered>}
    {image && <img src={image} alt={text} />}
    {video && <video  width="100%" controls>
      <source src={video} type="video/mp4" />
    </video>}
  </FullScreen>
);

const slides = [
  Pane({text: 'Renderer'}),
  Pane({/*text: 'CounterDOM', */Comp: DomDemo}),
  () => <Codemirror value={CounterSource} options={{
    mode: 'javascript',
    theme: 'material',
    fullscreen: true,
  }} />,
  Pane({text: 'CounterIOS', image: NativeGif}),
  Pane({text: 'CounterBlessed', image: BlessedGif}),
  Pane({text: 'CounterAframe', image: AframeGif}),
  Pane({text: 'CounterHardware', video: HardwareVideo}),
];

export default Multislide(slides);
