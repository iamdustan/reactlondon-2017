/* @flow */

import React from 'react';
import {
  Centered,
  FullScreen,
  Fade,
} from '../components';
import styled from 'styled-components';
import Multislide from '../components/multislide';
import WebflowMov from '../resources/webflow.mov';
import WebflowOgg from '../resources/webflow.ogv';

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
      <Fade duration={2}><Sub>React Hardware</Sub></Fade>
      <Fade duration={2} delay={1}><Sub>Tiny React Renderer</Sub></Fade>
    </Main>
  </FullScreen>,

  () => (
    <FullScreen background="#000">
      <Centered>
        <Title>@iamdustan</Title>
        <div><Created /></div>
      </Centered>
    </FullScreen>
  ),

  () => [
    <FullScreen background="#000">
      <Centered>
        <Title>@iamdustan</Title>
        <div><Created /></div>
      </Centered>
    </FullScreen>,
    <Fade duration={1}>
      <FullScreen background="#fff">
        <Centered>
          <video width="100%" autoPlay>
            <source src={WebflowOgg} type="video/ogg" />
            <source src={WebflowMov} type="video/mov" />
          </video>
        </Centered>
      </FullScreen>
    </Fade>
  ],

];

export default Multislide(slides);
