import React, { Component } from "react";
import SingleDiscourse from "./components/SingleDiscourse";
import { withRouter, Route, Switch } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import Data from "./components/Data/Data";
import Player from "./components/AudioStream/Player";
import { About } from "./components/About";
import DiscourseList from "./components/DiscourseList";
import Me from "./components/Me/Me";
import { actionSetUser } from "./state/user/reducer";
import { store } from "./state/store";
import firebase from "firebase";

class App extends Component {
  componentDidMount = async () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        store.dispatch(actionSetUser(user, true));
      } else {
      }
    });
  };
  render() {
    return (
      <div className="whole-app">
        <NavBar />
        <Switch>
          {/* Routes placed here are available to all visitors */}
          <Route path="/me" component={Me} />
          <Route path="/about" component={About} />
          <Route path="/audio" component={Player} />
          <Route path="/data" component={Data} />
          <Route path="/discourse/:docId" component={SingleDiscourse} />
          <Route path="/" component={DiscourseList} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
