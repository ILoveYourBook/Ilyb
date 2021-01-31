import { fireEvent, render } from '@testing-library/react-native';
import faker from 'faker';
import React from 'react';
import Profile from '../../src/components/Profile';

describe('Profile component', () => {
  const defaultProps = {
    user: aUser(),
    ownedBooks: [aBook(), aBook()],
  };

  it('should show a layout with an image, a name, an email and three buttons', () => {
    const { getByTestId, getByText } = render(<Profile {...defaultProps} />);

    getByText(defaultProps.user.fullName);
    getByText(defaultProps.user.email);
    getByTestId('user-avatar');
    getByText('Books:');
    getByText('Upload Book');
    getByText('Log Out');
  });

  it('executes the onBooks callback when the user press the Books button', () => {
    const props = {
      ...defaultProps,
      onBooks: jest.fn(),
    };

    const { getByText } = render(<Profile {...props} />);

    const booksButton = getByText('Books:');
    fireEvent.press(booksButton);

    expect(props.onBooks).toHaveBeenCalled();
  });

  it('executes the onUploadBook callback when the user press the Upload Book button', () => {
    const props = {
      ...defaultProps,
      onUploadBook: jest.fn(),
    };

    const { getByText } = render(<Profile {...props} />);

    const booksButton = getByText('Upload book');
    fireEvent.press(booksButton);

    expect(props.onUploadBook).toHaveBeenCalled();
  });

  it('executes the onLogOut callback when the user press the Log Out button', () => {
    const props = {
      ...defaultProps,
      onLogOut: jest.fn(),
    };

    const { getByText } = render(<Profile {...props} />);

    const booksButton = getByText('Log Out');
    fireEvent.press(booksButton);

    expect(props.onLogOut).toHaveBeenCalled();
  });
});

const aUser = () => ({
  id: faker.random.uuid(),
  email: faker.internet.email(),
  fullName: faker.name.findName(),
  avatarUrl: faker.internet.url(),
  likedProfileIds: [faker.random.uuid(), faker.random.uuid()],
  matchedProfileIds: [faker.random.uuid(), faker.random.uuid()],
  lastLocation: {
    latitude: faker.random.number(),
    longitude: faker.random.number(),
  },
});

const aBook = () => ({
  title: faker.random.word(),
  author: faker.name.findName(),
  image: faker.internet.url(),
  userId: faker.random.uuid(),
  opinion: faker.random.words(),
});
