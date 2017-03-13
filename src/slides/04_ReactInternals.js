/* @flow */

import React from 'react';
import styled from 'styled-components';
import Gif from '../resources/facepunch.png';

const Background = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-image: url(${props => props.src});
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-blend-mode: color-burn;
  background-color: ${props => props.backgroundColor || 'inherit'}
`;

const Figcaption = styled.div`
  color: #000;
  position: absolute;
  bottom: 2.5%;
  right: 2.5%;
`;

export default () => (
  <Background src={Gif}
  style={{transform: 'translate(-1px, -2px)'}}>
    <Figcaption>http://giphy.com/gifs/self-esteem-r6xFMQNPfSGGc</Figcaption>
  </Background>
);


