/* @flow */

import React from 'react';
import ReactLogo from '../logo.svg';
import Pete from '../resources/pete.jpg';
import {
  BlendedImage,
  FullScreen,
  Title,
  Fade,
} from '../components';

export default (props) => (
  <FullScreen background="purple">
    <Fade delay={7}><BlendedImage backgroundColor="purple" backgroundSize="50%" src={Pete} /></Fade>
    <Fade>
      <Title>
        <Fade delay={5} duration={2} style={{display: 'inline-block', verticalAlign: 'middle'}}><img width={212} src={ReactLogo} /></Fade>
        2013
      </Title>
    </Fade>
    <Fade delay={15} duration={2}>
      <FullScreen background="black">
        <Title>HTML is <br />only the <br />beginning.</Title>
      </FullScreen>
    </Fade>
  </FullScreen>
);

