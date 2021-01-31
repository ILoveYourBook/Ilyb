import { connect } from 'react-redux';
import Matches from './Matches';

const mapStateToProps = (state) => {
  const user = state.user;

  return {
    user,
  };
};

export default connect(mapStateToProps)(Matches);
