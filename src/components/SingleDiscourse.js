import React, { Component } from "react";
import ChatBucket from "../containers/ChatBucket";
import { thunkGetSingleDiscourse } from "../state/discourse/actions";
import { connect } from "react-redux";
import Loading from "./Loading";
import Parser from "html-react-parser";
class SingleDiscourse extends Component {
  constructor(props) {
    super(props);
    this.articleContainer = React.createRef();
  }

  componentDidMount = async () => {
    await this.props.getSingleDiscourse(this.props.match.params.docId);
  };

  componentDidUpdate = () => {
    window.scrollTo(0,0)
  }
  


  render() {
    const { discourse, match } = this.props;
    const discourseId = match.params.docId;

    if (discourse.article) {
      const { html, title } = discourse.article;

      return (
        <div>
          <div className="discourse-container">
            <div className="single-room">
              <div className="iframe-container" ref={this.articleContainer}>
                <h3>{Parser(title)}</h3>
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
    }
  };
}

export default (SingleDiscourse = connect(
  mapState,
  mapDispatch
)(SingleDiscourse));
