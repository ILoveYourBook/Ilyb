import { connect } from 'react-redux';
import Home from './Home';

const mapStateToProps = (state) => {
  const user = state.user;

  return {
    user,
  };
};

export default connect(mapStateToProps)(Home);
