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
  Fade,
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
  ${props => props.hidden ? `visibility: hidden;` : ''}
  height: 6em;
  width: 6em;
`;

const ArrowContainer = styled.div`
  display: inline-block;
  font-size: 72px;
  padding: 1.5em;
  color: #333;
  ${props => props.scale ? `transform: scale(${props.scale});` : ''}
  ${props => props.hidden ? 'visibility: hidden;' : ''}
`;

const BubbleContainer = styled.div`
  position: absolute;
  transform: translateY(-50%);
  top: 50%;
  width: 100%;
  text-align: center;
`;

const Code = styled.pre`
  color: #000;
  font-size: 36px;
  text-align: left;
  position: absolute;
  top: -15%;
  left: 15%;
  right: 15%;
`;

const Arrow = (props) => <ArrowContainer {...props}>←</ArrowContainer>

const textFor = [
  'Renderer',
  'Reconciler',
  'HostConfig',
];

const TITLE = 'Renderer Concepts';

const from = ({left, top, scale, fontSize, opacity}) => ({
  top: top || 50,
  left,
  fontSize: fontSize || 36,
  bubbleScale: scale || 1,
  opacity: typeof opacity === 'number' ? opacity : 1
});

const to = ({left, top, scale, fontSize, opacity}) => ({
  top: spring(top || 15, {stiffness: 100, damping: 10}),
  left: spring(left, {stiffness: 100, damping: 10}),
  fontSize: spring(fontSize || 72, {stiffness: 100, damping: 10}),
  bubbleScale: spring(scale || 15, {stiffness: 100, damping: 10}),
  opacity: typeof opacity === 'number' ? spring(opacity, {stiffness: 100, damping: 10}) : 1,
});

const Base = () => [
  <Centered style={Base.topStyle}>
    <Title style={Base.titleStyle}>{TITLE}</Title>
  </Centered>,
  <BubbleContainer>
    <Bubble scale={1}>{textFor[0]}</Bubble>
    <Arrow scale={1} />
    <Bubble scale={1}>{textFor[1]}</Bubble>
    <Arrow scale={1} />
    <Bubble scale={1}>{textFor[2]}</Bubble>
  </BubbleContainer>,
];
Base.topStyle = {top: '15%'};
Base.titleStyle = {fontSize: 72};

const steps = [
  // step 1
  () => (
    <FullScreen background={colors.purple}>
      <Centered>
        <Motion defaultStyle={{opacity: 0}} style={{opacity: spring(1, {stiffness: 5, damping: 5})}}>
          {interpolatingStyle => <Title style={{...interpolatingStyle, fontSize: 126}}>{TITLE}</Title>}
        </Motion>
      </Centered>
    </FullScreen>
  ),

  // step 2
  () => (
    <Motion defaultStyle={{top: 50, fontSize: 126, bubbleScale: 0}} style={{
      top: spring(15, {stiffness: 100, damping: 10}),
      fontSize: spring(72, {stiffness: 100, damping: 10}),
      bubbleScale: spring(1, {stiffness: 100, damping: 10}),
    }}>
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

  () => [
    <Centered style={Base.topStyle}>
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
        <div style={{position: 'absolute', transform: 'translateY(-50%)', top: '50%', width: '100%', textAlign: 'center'}}>
          {interpolatingStyles.map((style, i, all) => [
            (i === 0) ? null : <Arrow key={i + 10} scale={style.scale} />,
            <Bubble key={i} scale={style.scale}>{textFor[i]}</Bubble>,
          ])}
        </div>
      }
    </StaggeredMotion>
  ],

  () => [
    <Centered style={Base.topStyle}>
      <Title style={Base.titleStyle}>{TITLE}</Title>
    </Centered>,
    <StaggeredMotion
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

  // Renderer
  () => [
    <Base />,

    <Motion
      defaultStyle={from({left: -35, top: 52, scale: 1, fontSize: 36})}
      style={to({left: 0, scale: 15, fontSize: 126})}
    >
      {interpolatingStyle => <div>
        <Centered style={{
          top: interpolatingStyle.top + '%',
          left: interpolatingStyle.left + '%',
          zIndex: 1
        }}>
          <Title style={{fontSize: interpolatingStyle.fontSize, color: '#000'}}>{textFor[0]}</Title>
        </Centered>
        <Centered>
          <Bubble scale={interpolatingStyle.bubbleScale} />
          <Arrow scale={1} hidden />
          <Bubble scale={1} hidden />
          <Arrow scale={1} hidden />
          <Bubble scale={1} hidden />
          <Fade>
            <Code>{`{
  render(element, container, callback)
  unmountComponentAtNode(element, container)
}`}</Code>
          </Fade>
        </Centered>
      </div>}
    </Motion>
  ],

  () => [
    <Base />,

    <Motion
      defaultStyle={from({left: 0, top: 15, scale: 15, fontSize: 126, opacity: 1})}
      style={to({left: -35, top: 52, scale: 1, fontSize: 36, opacity: 0})}
    >
      {interpolatingStyle => <div style={{opacity: interpolatingStyle.opacity}}>
        <Centered style={{
          top: interpolatingStyle.top + '%',
          left: interpolatingStyle.left + '%',
          zIndex: 1
        }}>
          <Title style={{fontSize: interpolatingStyle.fontSize, color: '#000'}}>{textFor[0]}</Title>
        </Centered>
        <Centered>
          <Bubble scale={interpolatingStyle.bubbleScale} />
          <Arrow scale={1} hidden />
          <Bubble scale={1} hidden />
          <Arrow scale={1} hidden />
          <Bubble scale={1} hidden />
        </Centered>
      </div>}
    </Motion>
  ],

  // Reconciler
  () => [
    <Base />,

    <Motion
      defaultStyle={from({left: 0, top: 52, scale: 1, fontSize: 36})}
      style={to({left: 0, scale: 15, fontSize: 126})}
    >
      {interpolatingStyle => <div>
        <Centered style={{
          top: interpolatingStyle.top + '%',
          left: interpolatingStyle.left + '%',
          zIndex: 1
        }}>
          <Title style={{fontSize: interpolatingStyle.fontSize, color: '#000'}}>{textFor[1]}</Title>
        </Centered>
        <Centered>
          <Bubble scale={1} hidden />
          <Arrow scale={1} hidden />
          <Bubble scale={interpolatingStyle.bubbleScale} />
          <Arrow scale={1} hidden />
          <Bubble scale={1} hidden />
          <Fade>
            <Code>{`type Reconciler<C, I, TI> = {
  createContainer(containerInfo : C) : OpaqueRoot,
  updateContainer(
    element : ReactNodeList,
    container : OpaqueRoot,
    parentComponent : ?ReactComponent<any, any, any>
  ) : void,
  performWithPriority(priorityLevel : PriorityLevel, fn : Function) : void,
  batchedUpdates<A>(fn : () => A) : A,
  unbatchedUpdates<A>(fn : () => A) : A,
  syncUpdates<A>(fn : () => A) : A,
  deferredUpdates<A>(fn : () => A) : A,
}`}</Code>
          </Fade>
        </Centered>
      </div>}
    </Motion>
  ],

  () => [
    <Base />,

    <Motion
      defaultStyle={from({left: 0, top: 15, scale: 15, fontSize: 126, opacity: 1})}
      style={to({left: 0, top: 52, scale: 1, fontSize: 36, opacity: 0})}
    >
      {interpolatingStyle => <div style={{opacity: interpolatingStyle.opacity}}>
        <Centered style={{
          top: interpolatingStyle.top + '%',
          left: interpolatingStyle.left + '%',
          zIndex: 1
        }}>
          <Title style={{fontSize: interpolatingStyle.fontSize, color: '#000'}}>{textFor[1]}</Title>
        </Centered>
        <Centered>
          <Bubble scale={1} hidden />
          <Arrow scale={1} hidden />
          <Bubble scale={interpolatingStyle.bubbleScale} />
          <Arrow scale={1} hidden />
          <Bubble scale={1} hidden />
        </Centered>
      </div>}
    </Motion>
  ],

  // HostConfig
  () => [
    <Base />,

    <Motion
      defaultStyle={from({left: 35, top: 52, scale: 1, fontSize: 36})}
      style={to({left: 0, scale: 15, fontSize: 126})}
    >
      {interpolatingStyle => <div>
        <Centered style={{
          top: interpolatingStyle.top + '%',
          left: interpolatingStyle.left + '%',
          zIndex: 1
        }}>
          <Title style={{fontSize: interpolatingStyle.fontSize, color: '#000'}}>{textFor[2]}</Title>
        </Centered>
        <Centered>
          <Bubble scale={1} hidden />
          <Arrow scale={1} hidden />
          <Bubble scale={1} hidden />
          <Arrow scale={1} hidden />
          <Bubble scale={interpolatingStyle.bubbleScale} />
          <Fade>
            <Code>{`type HostConfig<T, P, I, TI, PI, C, CX, PL> = {
  getRootHostContext(rootContainerInstance : C) : CX,
  getChildHostContext(parentHostContext : CX, type : T) : CX,
  getPublicInstance(instance : I | TI) : PI,

  createInstance(
    type : T,
    props : P,
    rootContainerInstance : C,
    hostContext : CX,
    internalInstanceHandle : OpaqueHandle
  ) : I,
  appendInitialChild(parentInstance : I, child : I | TI) : void,
  finalizeInitialChildren(
    parentInstance : I,
    type : T,
    props : P,
    rootContainerInstance : C
  ) : boolean,

  prepareUpdate(
    instance : I,
    type : T,
    oldProps : P,
    newProps : P,
    rootContainerInstance : C,
    hostContext : CX
  ) : null | PL,
  commitUpdate(
    instance : I,
    updatePayload : PL,
    type : T,
    oldProps : P,
    newProps : P,
    internalInstanceHandle : OpaqueHandle
  ) : void,
  commitMount(
    instance : I,
    type : T,
    newProps : P,
    internalInstanceHandle : OpaqueHandle
  ) : void,

  shouldSetTextContent(props : P) : boolean,
  resetTextContent(instance : I) : void,
  shouldDeprioritizeSubtree(type : T, props : P) : boolean,

  createTextInstance(
    text : string,
    rootContainerInstance : C,
    hostContext : CX,
    internalInstanceHandle : OpaqueHandle
  ) : TI,
  commitTextUpdate(textInstance : TI, oldText : string, newText : string) : void,

  appendChild(parentInstance : I | C, child : I | TI) : void,
  insertBefore(parentInstance : I | C, child : I | TI, beforeChild : I | TI) : void,
  removeChild(parentInstance : I | C, child : I | TI) : void,

  scheduleAnimationCallback(callback : () => void) : number | void,
  scheduleDeferredCallback(callback : (deadline : Deadline) => void) : number | void,

  prepareForCommit() : void,
  resetAfterCommit() : void,

  useSyncScheduling ?: boolean,
}`}</Code>
          </Fade>
        </Centered>
      </div>}
    </Motion>
  ],

  () => [
    <Base />,

    <Motion
      defaultStyle={from({left: 0, top: 15, scale: 15, fontSize: 126, opacity: 1})}
      style={to({left: 35, top: 52, scale: 1, fontSize: 36, opacity: 0})}
    >
      {interpolatingStyle => <div style={{opacity: interpolatingStyle.opacity}}>
        <Centered style={{
          top: interpolatingStyle.top + '%',
          left: interpolatingStyle.left + '%',
          zIndex: 1
        }}>
          <Title style={{fontSize: interpolatingStyle.fontSize, color: '#000'}}>{textFor[2]}</Title>
        </Centered>
        <Centered>
          <Bubble scale={1} hidden />
          <Arrow scale={1} hidden />
          <Bubble scale={1} hidden />
          <Arrow scale={1} hidden />
          <Bubble scale={interpolatingStyle.bubbleScale} />
        </Centered>
      </div>}
    </Motion>
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

