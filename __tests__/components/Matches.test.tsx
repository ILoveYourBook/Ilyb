import { fireEvent, render } from '@testing-library/react-native';
import faker from 'faker';
import React from 'react';
import Matches from '../../src/components/Matches';

describe('Matches component', () => {
  const defaultProps = {
    user: aUser(),
    onViewBooks: () => {},
  };
  it('should show a layout with a list of users with a view books button each', () => {
    const { getByTestId } = render(<Matches {...defaultProps} />);

    getByTestId('user-0');
    getByTestId('view-books-button-0');
  });

  it('executes the onViewBooks callback when the view books button is pressed', () => {
    const props = {
      ...defaultProps,
      onViewBooks: jest.fn(),
    };

    const { getByTestId } = render(<Matches {...defaultProps} />);

    const viewBooksButton = getByTestId('view-books-button-0');

    fireEvent.press(viewBooksButton);

    expect(props.onViewBooks).toHaveBeenCalled();
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
