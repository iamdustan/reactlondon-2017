/* @fow */

import React from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-okaidia.css';

const defaultStyle = {
  padding: '5% 15%',
  fontSize: 18,
  overflowY: 'auto',
  height: '90%',
  boxSizing: 'border-box',
};

class Code extends React.Component {
  shouldComponentUpdate(nextProps, nextContext) {
    return nextProps !== this.props;
  }

  render() {
    const {
      src,
      language,
      style,
    } = this.props;

    const html = Prism.highlight(
      src,
      Prism.languages[language || 'javascript']
    );

    const appliedStyles = style ? Object.assign({}, defaultStyle, style) : defaultStyle;

    return (
      <pre style={appliedStyles}>
        <code className="language-js" dangerouslySetInnerHTML={{__html: html}} />
      </pre>
    );
  }
}

export default Code;

