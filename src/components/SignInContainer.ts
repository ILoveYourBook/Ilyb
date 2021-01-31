import { connect } from 'react-redux';
import { loadOwnedBooksAction } from '../actions/LoadOwnedBooksAction';
import { loadUserAction } from '../actions/LoadUserAction';
import { Book } from '../models/Book';
import { User } from '../models/User';
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
