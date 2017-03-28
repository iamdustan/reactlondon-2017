/* @flow */
/* eslint-disable */

import React from 'react';
import {
  Fade,
  FullScreen,
  Title,
} from '../components';
import Map from '../Map/map.svg';
import { CssAnimation } from '../Map';

const position = {
  x: 500,
  y: -30,
  scale: 0.8,
  hiddenLabels: true,
};

export default class extends React.Component {
  render () {
    const map = <Map />; // <svg ref={this.refSetter} width={400} height={400} />
    return (
      <FullScreen background={'#ffffff'}>
        <Fade duration={2}>
          <div style={{color: '#000', padding: '10% 5%'}}>
            <Title>Thank You<br />React.London</Title>
            <div style={{fontSize: 36, marginTop: '5%'}}>
              <div>@iamdustan / @webflowapp</div>
              <div>github.com/iamdustan/reactlondon-2017</div>
              <div>github.com/iamdustan/react-hardware</div>
            </div>
          </div>
          <CssAnimation
            width={this.props.width}
            height={this.props.height}
            {...position}>{map}</CssAnimation>
        </Fade>
      </FullScreen>
    );
  }
}
