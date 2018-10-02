<<<<<<< HEAD
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
=======
import { connect } from 'react-redux'
import DiscourseList from '../components/DiscourseList'
import { thunkGetDiscourseList } from '../state/discourse/actions'

function mapState (state) {
  return {
    discourseList: state.discourseReducer.discourseList
  }
}

function mapDispatch (dispatch) {
  return {
    getDiscourseList: () => {
      dispatch(thunkGetDiscourseList())
    }
  }
}

const DiscourseListContainer = connect(mapState, mapDispatch)(DiscourseList)
>>>>>>> 729b8d1742a375601acf9c83c77d8addff2e0028

export default DiscourseListContainer
