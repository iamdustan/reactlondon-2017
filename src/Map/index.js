/* @flow */

import React from 'react';
import {
  Motion,
  spring,
} from 'react-motion';

import {
  FullScreen,
} from '../components';
import Map from './map.svg';

const springConfig = null; /*{
  stiffness: 5,
  damping: 5,
};
*/

export default class extends React.Component {
  state = {step: 0};
  steps = [
    {width: 2000, height: 2000, x: 250, y: 350},
    {width: 2000, height: 2000, x: 400, y: 350},
  ];

  onStep = dir => {
    console.log('Map.onStep(%s)', dir);
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

  render () {
    if (this.state.step === 0) {
      return (
        <FullScreen background={'#ffffff'}>
          <Map {...this.steps[this.state.step]} />
        </FullScreen>
      );
    }

    const prev = this.steps[this.state.step - 1]
    const step = this.steps[this.state.step];

    return (
      <FullScreen background={'#ffffff'}>
        <Motion
          defaultStyle={prev}
          style={{
            x: spring(step.x, springConfig),
            y: spring(step.y, springConfig),
            width: step.width,
            height: step.height,
          }}
        >
          {value => <Map {...value} />}
        </Motion>
      </FullScreen>
    );
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

