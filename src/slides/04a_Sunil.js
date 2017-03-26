/* @flow */

import React from 'react';
import {
  Centered,
  FullScreen,
} from '../components';
import Multislide from '../components/multislide';

import TheTweet from '../resources/sunil-tweet.png';

const slides = [
  () => <FullScreen background="#fff">
    <Centered>
      <img src={TheTweet} alt="Sunil and I agree" />
    </Centered>
  </FullScreen>,
];

export default Multislide(slides);

