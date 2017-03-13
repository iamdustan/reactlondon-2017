import React from 'react';
import styled from 'styled-components';
import {
  Motion,
  StaggeredMotion,
  spring,
} from 'react-motion';
import {
  Centered,
  FullScreen,
  Title,
} from '../components';
import {colors} from '../components/theme';

const Bubble = styled.div`
  color: #000;
  background: #fff;
  border-radius: 50%;
  display: inline-block;
  line-height: 6;
  font-size: 36px;
  font-weight: bold;
  ${props => props.scale ? `transform: scale(${props.scale});` : ''}
  height: 6em;
  width: 6em;
`;

const ArrowContainer = styled.div`
  display: inline-block;
  font-size: 72px;
  padding: 1.5em;
  color: #333;
  ${props => props.scale ? `transform: scale(${props.scale});` : ''}
`;

const Arrow = (props) => <ArrowContainer {...props}>←</ArrowContainer>

const textFor = [
  'Renderer',
  'Reconciler',
  'HostConfig',
];

const TITLE = 'Fiber Changes Everything';

const steps = [
  // step 1
  ({onRest}) => (
    <FullScreen background={colors.purple}>
      <Centered>
        <Motion defaultStyle={{opacity: 0}} style={{opacity: spring(1, {stiffness: 5, damping: 5})}}>
          {interpolatingStyle => <Title style={{...interpolatingStyle, fontSize: 126}}>{TITLE}</Title>}
        </Motion>
      </Centered>
    </FullScreen>
  ),

  // step 2
  ({onRest}) => (
    <Motion defaultStyle={{top: 50, fontSize: 126, bubbleScale: 0}} style={{
      top: spring(15, {stiffness: 100, damping: 10}),
      fontSize: spring(72, {stiffness: 100, damping: 10}),
      bubbleScale: spring(1, {stiffness: 100, damping: 10}),
    }} onRest={onRest}>
      {interpolatingStyle => <div>
        <Centered style={{top: interpolatingStyle.top + '%'}}>
          <Title style={{fontSize: interpolatingStyle.fontSize}}>{TITLE}</Title>
        </Centered>,
        <div style={{position: 'absolute', transform: 'translateY(-50%)', top: '50%', width: '100%', textAlign: 'center'}}>
          <Bubble scale={interpolatingStyle.bubbleScale}>Renderer</Bubble>
        </div>
      </div>}
    </Motion>
  ),

  ({onRest}) => [
    <Centered style={{top: '15%'}}>
      <Title.Small>{TITLE}</Title.Small>
    </Centered>,
    <StaggeredMotion
      onRest={onRest}
      defaultStyles={[{scale: 1}, {scale: 0}]}
      styles={prevInterpolatedStyles => prevInterpolatedStyles.map((_, i) => {
        return i === 0
          ? {scale: spring(1)}
          : {scale: spring(prevInterpolatedStyles[i - 1].scale, {stiffness: 75, damping: 10})}
      })}>
      {interpolatingStyles =>
        <div style={{position: 'absolute', transform: 'translateY(-50%)', top: '50%', width: '100%', textAlign: 'center'}}>
          {interpolatingStyles.map((style, i, all) => [
            (i === 0) ? null : <Arrow key={i + 10} scale={style.scale} />,
            <Bubble key={i} scale={style.scale}>{textFor[i]}</Bubble>,
          ])}
        </div>
      }
    </StaggeredMotion>
  ],

  ({onRest}) => [
    <Centered style={{top: '15%'}}>
      <Title style={{fontSize: 72}}>{TITLE}</Title>
    </Centered>,
    <StaggeredMotion
      onRest={onRest}
      defaultStyles={[{scale: 1}, {scale: 1}, {scale: 0}]}
      styles={prevInterpolatedStyles => prevInterpolatedStyles.map((_, i) => {
        return i === 0
          ? {scale: spring(1)}
          : {scale: spring(prevInterpolatedStyles[i - 1].scale, {stiffness: 75, damping: 10})}
      })}>
      {interpolatingStyles =>
        <div style={{position: 'absolute', transform: 'translateY(-50%)', top: '50%', width: '100%', textAlign: 'center'}}>
          {interpolatingStyles.map((style, i, all) => [
            (i === 0) ? null : <Arrow key={i + 10} scale={style.scale} />,
            <Bubble key={i} scale={style.scale}>{textFor[i]}</Bubble>,
          ])}
        </div>
      }
    </StaggeredMotion>
  ],
];


export default class FiberReconcilerSlide extends React.Component {
  state = {step: 0}
  steps = steps.length;
  onStep = dir => {
    if (dir === 'RIGHT') {
      const diff = +1;
      if (this.state.step + diff < this.steps) {
        this.setState({step: this.state.step + diff})
        return true;
      }
    } else if (dir === 'LEFT') {
      const diff = -1;
      if (this.state.step + diff > -1) {
        this.setState({step: this.state.step + diff})
        return true;
      }
    }
    return false;
  };

  next = () => {
    this.setState({step: Math.min(this.state.step + 1, this.steps - 1)});
  }

  render() {
    const Slide = steps[this.state.step];
    return <FullScreen background="black">
      <Slide onRest={this.next} />
    </FullScreen>;
  }
}

