
import React, { Component } from 'react';
import {
  officialTimeline,
  communityTimeline,
} from '../data';

import Canvas from '../canvas/canvas';
import Starfield from '../canvas/starfield';
import Timeline from '../canvas/timeline';

const INITIAL_FRAME_COUNT = 100;
const ARM = 500;
const calcPercentage = (target, lhs, rhs) => Math.abs(1 - ((target - rhs) * 100) / (lhs - rhs) / 100);
const leftBound = new Date('Jan 1, 2013');
const rightBound = new Date();

const toLine = (w, h, entry) => {
  const leftPercentage = calcPercentage(new Date(entry.date), leftBound, rightBound);
  const x = Math.round(w * leftPercentage);
  const y = Math.round(h * 0.8);
  return {
    font: '36px menlo',
    percentage: leftPercentage,
    start: [x, y],
    end: [x - ARM / 4, y - ARM],
    rotate: 'clockwise',
    // 10 frames
    duration: 10 * Canvas.FRAME,
    delay: Math.round(INITIAL_FRAME_COUNT * 2 * leftPercentage * Canvas.FRAME),
    label: entry.pkg
  };
};

const toTick = (w, h, date) => {
  const leftPercentage = calcPercentage(date, leftBound, rightBound);
  const x = Math.round(w * leftPercentage);
  const y = Math.round(h * 0.8);
  return {
    font: '20px menlo',
    percentage: leftPercentage,
    start: [x, y],
    end: [x, y + 80],
    rotate: 'counterclockwise',
    // 5 frames
    duration: 5 * Canvas.FRAME,
    delay: Math.round(INITIAL_FRAME_COUNT * 2 * leftPercentage * Canvas.FRAME),
    label: date.getFullYear(),
  };
};

const dates = [
  new Date('Jan 1, 2013'),
  new Date('Jan 1, 2014'),
  new Date('Jan 1, 2015'),
  new Date('Jan 1, 2016'),
  new Date('Jan 1, 2017'),
];

const extendArm = (point, amount) => [point[0] - amount, point[1] - amount * 4];

export default class TimelineSlide extends Component {
  currentStep = 0;
  steps = [0, 300, 370];

  componentWillMount() {
    const {height, width} = this.props;
    const mapLine = t => toLine(width, height, t);
    const mapTick = t => toTick(width, height, t);
    const toCommunity = t => ({
      ...t,
      end: t.label === 'ReactGibbon' ? extendArm(t.end, 80)
         : t.label === 'ReactWorkerDOM' ? extendArm(t.end, 80)
         : t.label === 'ReactTitanium' ? extendArm(t.end, 80)
         : t.end,
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
      ...dates.map(mapTick),
      ...officialTimeline.map(mapLine),
      ...communityTimeline.map(mapLine).map(toCommunity)
    ];
  }

  componentWillUnmount() {
    this.line = null;
  }

  currentStep = 0;

  onStep = dir => {
    console.log('onStep', dir);
    if (dir === 'RIGHT') {
      const diff = +1;
      if (this.currentStep + diff < this.steps.length) {
        this.currentStep++;
        this.player.onJump(this.steps[this.currentStep] + 2);
        this.player.onPlay();
        return true;
      }
    } else if (dir === 'LEFT') {
      if (this.currentStep === 0) {
        return false;
      }

      this.currentStep = Math.max(0, this.currentStep - 1);
      this.player.onJump(this.steps[this.currentStep] + 2);
      this.player.onPlay();
      return true;
    }
    return false;
  };

  onFrame = (frame, state) => {
    if (state === 'PLAYING') {
      if (
        frame === this.steps[1] ||
        frame === this.steps[2]
      ) {
        requestAnimationFrame(this.player.onStop);
      }
    }
  };

  refSetter = player => {
    this.player = player;
  };

  render() {
    const {width, height} = this.props;

    return (
      <Canvas
        width={width}
        height={height}
        onFrame={this.onFrame}
        ref={this.refSetter}
      >
        <Starfield
          FRAME={Canvas.FRAME}
          particles={300}
          width={this.w}
          height={this.h}
        />
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
