/* @flow */

import React from 'react';
import {
  Centered,
  FullScreen,
  Title,
} from '../components';
import Code from '../components/code';
import Multislide from '../components/multislide';
import DomDemo from '../demos/dom';

import NativeGif from '../resources/ato-counter-native.gif';
import BlessedGif from '../resources/ato-counter-blessed.gif';
import AframeGif from '../resources/ato-counter-aframe.gif';
import HardwareVideo from '../resources/react-hardware.mp4';

import CounterSource from '../demos/GenericCounter';
import IOSSource from '../demos/CounterIOS';
import BlessedSource from '../demos/CounterBlessed';
import AframeSource from '../demos/CounterAframe';

const defaultColor = '#000000';
const Pane = ({color, text, image, video, Comp}) => () => (
  <FullScreen background={color || defaultColor}>
    {Comp && <Comp />}
    {text && <Centered><Title>{text}</Title></Centered>}
    {image && <img src={image} alt={text} />}
    {video && <video  width="100%" controls>
      <source src={video} type="video/mp4" />
    </video>}
  </FullScreen>
);

const CodeTitle = (props) => <div>{props.children}</div>;

const CodePane = ({color, text, image, video, code}) => () => (
  <FullScreen background={color || defaultColor}>
    {text && <CodeTitle>{text}</CodeTitle>}
    <div style={{display: 'flex', flexDirection: 'row'}}>
      <div>
        {image && <img src={image} alt={text} />}
        {video && <video  width="100%" controls>
          <source src={video} type="video/mp4" />
        </video>}
      </div>
      <div>
        <Code src={code} />
      </div>
    </div>
  </FullScreen>
);
const slides = [
  Pane({text: 'Renderer'}),
  Pane({/*text: 'CounterDOM', */Comp: DomDemo}),
  () => <FullScreen background={defaultColor}><Code src={CounterSource} /></FullScreen>,
  CodePane({
    text: 'CounterIOS',
    image: NativeGif,
    code: IOSSource,
  }),
  CodePane({
    text: 'CounterBlessed',
    image: BlessedGif,
    code: BlessedSource,
  }),
  CodePane({
    text: 'CounterAframe',
    image: AframeGif,
    code: AframeSource,
  }),
  Pane({text: 'CounterHardware', video: HardwareVideo}),
];

export default Multislide(slides);
