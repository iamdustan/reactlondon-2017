import React from 'react';
import {
  Title,
  Fade,
  FullScreen
} from '../components';
import {
  colors,
} from '../components/theme';

export default () => (
  <FullScreen background={"black"}>
    <Fade>
      <FullScreen background={colors.purple}>
        <Title.Centered>Learn Once<br />Write Anywhere</Title.Centered>
      </FullScreen>
    </Fade>
  </FullScreen>
);

