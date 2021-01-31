import { connect } from 'react-redux';
import Profile from './Profile';

const mapStateToProps = (state) => {
  return {
    user: state.user,
    ownedBooks: Object.values(state.ownedBooks),
  };
};

export default connect(mapStateToProps)(Profile);
