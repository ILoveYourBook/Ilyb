import firestore from '@react-native-firebase/firestore';
import { User } from '../models/User';

export const fetchMatchedUsers = async (user: User) => {
  try {
    const matches = await firestore()
      .collection('users')
      .where('id', 'in', user.matchedProfileIds)
      .get();
    const matchesArray = matches.docs.map(
      (document) => document.data() as User,
    );
    return matchesArray;
  } catch (error) {
    throw error;
  }
};
