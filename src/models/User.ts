export type User = {
  id: string;
  email: string;
  fullName: string;
  avatarUrl: string;
  likedProfileIds: Array<string>;
  matchedProfileIds: Array<string>;
};
