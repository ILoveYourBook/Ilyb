import { render } from '@testing-library/react-native';
import faker from 'faker';
import React from 'react';
import Profile from '../../src/components/Profile';

describe('Profile component', () => {
  const defaultProps = {
    user: aUser(),
  };
  it('should show a layout with an image, a name, an email and three buttons', () => {
    const { getByText } = render(<Profile {...defaultProps} />);

    getByText(defaultProps.user.fullName);
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
