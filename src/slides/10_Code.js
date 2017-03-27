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
      return this.node.onStep(dir);
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
            { loc: [61, 66] },

            // create instances
            { loc: [69, 81] },
            { loc: [75, 91] },

            // finalize initial children
            { loc: [93, 101] },

            // append initial child
            { loc: [102, 108] },

            // linked list operations
            { loc: [109, 123] },
            { loc: [124, 133] },

            // text updates
            { loc: [136, 145] },

            // commit mount
            { loc: [148, 154] },

            // commit update
            { loc: [155, 166] },

            // prepare update
            { loc: [167, 184] },


            // devtools integration
            { loc: [188, 199] },

            // renderer
            { loc: [201, 208] },
            { loc: [208, 225] },
            { loc: [228, 229] },
          ]}
        />
      </FullScreen>
    );
  }
};

export default Slide;

