import React, { Component } from "react";
import fire from "./fire";
import ChatBucket from "./containers/ChatBucket";
import SingleRoom from "./components/SingleRoom";
import { Router, withRouter, Route, Switch } from "react-router-dom";

class App extends Component {
  render() {
    return (
        <Switch>
          {/* Routes placed here are available to all visitors */}
          <Route path="/testchat/" component={ChatBucket} />
          <Route path="/testdiscourse/" component={SingleRoom} />
          <Route path="/" component={SingleRoom} />
        </Switch>
    );
  }
}

export default withRouter(App);
