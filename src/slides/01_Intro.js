/* @flow */

import React from 'react';
import {
  Motion,
  spring,
} from 'react-motion';

import ReactLogo from '../logo.svg';
import {
  Centered,
  FullScreen,
  Fade,
  // Title,
  // Blink,
} from '../components';
import {colors} from '../components/theme';
import styled from 'styled-components';
import Multislide from '../components/multislide';
import Map from '../Map';

const Image = styled.div`
  display: inline-block;
  float: left;
  vertical-align: middle;
`;

const Text = styled.span`
  color: ${colors.black};
  display: block;
  font-size: 90px;
`;

const Is = styled.span`
  border-bottom: 2px solid ${colors.black};
  font-weight: 100;
  position: relative;
  top: 70px;
  left: -40px;
`;

const Sub = styled.span`
  clear: left;
  display: block;
  position: relative;
  left: 115px;
  top: -30px;
  letter-spacing: 3px;
`;

const Four = styled.span`
  display: block;
  font-size: 260px;
  font-weight: 600;
  width: 300px;
  position: absolute;
  left: 390px;
  top: 0px;
`;

const ReactImage = (props) => (
  <Image style={{opacity: props.value}}>
    <img height={240} src={ReactLogo} alt="React" />
  </Image>
);

const Base = ({number, ...props}) =>
  <Centered {...props}>
    <div style={{textAlign: 'left', width: 560, margin: '0 auto', position: 'relative', left: -40}}>
      <ReactImage />
      <Text><Is>is</Is> <Four>{number || 4}</Four> <Sub>years old</Sub></Text>
    </div>
  </Centered>;

const Steps = [
  // 1
  () => (
    <FullScreen background={colors.white}>
      <Motion defaultStyle={{opacity: 0}} style={{opacity: spring(1, {stiffness: 5, damping: 5})}}>
        {interpolatingStyle => <Base style={interpolatingStyle} />}
      </Motion>
    </FullScreen>
  ),

  // 2
  () => (
    <FullScreen background={colors.white}>
      <Motion defaultStyle={{number: 4}} style={{number: spring(144, {stiffness: 5, damping: 5})}}>
        {interpolatingStyle => <Base number={Math.ceil(interpolatingStyle.number)} />}
      </Motion>
    </FullScreen>
  ),

  /*
  // 4
  () => [
    <Base style={{zIndex: 1}} number={144} />,
    <Fade style={{zIndex: 3, position: 'relative'}} duration={2}>
      <FullScreen background="black">
        <Title.Centered>
          HTML is <br />only the <br />beginning<Blink>.</Blink>
          <div style={{fontSize: 10, opacity: 0.5, marginTop: '3em', fontWeight: 100, letterSpacing: 1}}>
            https://facebook.github.io/react/blog/2013/06/05/why-react.html
          </div>
        </Title.Centered>
      </FullScreen>
    </Fade>
  ],
  */
];

export default Multislide(Steps);

