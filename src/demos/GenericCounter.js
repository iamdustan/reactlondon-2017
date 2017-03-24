
export default `import {Component} from 'react';

type State = {| count : number |};
type Handlers = {| increment : (event: any) => void |};
type Props = {|
  initialValue ?: number,
  render : (handlers : H, state : S) => React.Element<*>
|};

export class Counter extends Component {
  props : Props;
  state : State = {count: this.props.initialValue || 0}; 

  increment = (event) => {
    if (event && typeof event.preventDefault === 'function') {
      event.preventDefault();
    }
    this.setState(state => ({count: state.count + 1}));
  };

  render() {
    return this.props.render(
      {onClick: this.increment},
      this.state
    );
  }
}`

