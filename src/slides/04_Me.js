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
  margin-top: 300px;
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
  margin-top: -100px;
  margin-left: 50%;
`;

const Main = ({children}) => (
  <Centered>
    <Title>@iamdustan</Title>
    {children}
  </Centered>
);

const Created = () => [
  <Sub>React Hardware</Sub>,
  <Sub>Tiny React Renderer</Sub>,
];

const slides = [
  () => <FullScreen background="#000">
    <Main>
      <div style={{opacity: 0}}><Created /></div>
    </Main>
  </FullScreen>,
  () => <FullScreen background="#000">
    <Main>
      <Fade duration={2}><Created /></Fade>
    </Main>
  </FullScreen>,

  () => (
    <FullScreen background="#000">
      <Centered>
        <Fade duration={2}><Logo><Webflow /></Logo></Fade>

        <Title>@iamdustan</Title>
        <div><Created /></div>
      </Centered>
    </FullScreen>
  ),
];

export default Multislide(slides);
