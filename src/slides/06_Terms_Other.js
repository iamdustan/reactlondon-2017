/* @flow */

import React from 'react';
import {
  Centered,
  FullScreen,
  Title,
} from '../components';
import styled from 'styled-components';

export default () => <FullScreen color="#000">
  <Centered>
    <Title style={{fontSize: 96, lineHeight: 1.2, textAlign: 'left', padding: '0 15%'}}>
      Instances<br />
      Elements<br />
      Host<br />
      Reconciler<br />
    </Title>
  </Centered>
</FullScreen>;

