import React, { Component, Fragment } from 'react'
import SingleDiscourse from './components/SingleDiscourse'
import { Router, withRouter, Route, Switch } from 'react-router-dom'
import DiscourseListContainer from './containers/DiscourseListContainer'
import { NavBar } from './components/NavBar'
import Data from './components/data/Data'
import Player from './components/AudioStream/Player'
import { About } from './components/About'
class App extends Component {
  render () {
    return (
      <div className='whole-app'>
        <NavBar />
        <Switch>
          {/* Routes placed here are available to all visitors */}
          <Route path='/about' component={About} />
          <Route path='/audio' component={Player} />
          <Route path='/data' component={Data} />
          <Route path='/discourse/:docId' component={SingleDiscourse} />
          <Route path='/' component={DiscourseListContainer} />
        </Switch>
      </div>
    )
  }
}

export default withRouter(App)
