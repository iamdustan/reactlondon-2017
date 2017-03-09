/* @flow */

import React from 'react';
import {
  angle
} from './tools/maths';
const calcWaypoints = (start, end, steps) => {
  const waypoints = [];
  const dx = (end[0] - start[0]);
  const dy = (end[1] - start[1]);
  // console.log('steps: %s\nstart: %s\nend:   %s\ndiff:  %s', steps, start[0], end[0], dx);
  for (var i = 0; i < steps; i++) {
    // console.log('  i: %s\n  v: %s', i, start[0] + dx * i / steps);
    waypoints.push([
      start[0] + dx * i / steps,
      start[1] + dy * i / steps,
    ]);
  }
  return waypoints;
}

export default class Timeline extends React.Component {
  canvas: HTMLCanvasElement;
  static defaultProps = {
    width: 600,
    height: 600,
    lines: [
      {start: [0, 500], end: [600, 500], duration: 3000, delay: 0},
    ],
  };

  setup = () => {
    const framerate = (this.canvas || this.props.canvas).FRAME || 16.66666;
    this.waypoints = this.props.lines.map(line => calcWaypoints(line.start, line.end, line.duration / framerate));
  };

  draw = (frame) => {
    const canvas = this.canvas || this.props.canvas;
    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext('2d');

    ctx.lineWidth = 0;
    ctx.strokeStyle = '#ffffff';
    ctx.shadowBlur = 3;
    ctx.shadowColor = '#ffffff';

    this.waypoints.forEach((waypoint, index) => {
      const line = this.props.lines[index];
      const startFrame = Math.floor(line.delay / this.props.FRAME);
      if (startFrame > frame) {
        return;
      }
      let i = Math.min(frame - startFrame, waypoint.length - 1);

      if (i < 1) {
        return;
      }

      ctx.beginPath();
      ctx.moveTo(waypoint[i - 1][0], waypoint[i - 1][1]);
      ctx.lineTo(waypoint[0][0], waypoint[0][1]);
      /* Only because we know we have straight lines
      while (i-- > 1) {
        ctx.moveTo(waypoint[i - 1][0], waypoint[i - 1][1]);
        ctx.lineTo(waypoint[i][0], waypoint[i][1]);
      }
      */
      ctx.stroke();
      ctx.fill();

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
      };
    });
  }

  refSetter = node => {
    this.canvas = node;
    this.draw();
  };

  render () {
    const {width, height, ...ignore} = this.props; // eslint-disable-line
    if (this.props.canvas) return null;
    return null;
    /* TODO: Make this run standalone?
    return <canvas
      ref={this.refSetter}
      width={width}
      height={height}
    />
    */
  }
}

