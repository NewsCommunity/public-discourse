import React, { Component, Fragment } from 'react'
import fire from './fire'
import SingleDiscourse from './components/SingleDiscourse'
import { Router, withRouter, Route, Switch } from 'react-router-dom'
import DiscourseListContainer from './containers/DiscourseListContainer'
import Navbar from './components/layouts/NavBar'
class App extends Component {
  render () {
    return (
      <Fragment>
        <Navbar />
        <Switch>
          {/* Routes placed here are available to all visitors */}
          <Route path='/discourse/:docId' component={SingleDiscourse} />
          <Route path='/' component={DiscourseListContainer} />
        </Switch>
      </Fragment>
    )
  }
}

export default withRouter(App)
