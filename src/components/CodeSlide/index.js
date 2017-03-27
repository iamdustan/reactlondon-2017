import React from 'react';
import CodeSlideImpl from './CodeSlide';

export default class CodeSlide extends React.Component {
  step = 0;

  onStep = dir => {
    const steps = this.props.ranges.length;

    if (dir === 'RIGHT') {
      const diff = +1;
      if (this.step + diff < steps) {
        this.step = this.step + diff;
        this.node.goTo(this.step);
        return true;
      }
    } else if (dir === 'LEFT') {
      const diff = -1;
      if (this.step + diff > -1) {
        this.step = this.step + diff;
        this.node.goTo(this.step);
        return true;
      }
    }
    return false;
  };

  refSetter = node => {
    this.node = node;
  };

  render() {
    return <CodeSlideImpl ref={this.refSetter} {...this.props} />;
  }
}

