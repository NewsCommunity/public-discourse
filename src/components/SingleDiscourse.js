import React, { Component } from "react";
import ChatBucket from "./ChatBox/ChatBucket";
import { thunkGetSingleDiscourse } from "../state/discourse/actions";
import { connect } from "react-redux";
import Loading from "./Loading";
import Parser from "html-react-parser";
import { actionSetUser } from "../state/user/reducer";
class SingleDiscourse extends Component {
  constructor(props) {
    super(props);
    this.articleContainer = React.createRef();
    this.state = {
      isMobile: window.innerWidth < 480
    };
  }

  componentDidMount = async () => {
    await this.props.getSingleDiscourse(this.props.match.params.docId);
    window.addEventListener("resize", this.handleWindowResize);
  };

  componentDidUpdate = () => {
    window.scrollTo(0, 0);
  };

  handleWindowResize = () => {
    this.setState({ isMobile: window.innerWidth < 480 });
  };

  render() {
    const { discourse, match } = this.props;
    const discourseId = match.params.docId;

    if (discourse.article) {
      const { html, title } = discourse.article;
      const { isMobile } = this.state

      return (
        <div>
          <div className="discourse-container">
            <div className="single-room">
              <div className="iframe-container" ref={this.articleContainer}>
                {isMobile ? (
                  <h6>{Parser(title)}</h6>
                ) : (
                  <h2>{Parser(title)}</h2>
                )}
                {Parser(html)}
              </div>
              <ChatBucket discourseId={discourseId} />
            </div>
          </div>
        </div>
      );
    } else {
      return <Loading />;
    }
  }
}

// CONTAINER===============================

function mapState(state) {
  return {
    discourse: state.discourseReducer.discourse
  };
}

function mapDispatch(dispatch) {
  return {
    getSingleDiscourse: (discourseId) => {
      dispatch(thunkGetSingleDiscourse(discourseId));
    },
    logInUser: (user, bool) => {
      dispatch(actionSetUser(user, bool));
    }
  };
}

export default (SingleDiscourse = connect(
  mapState,
  mapDispatch
)(SingleDiscourse));
