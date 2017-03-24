/* @flow */

import React from 'react';
import {
  Centered,
  FullScreen,
  Title,
} from '../components';
import styled from 'styled-components';

const Faded = styled.div`
  opacity: 0.5;
`;

export default () => <FullScreen color="#000">
  <Centered>
    <Title style={{fontSize: 96, lineHeight: 1.2, textAlign: 'left', padding: '0 15%'}}>
      Terminology<br />
      <Faded>
        Fiber Concepts<br />
        Renderer Concepts<br />
        Implementation!
      </Faded>
    </Title>
  </Centered>
</FullScreen>;

