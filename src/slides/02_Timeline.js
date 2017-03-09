
import React, { Component } from 'react';
import {
  officialTimeline,
  communityTimeline,
} from '../data';

import Canvas from '../canvas/canvas';
import Starfield from '../canvas/starfield';
import Timeline from '../canvas/timeline';

const INITIAL_FRAME_COUNT = 100;
const ARM = 400;
const calcPercentage = (target, lhs, rhs) => Math.abs(1 - ((target - rhs) * 100) / (lhs - rhs) / 100);
const leftBound = new Date('Jan 1, 2013');
const rightBound = new Date();

const toLine = (w, h, entry) => {
  const leftPercentage = calcPercentage(new Date(entry.date), leftBound, rightBound); const x = Math.round(w * leftPercentage);
  const y = Math.round(h * 0.8);
  return {
    percentage: leftPercentage,
    start: [x - ARM / 2, y],
    end: [x, y - ARM],
    // 10 frames
    duration: 10 * Canvas.FRAME,
    delay: Math.round(INITIAL_FRAME_COUNT * 2 * leftPercentage * Canvas.FRAME),
    label: entry.pkg
  };
};

export default class TimelineSlide extends Component {
  componentWillMount() {
    const {height, width} = this.props;
    const mapLine = t => toLine(width, height, t);
    const toCommunity = t => ({
      ...t,
      delay: Math.round(
        (INITIAL_FRAME_COUNT * 3 * Canvas.FRAME) +
        (INITIAL_FRAME_COUNT * Canvas.FRAME * t.percentage)
      ),
      fill: 'yellow',
    });

    this.lines = [
      { start: [0, height * 0.8],
        end: [width, height * 0.8],
        duration: INITIAL_FRAME_COUNT * Canvas.FRAME,
        delay: 0
      },
      ...officialTimeline.map(mapLine),
      ...communityTimeline.map(mapLine).map(toCommunity)
    ];
  }

  render() {
    const {width, height} = this.props;
    return (
      <Canvas width={width} height={height}>
        {/*
        <Starfield
          FRAME={Canvas.FRAME}
          width={this.w}
          height={this.h}
        />
        */}
        <Timeline
          FRAME={Canvas.FRAME}
          width={width}
          height={height}
          lines={this.lines}
        />
      </Canvas>
    );
  }
}
