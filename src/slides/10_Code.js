import React from 'react';
/* eslint-disable */
import code from 'raw-loader!./react-hardware.js.txt';
/* eslint-enable */
import { FullScreen } from '../components';
import CodeSlide from '../components/CodeSlide';

const src = atob(code
  .replace('module.exports = "', '')
  .replace(/"$/, '')
  .slice(23));

class Slide extends React.Component {
  refSetter = node => {
    this.node = node;
  };

  onStep = dir => {
    if (this.node) {
      const result = this.node.onStep(dir);
      console.log('onStep(%s)', dir, result);
      return result;
    }
  }

  render() {
    return (
      <FullScreen background="#000">
        <CodeSlide
          ref={this.refSetter}
          lang="javascript"
          code={src}
          ranges={[
            { loc: [10, 14] },
            { loc: [15, 25] },
            { loc: [27, 28] },

            // new fiber features
            { loc: [29, 41] },

            // prepare / reset
            { loc: [44, 47] },

            // host context
            { loc: [50, 61] },
            { loc: [61, 64] },

            // create instances
            { loc: [67, 79] },
            { loc: [67, 89] },

            // finalize initial children
            { loc: [91, 99] },

            // append initial child
            { loc: [100, 106] },

            // linked list operations
            { loc: [107, 131] },

            // text updates
            { loc: [134, 139] },

            // commit mount
            { loc: [142, 148] },

            // commit update
            { loc: [149, 160] },

            // prepare update
            { loc: [161, 172] },


            // devtools integration
            { loc: [176, 187] },

            // renderer
            { loc: [189, 196] },
            { loc: [196, 210] },
            { loc: [213, 214] },
          ]}
        />
      </FullScreen>
    );
  }
};

export default Slide;

