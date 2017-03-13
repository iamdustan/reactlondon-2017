/* @flow */
import React from 'react';
import Controls from './tools/controls';

export default class Canvas extends React.Component {
  // static FRAME = 16.6666;
  static FRAME = 33.33333;

  elements = {};
  refSetter = node => {
    if (this.canvas !== node) {
      this.canvas = node;
      this.forceUpdate(() => {
        for (const ref in this.elements) {
          if (typeof this.elements[ref].setup === 'function') {
            this.elements[ref].setup();
          }
        }
        this.raf = requestAnimationFrame(this.draw);
      });
    }
  };

  componentWillUnmount() {
    cancelAnimationFrame(this.raf);
  }

  draw = (timestamp) => {
    if (process.env.NODE_ENV !== 'production') {
      if (typeof timestamp === 'undefined') {
        console.warn('WARNING! Canvas.draw() called without a proper timestamp');
        return;
      }
    }

    if (!this.startStamp) {
      this.startStamp = timestamp;
    }

    this.frame = Math.floor((timestamp - this.startStamp) / Canvas.FRAME);
    this.drawFrame(this.frame);
    this.raf = requestAnimationFrame(this.draw);
  };

  drawFrame = frame => {
    const ctx = this.canvas.getContext('2d');
    // maybe this should be in each section idk
    ctx.clearRect(0, 0, this.props.width, this.props.height);
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, this.props.width, this.props.height);
    for (const ref in this.elements) {
      if (typeof this.elements[ref].draw === 'function') {
        ctx.save();
        this.elements[ref].draw(frame);
        ctx.restore();
      }
    }

    if (typeof this.props.onFrame === 'function') {
      this.props.onFrame(frame, this.raf ? 'PLAYING' : 'PAUSED');
    }
  };

  onStop = (event) => {
    cancelAnimationFrame(this.raf);
    this.stopTime = performance.now();
    this.raf = null;
  };

  onPlay = () => {
    console.log('onPlay');
    // how to recalc startStamp?
    if (!this.raf) {
      this.startStamp = performance.now() - this.frame * Canvas.FRAME;
      this.raf = requestAnimationFrame(this.draw);
    }
  };

  onRestart = () => {
    console.log('onRestart');
    cancelAnimationFrame(this.raf);
    this.startStamp = performance.now();
    this.raf = requestAnimationFrame(this.draw);
  };

  onNext = () => {
    console.log('onNext');
    this.frame++;
    this.drawFrame(this.frame);
  };

  onPrev = () => {
    console.log('onPrev');
    this.frame--;
    this.drawFrame(this.frame);
  };

  onJump = (frame: number) => {
    console.log('onJump');
    this.onStop();
    this.frame = frame;
    this.drawFrame(this.frame);
  };

  render () {
    const {width, height, ...ignore} = this.props; // eslint-disable-line
    const children = this.canvas
      ? React.Children.map(
          this.props.children,
          (child, index) => React.cloneElement(child, {
            ref: (element) => this.elements[index] = element,
            canvas: this.canvas,
            width,
            height,
          })
        )
      : null;

    return <div>
      <canvas
        ref={this.refSetter}
        width={width}
        height={height}
      >{children}</canvas>
      <Controls
        onRestart={this.onRestart}
        onStop={this.onStop}
        onPlay={this.onPlay}
        onPrev={this.onPrev}
        onNext={this.onNext}
        onJump={this.onJump}
      />
    </div>
  }
}

