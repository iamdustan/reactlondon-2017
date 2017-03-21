/* @flow */
/* eslint-disable */

import React from 'react';
import {
  Centered,
  FullScreen,
  Fade,
  Blink,
  Title,
} from '../components';
import styled from 'styled-components';
import Multislide from '../components/multislide';
import Webflow from '../resources/webflow.svg';

const slides = [
  () => <FullScreen color="#000">
    <Centered>
      <Title style={{fontSize: 96}}>
        Fiber Concepts<br />
        Renderer Concepts<br />
        React Hardware
      </Title>
    </Centered>
  </FullScreen>,

  () => <FullScreen color="#000">
    <Centered>
      <Title>But why?</Title>
    </Centered>
  </FullScreen>,

  () => <FullScreen color="#000">
    <Centered>
      <Title>TODO: find tweet about 2017 being the year of renderers</Title>
    </Centered>
  </FullScreen>,
];

export default Multislide(slides);
