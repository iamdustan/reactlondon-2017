/* @flow */ 
import React from 'react';
import styled from 'styled-components'
import {
  debounce
} from '../../utils';
import NextIcon from './icons/next.svg';
import PrevIcon from './icons/prev.svg';
import RestartIcon from './icons/restart.svg';
import PlayIcon from './icons/play.svg';
import StopIcon from './icons/stop.svg';

const styles = {
  container: {
  },
  number: {
    border: 0,
    background: 'transparent',
    borderBottom: '1px solid #000',
    color: '#fff',
    width: '6em',
    textAlign: 'center',
    WebkitAppearance: 'none',
    MozAppearance: 'textfield',
  },
  icon: {height: 24},
  range: {width: 400},
};
const Container = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: #333;
  color: #ccc;
  padding: 0.75em;
`;

const StyledButton = styled.button`
  border-radius: 0;
  border: 0;
  borderBottom: 1px solid #000;
  background: rgba(0, 0, 0, 0.3);
  color: #ccc;
  cursor: pointer;
  display: inline-block;
  padding: 0.666em;

  &:hover {
    background: rgba(0, 0, 0, 0.5);
    color: #fff;
  }
`;
const Button = (props) => (
  <StyledButton style={styles.btn} onClick={props.onClick}>
    <span style={styles.icon} title={props.alt}>
      <props.icon width={styles.icon.height} height={styles.icon.height} />
    </span>
  </StyledButton>
);

const FieldsetWrapper = styled.label`
  display: inline-flex;
  flex-direction: column;
  max-width: 4em;
  padding: 0 0.6666em;
  text-align: center;
  vertical-align: middle;
`;

const LabelText = styled.span`
  font-size: 11px;
`;

const Fieldset = ({label, children}) => (
  <FieldsetWrapper>
    <LabelText>{label}</LabelText>
    {children}
  </FieldsetWrapper>
);

export default class Controls extends React.Component {
  constructor() {
    super();
    this.callOnJump = debounce(this.callOnJumpImpl, 100);
  };

  callOnJumpImpl = (frame) => {
    this.props.onJump(+frame);
  };

  handleJump = (event) => {
    const frame = event.target.value;
    this.callOnJumpImpl(frame);
  };

  render () {
    const {
      frame,
      onRestart,
      onStop,
      onPlay,
      onPrev,
      onNext,
      onJump, // eslint-disable-line
      ...props,
    } = this.props;

    return <Container {...props}>
      <Button onClick={onRestart} alt="Restart" icon={RestartIcon} />
      <Button onClick={onStop} alt="Stop" icon={StopIcon} />
      <Button onClick={onPlay} alt="Play" icon={PlayIcon} />
      <Button onClick={onPrev} alt="Previous" icon={PrevIcon} />
      <Button onClick={onNext} alt="Next" icon={NextIcon} />
      <Fieldset label="Frame">
        <input
          type="number"
          style={styles.number}
          onChange={this.handleJump}
          defaultValue={'0'}
        />
      </Fieldset>
      <input type="range" min={0} max={1000} onChange={this.handleJump} style={styles.range} />
    </Container>;
  }
}

