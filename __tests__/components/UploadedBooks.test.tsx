import { fireEvent, render } from '@testing-library/react-native';
import faker from 'faker';
import React from 'react';
import BooksList from '../../src/components/BooksList';

describe('UploadedBooks component', () => {
  const defaultProps = {
    selectedUser: aUser(),
    isLoggedUser: true,
    onDelete: () => {},
    onPressBook: () => {},
  };
  it('should show a layout with an user first name and a list of books', () => {
    const { getByText } = render(<BooksList {...defaultProps} />);

    const firstName = defaultProps.selectedUser.fullName.split(' ')[0];

    getByText(firstName);
  });

  it('executes the Delete callback when the user press on delete a book', () => {
    const props = {
      ...defaultProps,
      onDelete: jest.fn(),
    };

    const { getByTestId } = render(<BooksList {...props} />);

    const deleteButton = getByTestId('delete-button-0');
    fireEvent.press(deleteButton);

    expect(props.onDelete(0)).toHaveBeenCalledWith(0);
  });

  it('executes the DetailedInfo callback when the user press on a book', () => {
    const props = {
      ...defaultProps,
      onPressBook: jest.fn(),
    };

    const { getByTestId } = render(<BooksList {...props} />);

    const book = getByTestId('book-0');
    fireEvent.press(book);

    expect(props.onPressBook(0)).toHaveBeenCalledWith(0);
  });
});

function aUser() {
  return {
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
  };
}
