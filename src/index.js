import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { store } from './state/store';


ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();

window.addEventListener('load', async () => {

});
