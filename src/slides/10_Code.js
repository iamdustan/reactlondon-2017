import React from 'react';
/* eslint-disable */
import code from 'raw-loader!./react-hardware.js.txt';
/* eslint-enable */
import { FullScreen } from '../components';
import Code from '../components/code';

const src = atob(code
  .replace('module.exports = "', '')
  .replace(/"$/, '')
  .slice(23));

const CodeSlide = () => (
  <FullScreen background="#000">
    <Code src={src} />
  </FullScreen>
);

export default CodeSlide;

