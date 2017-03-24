/* @flow */

import React from 'react';
import {
  Centered,
  FullScreen,
  Title,
} from '../components';
import Multislide from '../components/multislide';


const slides = [
  () => <FullScreen color="#000">
    <Centered>
      <Title style={{fontSize: 96, lineHeight: 1.2, textAlign: 'left', padding: '0 15%'}}>
        Terminology<br />
        Fiber Concepts<br />
        Renderer Concepts<br />
        Implementation!
      </Title>
    </Centered>
  </FullScreen>,
];

export default Multislide(slides);
