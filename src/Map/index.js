/* @flow */
/* eslint-disable */

import React from 'react';
import {
  Motion,
  spring,
} from 'react-motion';

import {
  Fade,
  FullScreen,
} from '../components';
import Map from './map.svg';

const springConfig = {
  stiffness: 5,
  damping: 5,
};

type Step = {|
  x: number,
  y: number,
  scale: number,
  height: number,
  width: number,
|};


const positionCenterItem = (props) => {
  const scale = props.width > props.height
    ? props.width / NATURAL_WIDTH
    : props.height / NATURAL_HEIGHT;

  const transform = props.width > props.height
      ? ('0, ' + (props.height - NATURAL_HEIGHT * scale) / 2 + 'px')
      : ((props.width - NATURAL_WIDTH * scale) / 2 + 'px, 0');

  return 'translate(' + transform + ') scale(' + scale + ')';
};
export const CssAnimation = (props : Step & {children: any}) => (
  <div
    className={props.hiddenLabels ? 'hidden-labels' : ''}
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    }}
    >
    <div style={{
      transition: 'transform 1s',
      transform: `translate(${props.x}px, ${props.y}px) scale(${props.scale})`,
      transformOrigin: '0 0 0',
    }}>
      <div style={{
        transform: positionCenterItem(props),
        transformOrigin: '0 0 0',
      }}>{props.children}</div>
    </div>
  </div>
);

const Position = (props : Step & {children: any}) => (
  <div
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    }}>
      <div style={{
        transform: `translate(${props.x}px, ${props.y}px) scale(${props.scale})`,
        transformOrigin: '0 0 0',
      }}>
      {props.children}
    </div>
  </div>
);

let cachedMap;
const NATURAL_WIDTH = 400;
const NATURAL_HEIGHT = 400;
export default class extends React.Component {
  state = {step: 0};
  steps : Array<Step> = [
    {x: 500, y: -30, scale: 0.8, hiddenLabels: true},
    {x: 500, y: -30, scale: 0.8, hiddenLabels: true},
    // {x: 300, y: -30, scale: 0.8},
    // {x: 300, y: -30, scale: 0.8},

    // Mount DOM
    // {x: -1300, y: -1760, scale: 4},
    // {x: -1300, y: -1760, scale: 4},
    {x: -1700, y: -2760, scale: 4},

    // iOS Fortress
    // {x: -550, y: -680, scale: 4},
    {x: -850, y: -1080, scale: 4},

    // Android Forest
    // {x: -3100, y: -1700, scale: 4},
    {x: -4700, y: -2560, scale: 4},

    // UWP
    // {x: -2300, y: -1250, scale: 3.5},
    {x: -3800, y: -2000, scale: 3.5},

    // Titaniumland
    // {x: -3000, y: -150, scale: 3.5},
    {x: -4500, y: -320, scale: 3.5},

    // Blessed Plains
    // {x: -1400, y: -700, scale: 3},
    {x: -3000, y: -1300, scale: 4},

    // Isle of Firmatas
    // {x: -300, y: -1400, scale: 2.5},
    {x: -500, y: -2200, scale: 2.5},

    {x: 500, y: -30, scale: 0.8},
  ];

  onStep = dir => {
    if (dir === 'RIGHT') {
      const diff = +1;
      if (this.state.step + diff < this.steps.length) {
        this.setState({step: this.state.step + diff})
        return true;
      }
    } else if (dir === 'LEFT') {
      const diff = -1;
      if (this.state.step + diff > -1) {
        this.setState({step: this.state.step + diff})
        return true;
      }
    }
    return false;
  };

  /*
  refSetter = node => this.node = node;
  componentDidMount() {
    if (!cachedMap) {
      makeMap(this.node, defaultParams);
      cachedMap = this.node;
    }
  }

  componentDidUpdate() {
    this.node.appendChild(cachedMap);
  }
  */

  render () {
    const map = <Map />; // <svg ref={this.refSetter} width={400} height={400} />
    if (this.state.step === 0) {
      return (
        <FullScreen background={'#ffffff'}>
          <Fade duration={2}>
            <CssAnimation
              width={this.props.width}
              height={this.props.height}
              {...this.steps[this.state.step]}>{map}</CssAnimation>
          </Fade>
        </FullScreen>
      );
    }

    const prev = this.steps[this.state.step - 1]
    const step = this.steps[this.state.step];

    return (
      <FullScreen background={'#ffffff'}>
        <CssAnimation 
          width={this.props.width}
          height={this.props.height}
          {...step}>{map}</CssAnimation>
      </FullScreen>
    );
    /*
    return (
      <FullScreen background={'#ffffff'}>
        <Motion
          defaultStyle={prev}
          style={{
            x: spring(step.x, springConfig),
            y: spring(step.y, springConfig),
            scale: spring(step.scale, springConfig),
            width: step.width,
            height: step.height,
          }}
        >
          {value => <Position {...value}>{map}</Position>}
        </Motion>
      </FullScreen>
    );
    */
  }
}

/*
import {
  doMap as makeMap,
  defaultParams
} from './terrain';

export default class extends React.Component {
  refSetter = node => this.node = node;
  componentDidMount() {
    makeMap(this.node, defaultParams);
  }

  render() {
    return <FullScreen background="#e0e0e0">
      <svg
        ref={this.refSetter}
        width={800}
        height={800}
        viewBox="-500 -500 1000 1000"
      />
    </FullScreen>
  }
}
*/

