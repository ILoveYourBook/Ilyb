import { fireEvent, render } from '@testing-library/react-native';
import faker from 'faker';
import React from 'react';
import NavigationTabs from '../../src/components/NavigationTabs';

describe('NavigationTabs component', () => {
  const defaultProps = {
    user: aUser(),
    onProfile: () => {},
    onHome: () => {},
    onMatches: () => {},
  };

  it('should show a bar with three buttons', () => {
    const { getByText } = render(<NavigationTabs {...defaultProps} />);

    getByText('Profile');
    getByText('Home');
    getByText('Matches');
  });

  it('executes the OnProfile callback when the user press on profile tab', () => {
    const props = {
      ...defaultProps,
      onProfile: jest.fn(),
    };

    const { getByText } = render(<NavigationTabs {...props} />);

    const profileTab = getByText('Profile');
    fireEvent.press(profileTab);

    expect(props.onProfile()).toHaveBeenCalled();
  });

  it('executes the OnHome callback when the user press on home tab', () => {
    const props = {
      ...defaultProps,
      onHome: jest.fn(),
    };

    const { getByText } = render(<NavigationTabs {...props} />);

    const homeTab = getByText('Home');
    fireEvent.press(homeTab);

    expect(props.onHome()).toHaveBeenCalled();
  });

  it('executes the OnMatches callback when the user press on matches tab', () => {
    const props = {
      ...defaultProps,
      onMatches: jest.fn(),
    };

    const { getByText } = render(<NavigationTabs {...props} />);

    const matchesTab = getByText('Matches');
    fireEvent.press(matchesTab);

    expect(props.onMatches()).toHaveBeenCalled();
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
