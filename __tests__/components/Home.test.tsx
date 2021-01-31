import { render } from '@testing-library/react-native';
import faker from 'faker';
import React from 'react';
import Home from '../../src/components/Home';

describe('Home component', () => {
  const defaultProps = {
    user: aUser(),
  };
  it('should show a layout with an book card swiper and two buttons', () => {
    const { getByText, getByTestId } = render(<Home {...defaultProps} />);

    getByText('Dislike');
    getByText('Like');
    getByTestId('swiper-view');
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
