import React from 'react';
import Prism from 'prismjs';
/* eslint-disable */
import Code from 'raw-loader!./react-hardware.js.txt';
/* eslint-enable */
import 'prismjs/themes/prism-okaidia.css';
import { FullScreen } from '../components';

const src = atob(Code
  .replace('module.exports = "', '')
  .replace(/"$/, '')
  .slice(23));

const html = Prism.highlight(src, Prism.languages.javascript);
class CodeSlide extends React.Component {
  componentWillMount() {
  }
  render() {
    return <FullScreen background="#000">
      <pre style={{padding: '5% 15%', fontSize: 16, overflowY: 'scroll', height: '90%', boxSizing: 'border-box'}}>
        <code className="language-js" dangerouslySetInnerHTML={{__html: html}} />
      </pre>
    </FullScreen>;
  }
}

export default CodeSlide;

