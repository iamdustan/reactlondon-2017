/* @flow */

import React from 'react';
import styled from 'styled-components';
import Gif from '../resources/facepunch.png';

const Background = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  top: -1%;
  left: -1%;
  background-color: ${props => props.backgroundColor || 'inherit'}
  background-image: url(${props => props.src});
  background-repeat: no-repeat;
  background-size: 100% 100%;
`;

const Figcaption = styled.div`
  color: #000;
  position: absolute;
  bottom: 2.5%;
  right: 2.5%;
`;

export default () => (
  <Background src={Gif}
    backgroundColor="#fff"
  >
    <Figcaption>http://giphy.com/gifs/self-esteem-r6xFMQNPfSGGc</Figcaption>
  </Background>
);


