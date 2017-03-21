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

import TheTweet from '../resources/sunil-tweet.png';

const slides = [
  () => <FullScreen color="#000">
    <Centered>
      <Title style={{fontSize: 96, lineHeight: 1.2, textAlign: 'left', padding: '0 15%'}}>
        Fiber Concepts<br />
        Renderer Concepts<br />
        React Hardware
      </Title>
    </Centered>
  </FullScreen>,

  /*
  () => <FullScreen color="#000">
    <Centered>
      <Title>But why?</Title>
    </Centered>
  </FullScreen>,
  */

  () => <FullScreen color="#000">
    <Centered>
      <img src={TheTweet} alt="Sunil and I agree" />
    </Centered>
  </FullScreen>,
];

export default Multislide(slides);
