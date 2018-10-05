import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import { Provider } from 'react-redux'
import { store } from './state/store'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import {thunkSetEthProdiver} from './state/user/reducer'


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
//thunk here

});
