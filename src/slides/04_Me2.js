/* @flow */

import React from 'react';
import {
  Centered,
  Fade,
  FullScreen,
  Title,
} from '../components';
import Multislide from '../components/multislide';
import Map from '../Map/map.svg';
import { CssAnimation } from '../Map';
import WebflowMov from '../resources/webflow.mov';
import WebflowOgg from '../resources/webflow.ogv';

const position = {
  x: 500,
  y: -30,
  scale: 0.8,
  hiddenLabels: true,
};

const map = <Map />; // <svg ref={this.refSetter} width={400} height={400} />
const Slides = [
  (props) => (
    <FullScreen background={'#ffffff'}>
      <Fade duration={2}>
        <div style={{color: '#000', padding: '20% 5%'}}>
          <Title>@iamdustan</Title>
        </div>
        <CssAnimation
          width={props.width}
          height={props.height}
          {...position}>{map}</CssAnimation>
      </Fade>
    </FullScreen>
  ),
  (props) => (
    <FullScreen background={'#ffffff'}>
      <div style={{color: '#000', padding: '20% 5%'}}>
        <Title>@iamdustan</Title>
        <div style={{fontSize: 36, marginTop: '5%'}}>
          <Fade duration={1}>React Hardware</Fade>
          <Fade duration={1} delay={1}>Tiny React Renderer</Fade>
        </div>
      </div>
      <CssAnimation
        width={props.width}
        height={props.height}
        {...position}>{map}</CssAnimation>
    </FullScreen>
  ),
  (props) => [
    <FullScreen background={'#ffffff'}>
      <div style={{color: '#000', padding: '20% 5%'}}>
        <Title>@iamdustan</Title>
        <div style={{fontSize: 36, marginTop: '5%'}}>
          React Hardware<br />
          Tiny React Renderer
        </div>
      </div>
      <CssAnimation
        width={props.width}
        height={props.height}
        {...position}>{map}</CssAnimation>
    </FullScreen>,
    <Fade duration={1}>
      <FullScreen background="#fff" style={{backgroundColor: 'transparent'}}>
        <Centered style={{backgroundColor: 'transparent'}}>
          <video width="100%" preload autoPlay style={{backgroundColor: 'transparent'}}>
            <source src={WebflowOgg} type="video/ogg" />
            <source src={WebflowMov} type="video/quicktime" style={{backgroundColor: 'transparent'}} />
          </video>
        </Centered>
      </FullScreen>
    </Fade>
  ],
];

export default Multislide(Slides);
