import { Book } from './Book';

export type User = {
  id: string;
  email: string;
  fullName: string;
  avatarUrl: string;
  likedBooks: Array<Book>;
  matchedProfiles: Array<User>;
};
