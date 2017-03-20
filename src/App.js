/* @flow */

import React, { Component } from 'react';
import slides from './slides';

import Webflow from './resources/webflow.svg';

const Branded = () => (
  <div style={Branded.style}>
    <Webflow height={36}/>
  </div>
);
Branded.style = {color: '#fff', position: 'fixed', top: '1.5em', right: '1.5em', opacity: 0.4, zIndex: 100};

const LEFT = 37;
const PAGEUP = 33;

const RIGHT = 39;
const PAGEDOWN = 34;
// const UP = 38;
// const DOWN = 40;
const WIDTH_OFFSET = 0; // 15;

class App extends Component {
  state = {
    ready: false,
    slide: -1,
    width: -1,
    height: -1,
  };

  setDims = () => {
    // 15 for scrollbar width
    const width = document.documentElement.clientWidth - WIDTH_OFFSET; // || window.innerWidth || 0;
    const height = document.documentElement.clientHeight - WIDTH_OFFSET; // || window.innerHeight || 0;
    this.setState({ready: true, width, height});
  };

  componentDidMount() {
    // just giving the JS engine some time to flush
    setTimeout(() => {
      var slide = 0;
      if (location.hash) {
        slide = parseInt(location.hash.replace('#', ''), 10);
      }
      this.setState({slide});
      this.setDims();
    }, 1000);
    window.addEventListener('resize', this.setDims)
    window.addEventListener('hashchange', this.setFromHash);
    document.addEventListener('keyup', this.handleKeyPress, false);
  }

  componentWillUnmount() {
    document.removeEventListener('keyup', this.handleKeyPress);
  }

  setFromHash = (event) => {
    const slide = parseInt(location.hash.replace('#', ''), 10);
    this.setState({slide});
  };

  handleKeyPress = (event) => {
    switch (event.which) {
      case PAGEUP:
      case LEFT:
        if (this.slide && this.slide.onStep && this.slide.onStep('LEFT')) return;
        if (this.state.slide < 1) return;
        location.hash = this.state.slide - 1;
        return;
        // return this.setState({slide: this.state.slide - 1});
      case PAGEDOWN:
      case RIGHT:
        if (this.slide && this.slide.onStep && this.slide.onStep('RIGHT')) return;
        if (this.state.slide >= slides.length - 1) return;
        location.hash = this.state.slide + 1;
        return;
        // return this.setState({slide: this.state.slide + 1});
      default:
        // do nothing, eslint
    }
  };

  render() {
    if (this.state.ready === false) {
      return <Branded />;
    }

    const Slide = slides[this.state.slide];

    return [
      <Branded />,
      <Slide
        ref={slide => this.slide = slide}
        width={this.state.width}
        height={this.state.height}
      />
    ];
  }
}

export default App;
