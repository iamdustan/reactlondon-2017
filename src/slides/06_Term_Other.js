/* @flow */

import React from 'react';
import {
  Centered,
  FullScreen,
  Title,
} from '../components';
import styled from 'styled-components';

const Entry = styled.div`
  font-size: 72px;
  line-height: 1.2;
  margin-top: 0.666em;
`;

const Reference = styled.div`
  font-size: 32px;
`;

export default () => <FullScreen background="#000">
  <Centered>
    <Title style={{textAlign: 'left', padding: '0 15%', marginTop: Math.round(-72 * 0.666)}}>
      <Entry>Elements and Instances</Entry>
      <Reference>https://facebook.github.io/react/blog/2015/12/18/react-components-elements-and-instances.html</Reference>

      <Entry>Reconciliation</Entry>
      <Reference>https://facebook.github.io/react/docs/reconciliation.html</Reference>

      <Entry>Composite and Host (Components)</Entry>
      <Reference>&nbsp;</Reference>
    </Title>
  </Centered>
</FullScreen>;

