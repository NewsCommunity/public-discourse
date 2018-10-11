import { connect } from "react-redux";
import { thunkGetDiscourseList } from "../state/discourse/actions";
import React, { Component } from "react";
import DiscourseCard from "./DiscourseCard";
import Loading from "./Loading";

class DiscourseList extends Component {
  componentDidMount = async () => {
    await this.props.getDiscourseList();
  };

  render() {
    const { discourseList } = this.props;
    let styles = {
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    };
    return (
      <div className="discourse-list" style={styles}>
        {discourseList.map((elem) => {
          if (elem.article) {
            return (
              <DiscourseCard
                discourseId={elem.docId}
                discourseTitle={elem.article.title}
                discourseDescription={elem.article.content}
                discourseImg={elem.article.urlToImage}
                discoursePublishedAt={elem.article.publishedAt}
                key={elem.docId}
              />
            );
          } else {
            return (
              <div>
                <Loading />
              </div>
            );
          }
        })}
      </div>
    );
  }
}

//CONTAINER====================================================================
function mapState(state) {
  return {
    discourseList: state.discourseReducer.discourseList
  };
}
function mapDispatch(dispatch) {
  return {
    getDiscourseList: () => {
      dispatch(thunkGetDiscourseList());
    }
  };
}

export default (DiscourseList = connect(
  mapState,
  mapDispatch
)(DiscourseList));
