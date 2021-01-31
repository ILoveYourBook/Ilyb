import { connect } from 'react-redux';
import { loadOwnedBooksAction } from '../redux/actions/LoadOwnedBooksAction';
import { loadUserAction } from '../redux/actions/LoadUserAction';
import { Book } from '../types/Book';
import { User } from '../types/User';
import SignIn from './SignIn';

const mapStateToProps = (state) => {
  const user = state.user;

  return {
    user,
  };
};

const mapDispatchToProps = (dispatch) => ({
  loadUser: (user: User) => dispatch(loadUserAction(user)),
  loadOwnedBooks: (books: Array<Book>) => dispatch(loadOwnedBooksAction(books)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
