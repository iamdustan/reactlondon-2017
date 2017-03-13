/* @flow */

import React from 'react';
import {
  angle
} from './tools/maths';

export default class Timeline extends React.Component {
  static defaultProps = {
    width: 600,
    height: 600,
  };

  /*
  setup = () => {
    const framerate = (this.canvas || this.props.canvas).FRAME || 16.66666;
  };
  */

  draw = (frame) => {
    const canvas = this.canvas || this.props.canvas;
    if (!canvas) {
      return;
    }

    const ctx : CanvasRenderingContext2D = canvas.getContext('2d');

    ctx.lineWidth = 0;
    ctx.strokeStyle = '#ffffff';
    ctx.shadowBlur = 3;
    ctx.shadowColor = '#ffffff';

    ctx.beginPath();
    ctx.arc(75, 75, 50, 0, Math.PI * 2, true); // Outer circle 
    ctx.stroke();

    ctx.textAlign = 'center';
    ctx.fillText('Reconciler', 75, 75);

    /*
    if (line.label) {
      const totalFramesForWaypoint = Math.ceil(line.duration / this.props.FRAME) * 2;
      if (frame > startFrame + totalFramesForWaypoint) {
        ctx.save();
        ctx.shadowBlur = 1;
        ctx.shadowColor = '#000000';
        ctx.font = 'bold 18px verdana, sans-serif';
        ctx.fillStyle = line.fill || '#fff';
        ctx.translate(waypoint[i - 1][0], waypoint[i - 1][1]);
        ctx.rotate(angle(line.start, line.end));
        ctx.translate(0, -4);
        const tm = ctx.measureText(line.label);
        ctx.fillText(line.label, -tm.width, 0);
        ctx.restore();
      }
    }
    */
  }

  render () {
    return null;
  }
}

