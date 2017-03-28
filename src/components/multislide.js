/* @flow */
import React from 'react';
import {FullScreen} from './';

export default (steps, background) => {
  return class Multislide extends React.Component {
    state = {step: 0}
    onStep = dir => {
      if (dir === 'RIGHT') {
        const diff = +1;
        if (this.state.step + diff < steps.length) {
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

    next = () => {
      this.setState({step: Math.min(this.state.step + 1, steps.length - 1)});
    }

    render() {
      const Step = steps[this.state.step];

      return <FullScreen background={background || "#6b0e6b"}>
        <Step onRest={this.next} {...this.props} />
      </FullScreen>;
    }
  }
};

