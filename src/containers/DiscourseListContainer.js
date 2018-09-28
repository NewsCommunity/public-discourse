import { connect } from 'react-redux';
import DiscourseList from '../components/DiscourseList';

function mapState(state) {
	return {
		discourseList: state.discourseReducer.discourseList
	};
}

function mapDispatch(dispatch) {
	return {
		getDiscourses: 
	};
}

export default connect(mapState, mapDispatch)(DiscourseList); 