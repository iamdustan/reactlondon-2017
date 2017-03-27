import React from 'react';
import styled from 'styled-components';
import {
  Motion,
  StaggeredMotion,
  spring,
} from 'react-motion';
import {
  Centered,
  Fade,
  FullScreen,
  Title,
} from '../components';
import {colors} from '../components/theme';
import Multislide from '../components/multislide';

import CartoonImage from '../resources/cartoon-intro.png';
import AcdliteImage from '../resources/acdlite.png';

const Bubble = styled.div`
  color: #000;
  background: #fff;
  border-radius: 50%;
  display: inline-flex;
  font-size: 36px;
  font-weight: bold;
  ${props => typeof props.scale !== 'undefined' ? `transform: scale(${props.scale});` : ''}
  height: 6em;
  width: 6em;
  align-items: center;
  justify-content: center;
`;

const ArrowContainer = styled.div`
  display: inline-block;
  font-size: 72px;
  padding: 1.5em;
  color: #333;
  ${props => typeof props.scale !== 'undefined' ? `transform: scale(${props.scale});` : ''}
  opacity: 0;
`;

const Arrow = (props) => <ArrowContainer {...props}>←</ArrowContainer>
const BubbleContainer = styled.div`
  position: absolute;
  transform: translateY(-50%);
  top: 50%;
  width: 100%;
  text-align: center;
`;

const textFor = [
  'Priority',
  'Scheduling',
  'Unit of Work',
];

const ImageLabel = styled.div`
  color: #000;
  position: absolute;
  left: 50%;
  bottom: 10%;
  z-index: 1;
  text-align: center;
  transform: translate(-50%, 0);
  background: #fff;
  padding: 1.5em;
`;

const ByLine = styled.div`
  color: #999;
  font-size: 32px;
`;

const ByLink = styled.div`
  color: #999;
  font-size: 32px;
`;

const FullImage = styled.img`
  position: fixed;
  top: -100px;
  left: 0;
  min-width: 100%;
  max-width: 102%;
  min-height: 100%;
  z-index: 0;
`;

const TITLE = 'Fiber Concepts';
const slide = ({color, children}) => () => (
  <FullScreen background={color}>{children}</FullScreen>
);

const steps = [
  // step 1
  slide({
    color: colors.purple,
    children: (
      <Centered>
        <Motion defaultStyle={{opacity: 0}} style={{opacity: spring(1, {stiffness: 5, damping: 5})}}>
          {interpolatingStyle => <Title style={{...interpolatingStyle, fontSize: 126}}>{TITLE}</Title>}
        </Motion>
      </Centered>
    ),
  }),

  // step 2
  slide({
    color: colors.black,
    children: (
      <Motion defaultStyle={{top: 50, fontSize: 126, bubbleScale: 0}} style={{
        top: spring(15, {stiffness: 100, damping: 10}),
        fontSize: spring(72, {stiffness: 100, damping: 10}),
        bubbleScale: spring(1, {stiffness: 100, damping: 10}),
      }}>
        {interpolatingStyle => <div>
          <Centered style={{top: interpolatingStyle.top + '%'}}>
            <Title style={{fontSize: interpolatingStyle.fontSize}}>{TITLE}</Title>
          </Centered>,
          <BubbleContainer>
            <Bubble scale={interpolatingStyle.bubbleScale}>{textFor[0]}</Bubble>
          </BubbleContainer>
        </div>}
      </Motion>
    ),
  }),

  slide({
    color: colors.black,
    children: [
      <Centered style={{top: '15%'}}>
        <Title.Small>{TITLE}</Title.Small>
      </Centered>,
      <StaggeredMotion
        defaultStyles={[{scale: 1}, {scale: 0}]}
        styles={prevInterpolatedStyles => prevInterpolatedStyles.map((_, i) => {
          return i === 0
            ? {scale: spring(1)}
            : {scale: spring(prevInterpolatedStyles[i - 1].scale, {stiffness: 75, damping: 10})}
        })}>
        {interpolatingStyles =>
          <BubbleContainer>
            {interpolatingStyles.map((style, i, all) => [
              (i === 0) ? null : <Arrow key={i + 10} scale={style.scale} />,
              <Bubble key={i} scale={style.scale}>{textFor[i]}</Bubble>,
            ])}
          </BubbleContainer>
        }
      </StaggeredMotion>
    ],
  }),

  slide({
    color: colors.black,
    children: [
      <Centered style={{top: '15%'}}>
        <Title style={{fontSize: 72}}>{TITLE}</Title>
      </Centered>,
      <StaggeredMotion
        defaultStyles={[{scale: 1}, {scale: 1}, {scale: 0}]}
        styles={prevInterpolatedStyles => prevInterpolatedStyles.map((_, i) => {
          return i === 0
            ? {scale: spring(1)}
            : {scale: spring(prevInterpolatedStyles[i - 1].scale, {stiffness: 75, damping: 10})}
        })}>
        {interpolatingStyles =>
          <BubbleContainer>
            {interpolatingStyles.map((style, i, all) => [
              (i === 0) ? null : <Arrow key={i + 10} scale={style.scale} />,
              <Bubble key={i} scale={style.scale}>{textFor[i]}</Bubble>,
            ])}
          </BubbleContainer>
        }
      </StaggeredMotion>
    ],
  }),

  slide({
    color: colors.black,
    children: [
      <Centered style={{top: '15%'}}>
        <Title style={{fontSize: 72}}>{TITLE}</Title>
      </Centered>,
      <StaggeredMotion
        defaultStyles={[{scale: 1}, {scale: 1}, {scale: 1}]}
        styles={prevInterpolatedStyles => prevInterpolatedStyles.map((_, i) => {
          return i === 0
            ? {scale: spring(0)}
            : {scale: spring(prevInterpolatedStyles[i - 1].scale, {stiffness: 75, damping: 10})}
        })}>
        {interpolatingStyles => 
          <BubbleContainer>
            {interpolatingStyles.map((style, i, all) => [
              i === 0 ? null : <Arrow key={i + 10} scale={style.scale} />,
              <Bubble key={i} scale={style.scale}>{textFor[i]}</Bubble>,
            ])}
          </BubbleContainer>
        }
      </StaggeredMotion>,
      <Fade duration={1}>
        <FullScreen background="#fff">
            <FullImage src={CartoonImage} alt="Cartoon intro to Fiber" />
            <ImageLabel>
              <Title style={{fontSize: 72}}>A Cartoon Intro To Fiber</Title>
              <ByLine>by Lin Clark</ByLine>
              <ByLink>youtube.com/watch?v=ZCuYPiUIONs</ByLink>
            </ImageLabel>
        </FullScreen>
      </Fade>
    ],
  }),

  slide({
    color: colors.black,
    children: [
      <FullScreen background="#fff">
        <FullImage src={CartoonImage} alt="Cartoon intro to Fiber" />
        <ImageLabel>
          <Title style={{fontSize: 72}}>A Cartoon Intro To Fiber</Title>
          <ByLine>by Lin Clark</ByLine>
          <ByLink>youtube.com/watch?v=ZCuYPiUIONs</ByLink>
        </ImageLabel>
      </FullScreen>,
      <Fade duration={1}>
        <FullScreen background="#fff">
          <FullImage src={AcdliteImage} alt="What’s Next For React" style={{top: 0}}/>
          <ImageLabel>
            <Title style={{fontSize: 72}}>What’s Next For React</Title>
            <ByLine>by Andrew Clark</ByLine>
            <ByLink>youtube.com/watch?v=aV1271hd9ew</ByLink>
          </ImageLabel>
        </FullScreen>
      </Fade>
    ],
  }),
];

export default Multislide(steps);

