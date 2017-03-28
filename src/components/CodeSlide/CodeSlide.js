/* @flow */

import React, { PropTypes } from 'react';

// const CodeSlideTitle = require('./CodeSlideTitle');
// const CodeSlideNote = require('./CodeSlideNote');
// const CodeSlideImage = require('./CodeSlideImage');

import clamp from 'lodash.clamp';
import padStart from 'lodash.padstart';
import getHighlightedCodeLines from './getHighlightedCodeLines';
import calculateScrollCenter from './calculateScrollCenter';
import scrollToElement from './scrollToElement';
import getComputedCodeStyle from './getComputedCodeStyle';

function startOrEnd(index, loc) {
  if (index === loc[0]) {
    return 'start';
  } else if (index === loc[1]) {
    return 'end';
  } else {
    return null;
  }
}

function calculateOpacity(index, loc) {
  return (loc[0] <= index && loc[1] > index) ? 1 : 0.2;
}

function getLineNumber(index) {
  return '<span class="token comment line-no">' + padStart(index + 1, 3) + '.</span> ';
}

const computedCodeStyle = getComputedCodeStyle();
const defaultBgColor = computedCodeStyle.backgroundColor || "#122b45";
const defaultColor = computedCodeStyle.color || "white";

const style = {
  position: 'relative',
  textAlign: 'left',
  overflow: 'hidden',
  color: defaultColor,
  height: '646px',
  margin: 0,
  padding: '40% 0',
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-word'
};

const defaultStyle = {
  padding: '5% 10%',
  fontSize: 32,
  lineHeight: 1.5,
  overflowY: 'auto',
  height: '90%',
  boxSizing: 'border-box',
};

class CodeSlide extends React.Component {
  static propTypes = {
    lang: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired,
    ranges: PropTypes.arrayOf(PropTypes.shape({
      loc: PropTypes.arrayOf(PropTypes.number).isRequired,
      title: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
      note: PropTypes.oneOfType([PropTypes.element, PropTypes.string])
    }))
  };

  state = {
    active: this.getStorageItem() || 0
  };

  componentDidMount() {
    document.addEventListener('keydown', this.onKeyDown);
    window.addEventListener('storage', this.onStorage);
    window.addEventListener('resize', this.onResize);
    this.scrollActiveIntoView(true);

    requestAnimationFrame(() => {
      this.scrollActiveIntoView(true);
    });
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyDown);
    window.removeEventListener('storage', this.onStorage);
    window.removeEventListener('resize', this.onResize);
  }

  componentWillEnter(cb) {
    // this.refs.slide.componentWillEnter(cb)
  }

  componentWillAppear(cb) {
    // this.refs.slide.componentWillAppear(cb)
  }

  componentWillLeave(cb) {
    // this.refs.slide.componentWillLeave(cb)
  }

  getStorageId() {
    return 'code-slide:' + this.props.slideIndex;
  }

  getStorageItem() {
    return +localStorage.getItem(this.getStorageId());
  }

  setStorageItem(value) {
    return localStorage.setItem(this.getStorageId(), '' + value);
  }

  isSlideActive() {
    return true;
    /*
    const slide = this.context.store.getState().route.slide;
    return this.props.slideIndex === parseInt(slide, 10);
    */
  }

  goTo(active, skipLocalStorage) {
    this.setState({ active }, this.scrollActiveIntoView);

    if (!skipLocalStorage) {
      this.setStorageItem(active);
    }
  }

  scrollActiveIntoView = (skipAnimation) => {
    const {container, start, end} = this.refs;
    const scrollTo = calculateScrollCenter(start, end, container);
    scrollToElement(container, 0, scrollTo, {
      duration: skipAnimation ? 1 : 1000
    });
  };

  onResize = () => {
    this.scrollActiveIntoView(true);
  };

  onKeyDown = e => {
    if (!this.isSlideActive()) {
      return;
    }

    let prev = this.state.active;
    let active = null;

    if (e.which === 38) {
      active = prev - 1;
    } else if (e.which === 40) {
      active = prev + 1;
    }

    if (active !== null) {
      e.preventDefault();
      active = clamp(active, 0, this.props.ranges.length - 1);
      this.goTo(active);
    }
  };

  onStorage = e => {
    if (e.key === this.getStorageId()) {
      this.goTo(+e.newValue, true);
    }
  };

  render() {
    const {code, lang, ranges, color, bgColor, notes, ...rest} = this.props;
    const {active} = this.state;

    const range = ranges[active] || {};
    const loc = range.loc || [];
    const slideBg = bgColor || defaultBgColor;
    console.log(ranges);

    style.color = color || style.color;

    const lines = getHighlightedCodeLines(code, lang).map((line, index) => {
      return <div
        key={index}
        ref={startOrEnd(index, loc)}
        dangerouslySetInnerHTML={{ __html: getLineNumber(index) + line }}
        style={{ opacity: calculateOpacity(index, loc) }}/>;
    });

    return (
      // <Slide ref='slide' bgColor={slideBg} margin={1} {...rest}>
        <pre ref="container" style={{...style, ...defaultStyle}}>
          <code>{lines}</code>
        </pre>
      // </Slide>
    );
  }
}

module.exports = CodeSlide;
