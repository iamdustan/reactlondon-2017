/* @flow */
import React from 'react';

const randomInRange = (min, max) => (Math.random() * (max - min)) + min;

const getParticles = (count, width, height, fieldOfVision, ctx) =>
  Array.apply(0, Array(count)).map(() => ({
    x: randomInRange(-(width / 2), (width / 2)),
    y: randomInRange(-(height / 2), (height / 2)),
    z: randomInRange(-fieldOfVision, fieldOfVision),
    vx: 4 * Math.random() - 2,
    vy: 4 * Math.random() - 2,
    vz: -Math.random(),
    update(frame) {
      // TODO: make this frame aware
      this.x += this.vx;
      this.y += this.vy;
      this.z += this.vz;

      if (this.x < 0 || this.x > width) {
        this.vx = -this.vx;
      }

      if (this.y < 0 || this.y > height) {
        this.vy = -this.vy;
      }

      if (this.z < -fieldOfVision || this.z > fieldOfVision) {
        // this.vz = -this.vz;
        this.z = fieldOfVision;
      }
    },
    draw() {
      const radius = fieldOfVision / (this.z + fieldOfVision);
      const x = (this.x * radius);
      const y = (this.y * radius);

      ctx.fillStyle = 'rgba(255,255,255,0.3)';
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2, true);
      ctx.fill();
    },
  }));

export default class Starfield extends React.Component {
  canvas: HTMLCanvasElement;
  static defaultProps = {
    width: 600,
    height: 600,
    amount: 1000,
    fieldOfVision: 250,
  };

  draw = (frame) => {
    const canvas = this.canvas || this.props.canvas;

    if (!canvas) {
      return;
    }

    const {
      width,
      height,
      amount,
      fieldOfVision,
    } = this.props;


    const ctx = canvas.getContext('2d');
    if (!this.particles) {
      this.particles = getParticles(amount, width, height, fieldOfVision, ctx);
    }

    ctx.translate((width/2), (height/2));

    const particles = this.particles;

    for (let i = 0; i < particles.length; i++) {
      const particle = particles[i];
      particle.update(frame);
      particle.draw();
    }

    // draw particles
    ctx.restore();
  }

  componentWillUnmount() {
    this.canvas = null;
    this.raf = null;
    this.particles = null;
  }

  refSetter = node => {
    this.canvas = node;
    // TODO: if this is standalone need to track frames
    // and call `this.draw(frame);
    // this.draw();
  };

  render () {
    const {width, height, ...ignore} = this.props; // eslint-disable-line
    if (this.props.canvas) return null;
    return null;

    /*
    return <canvas
      ref={this.refSetter}
      width={width}
      height={height}
    />
    */
  }
}
