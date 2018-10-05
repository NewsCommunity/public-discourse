import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import { Provider } from 'react-redux'
import { store } from './state/store'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'


import Eth from 'ethjs';



ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
    document.getElementById('root')
)
registerServiceWorker()

window.addEventListener('load', async () => {
  if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
		// We are in the browser and metamask is running.
    let eth = new Eth(window.web3.currentProvider);
    console.log("THE ETH IS:", eth);
    const accounts = await eth.accounts();
    console.log("The accounts:", accounts)

	} else {
		// We are on the server *OR* the user is not running metamask
		//In this case we aren't connecting to a remote, we need metamask. So this is disconnected and user is warned.
		// const provider = new Web3.providers.HttpProvider('http://loalhost:7545');
		// web3 = new Eth(provider);

		let eth = undefined;
	}

});
