/* @flow */

import React from 'react';
import {
  Centered,
  FullScreen,
  Fade,
} from '../components';
import styled from 'styled-components';
import Multislide from '../components/multislide';
import Webflow from '../resources/webflow.svg';

const Title = styled.div`
  font-size: 96px;
  font-weight: 700;
  margin-right: 10%;
  margin-top: 150px;
  text-align: right;
`;

const Sub = styled.div`
  font-size: 48px;
  margin-right: 10%;
  text-align: right;
`;

const Logo = styled.div`
  position: absolute;
  right: 5%;
  margin-top: -240px;
  margin-left: 50%;
`;

const Main = () => (
  <Centered>
    <Title>@iamdustan</Title>
    <Fade>
      <Sub>React Hardware</Sub>
      <Sub>Tiny React Renderer</Sub>
    </Fade>
  </Centered>
);

const slides = [
  () => <FullScreen color="#000"><Main /></FullScreen>,

  () => (
    <FullScreen color="#000">
      <Centered>
        <Logo><Webflow /></Logo>

        <Title>@iamdustan</Title>
        <div>
          <Sub>React Hardware</Sub>
          <Sub>Tiny React Renderer</Sub>
        </div>
      </Centered>
    </FullScreen>
  ),
];

export default Multislide(slides);
