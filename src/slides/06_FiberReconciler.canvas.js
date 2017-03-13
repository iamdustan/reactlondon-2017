import React from 'react';

import Canvas from '../canvas/canvas';
import FiberConcepts from '../canvas/fiber-concepts';

export default class FiberReconcilerSlide extends React.Component {
  render() {
    const {width, height} = this.props;

    return (
      <Canvas width={width} height={height}>
        <FiberConcepts
          FRAME={Canvas.FRAME}
          width={this.w}
          height={this.h}
        />
      </Canvas>
    );
  }
}

