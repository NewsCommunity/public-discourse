<<<<<<< HEAD
import React, { Component } from "react";
import fire from "./fire";
import ChatBucket from "./containers/ChatBucket";
import SingleRoom from "./components/SingleRoom";
import { Router, withRouter, Route, Switch } from "react-router-dom";
=======
import React, { Component } from 'react'
import fire from './fire'
import ChatBucket from './containers/ChatBucket'
import SingleRoom from './components/SingleRoom'
import { Router, withRouter, Route, Switch } from 'react-router-dom'
>>>>>>> 729b8d1742a375601acf9c83c77d8addff2e0028
import DiscourseListContainer from './containers/DiscourseListContainer'
class App extends Component {
  render () {
    return (
<<<<<<< HEAD
        <Switch>
          {/* Routes placed here are available to all visitors */}
          <Route path="/discourselist/" component={DiscourseListContainer} />
          <Route path="/discussion/" component={SingleRoom} />
          <Route path="/" component={ChatBucket} />
        </Switch>
    );
=======
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path='/discourselist/' component={DiscourseListContainer} />
        <Route path='/discussion/' component={SingleRoom} />
        <Route path='/' component={ChatBucket} />
      </Switch>
    )
>>>>>>> 729b8d1742a375601acf9c83c77d8addff2e0028
  }
}

export default App
