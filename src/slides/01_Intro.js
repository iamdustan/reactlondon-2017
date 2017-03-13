/* @flow */

import React from 'react';
import {
  Motion,
  spring,
} from 'react-motion';

import ReactLogo from '../logo.svg';
import Pete from '../resources/pete.jpg';
import {
  BlendedImage,
  Centered,
  FullScreen,
  Title,
  Fade,
  Blink,
} from '../components';
import {colors} from '../components/theme';
import Multislide from '../components/multislide';

const s = {
  display: 'inline-block',
  verticalAlign: 'middle',
};

const ReactImage = (props) => (
  <div style={{...s, opacity: props.value}}>
    <img height={props.value * 150} src={ReactLogo} alt="React" />
  </div>
);

const Steps = [
  // 1
  ({onRest}) => (
    <FullScreen background={colors.black}>
      <Motion defaultStyle={{opacity: 0}} style={{opacity: spring(1, {stiffness: 5, damping: 5})}} onRest={onRest}>
        {interpolatingStyle =>
          <FullScreen style={interpolatingStyle} background={colors.purple}>
            <Centered>
              <Title style={interpolatingStyle}>2013</Title>
            </Centered>
          </FullScreen>
        }
      </Motion>
    </FullScreen>
  ),

  // 2
  ({onRest}) => (
    <Centered>
      <Motion defaultStyle={{value: 0}} style={{value: spring(1, {stiffness: 40, damping: 5})}} onRest={onRest}>
        {interpolatingStyle => <ReactImage value={interpolatingStyle.value} />}
      </Motion>
      <Title style={s}>2013</Title>
    </Centered>
  ),

  // 3
  ({onRest}) => [
    <Centered style={{zIndex: 1}}>
      <ReactImage value={1} />
      <Title style={s}>2013</Title>
    </Centered>,
    <Motion defaultStyle={{opacity: 0}} style={{opacity: spring(1, {stiffness: 5, damping: 5})}} onRest={onRest}>
      {interpolatingStyle => <BlendedImage style={interpolatingStyle} backgroundColor="purple" backgroundSize="75%" src={Pete} />}
    </Motion>,
  ],

  // 4
  ({onRest}) => [
    <Centered style={{zIndex: 1}}>
      <ReactImage value={1} />
      <Title style={s}>2013</Title>
    </Centered>,
    <BlendedImage backgroundColor="purple" backgroundSize="75%" src={Pete} />,
    <Fade style={{zIndex: 3, position: 'relative'}} duration={2}>
      <FullScreen background="black">
        <Title.Centered>HTML is <br />only the <br />beginning<Blink>.</Blink></Title.Centered>
      </FullScreen>
    </Fade>
  ],
];

export default Multislide(Steps);

/*
export default class IntroSlide extends React.Component {
  state = {step: 0}
  steps = 4;
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
    const Step = Steps[this.state.step];

    return <FullScreen background="#6b0e6b">
      <Step onRest={this.next} />
    </FullScreen>;
  }
}
*/

            /*
    <StaggeredMotion
      defaultStyles={[{opacity: 0}, {opacity: 0, scale: 0}]}
      styles={prevInterpolatedStyles => prevInterpolatedStyles.map((_, i) => {
        return i === 0
          ? {opacity: spring(1, {stiffness: 5, damping: 5})}
          : {
              opacity: spring(prevInterpolatedStyles[i - 1].opacity, {stiffness: 5, damping: 5}),
              scale: spring(prevInterpolatedStyles[i - 1].opacity, {stiffness: 5, damping: 5})
            }
      })}>
      {interpolatingStyles =>
        <Centered>
          {interpolatingStyles.map((style, i) => {
            if (i === 0) return <Title key={i} style={{
              display: 'inline-block',
              verticalAlign: 'middle',
              opacity: style.opacity,
            }}>2013</Title>;
            if (i === 1) return <div key={i} style={{
              display: 'inline-block',
              verticalAlign: 'middle',
              opacity: style.opacity,
            }}><img height={style.scale * 150} src={ReactLogo} /></div>
          }).reverse()}
        </Centered>}
    </StaggeredMotion>

  /*
  <FullScreen>
    <Fade delay={7}><BlendedImage backgroundColor="purple" backgroundSize="50%" src={Pete} /></Fade>
    <Fade>
      <Title>
        <Bounce
          <Fade delay={5} duration={2} style={{display: 'inline-block', verticalAlign: 'middle'}}><img width={212} src={ReactLogo} /></Fade>
        </Bounce>
        2013
      </Title>
    </Fade>
    <Fade delay={15} duration={2}>
      <FullScreen background="black">
        <Title>HTML is <br />only the <br />beginning.</Title>
      </FullScreen>
    </Fade>
  </FullScreen>
  */

