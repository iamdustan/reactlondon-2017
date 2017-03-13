import React from 'react';
import {
  Title,
  FullScreen,
} from '../components';

export default () => (
  <FullScreen background="black">
    <Title.Centered>
      <div style={{fontSize: 42, padding: '0.2em'}}>Michael Jackson</div>
      React Router
    </Title.Centered>
  </FullScreen>
);

