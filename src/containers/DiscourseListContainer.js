import { connect } from "react-redux";
import DiscourseList from "../components/DiscourseList";
import { thunkGetDiscourseList } from "../state/discourse/actions";

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

const DiscourseListContainer = connect(
  mapState,
  mapDispatch
)(DiscourseList);

export default DiscourseListContainer
