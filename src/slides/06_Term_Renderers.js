/* @flow */

import React from 'react';
import { findDOMNode } from 'react-dom';
import styled from 'styled-components';
import {
  Centered,
  FullScreen,
  Title,
} from '../components';
import Code from '../components/code';
import CodeSlide from '../components/CodeSlide';
import Multislide from '../components/multislide';
import DomDemo from '../demos/dom';

import DomGif from '../resources/react-dom-counter.gif';
import NativeGif from '../resources/ato-counter-native.gif';
import BlessedGif from '../resources/ato-counter-blessed.gif';
import AframeGif from '../resources/ato-counter-aframe.gif';
import HardwareVideo from '../resources/react-hardware.mp4';

import CounterSource from '../demos/GenericCounter';
import DomSource from '../demos/CounterDOM';
import IOSSource from '../demos/CounterIOS';
import BlessedSource from '../demos/CounterBlessed';
import AframeSource from '../demos/CounterAframe';
import HardwareSource from '../demos/CounterHardware';

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

const CodeTitle = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  padding: 0.5em;
  background: #fff;
  color: #000;
`;

const CodePane = ({
  color,
  text,
  image,
  video,
  code,
  children,
  scrollTop,
  ranges,
}) => () => (
  <FullScreen background={color || defaultColor}>
    {text && <CodeTitle>{text}</CodeTitle>}
    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', height: '100%'}}>
      <div style={{flex: '0 0 50%', textAlign: 'center'}}>
        {children}
        {image && <img src={image} alt={text} style={{maxWidth: '100%'}} />}
        {video && <video  width="100%" autoPlay>
          <source src={video} type="video/mp4" />
        </video>}
      </div>
      <div style={{flex: '0 0 50%', height: '100%'}}>
        <Code
          ref={node => {
            if (node && scrollTop) {
              const element = findDOMNode(node);
              element.scrollTop = scrollTop;
            }
          }}
          src={code}
          style={{paddingLeft: '1.5em', paddingRight: 0}}
          language="javascript"
        />

        {/*
          <CodeSlide
            code={code}
            style={{paddingLeft: '1.5em', paddingRight: 0}}
            lang="javascript"
            ranges={ranges}
          />
        */}
      </div>
    </div>
  </FullScreen>
);
const slides = [
  Pane({text: 'Renderer'}),
  Pane({/*text: 'CounterDOM', */Comp: () => (
    <div style={{display: 'flex', alignItems: 'center', height: '100%'}}>
      <div style={{margin: '0 auto', minWidth: 680}}>
        <img src={DomGif} alt={'React DOM Counter'} style={{maxWidth: '100%'}} />
      </div>
    </div>
  )}),
  // () => <FullScreen background={defaultColor}><Code src={CounterSource} /></FullScreen>,
  CodePane({
    text: 'CounterDOM',
    image: DomGif,
    code: CounterSource,
  }),
  CodePane({
    text: 'CounterDOM',
    image: DomGif,
    code: CounterSource,
    scrollTop: 760,
  }),
  CodePane({
    text: 'CounterDOM',
    image: DomGif,
    code: DomSource,
    scrollTop: 760,
  }),
  CodePane({
    text: 'CounterIOS',
    image: NativeGif,
    code: IOSSource,
    scrollTop: 460,
  }),
  CodePane({
    text: 'CounterBlessed',
    image: BlessedGif,
    code: BlessedSource,
    scrollTop: 260,
  }),
  CodePane({
    text: 'CounterAframe',
    image: AframeGif,
    code: AframeSource,
  }),
  // Pane({text: 'CounterHardware', video: HardwareVideo}),
  CodePane({
    text: 'CounterHardware',
    video: HardwareVideo,
    code: HardwareSource,
  }),
];

export default Multislide(slides);
