import React from 'react';
import ReactDOM from 'react-dom';
import Slides from './App';
import Map from './Map';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import './index.css';

const Nav = ({children}) => <div>{children}</div>
const Container = ({children}) => children;
const AppContainer = () => (
  <Router>
    <Container>
      <Nav>
        <Link to="/">Slides</Link>
        <Link to="/map">Map</Link>
      </Nav>

      <Route exact path="/" component={Slides}/>
      <Route path="/map" component={Map}/>
    </Container>
  </Router>
);

const render = Comp => ReactDOM.render(<Comp />, document.getElementById('root'));
render(AppContainer);

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default;
    render(NextApp);
  });
}
