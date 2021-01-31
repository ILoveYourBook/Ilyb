import firestore from '@react-native-firebase/firestore';
import { Book } from '../models/Book';

export const fetchBooksForUser = async (userId: string) => {
  try {
    const books = await firestore()
      .collection('books')
      .where('userId', '==', userId)
      .get();
    const booksArray = books.docs.map((document) => document.data() as Book);
    return booksArray;
  } catch (error) {
    console.log(error);
  }
};
