/* @flow */

import React from 'react';
import {
  Motion,
  spring,
} from 'react-motion';

import {
  FullScreen,
  Centered,
  Title,
  Blink,
} from '../components';
import { colors } from '../components/theme';
import Multislide from '../components/multislide';

const s = {
  display: 'inline-block',
  position: 'relative',
  textAlign: 'left',
  verticalAlign: 'middle',
};

const Steps = [
  // 1
  ({onRest}) => (
    <FullScreen background={colors.black}>
      <Motion defaultStyle={{opacity: 0}} style={{opacity: spring(1, {stiffness: 5, damping: 5})}} onRest={onRest}>
        {interpolatingStyle => 
          <Centered>
            <Title style={{...s, interpolatingStyle}}>
              We Implemented <br />A Renderer!
              <Blink
                style={{
                  borderBottom: '2px solid #fff',
                  position: 'absolute',
                  width: 600,
                  bottom: 0,
                  left: 153,
                }}
              />
            </Title>
          </Centered>
        }
      </Motion>
    </FullScreen>
  ),
];

export default Multislide(Steps);


