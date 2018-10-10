import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Eth from 'ethjs';
import firebase from 'firebase';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { store } from './state/store';
import { actionSetUser } from './state/user/reducer';

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
  const user = await firebase.auth().currentUser;
  console.log("My top level user is: ", user);
  if (user) {
    store.dispatch(actionSetUser(user, true));
  }
});
