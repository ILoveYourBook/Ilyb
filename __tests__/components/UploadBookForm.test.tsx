import { fireEvent, render } from '@testing-library/react-native';
import faker from 'faker';
import React from 'react';
import UploadBookForm from '../../src/components/UploadBookForm';

describe('UploadBookForm component', () => {
  const defaultProps = {
    user: aUser(),
    onCamera: () => {},
    onUpload: () => {},
  };
  it('should show a layout with an header, a placeholder image, three text areas and two buttons', () => {
    const { getByText, getByTestId } = render(
      <UploadBookForm {...defaultProps} />,
    );

    getByText('Upload your book');
    getByTestId('placeholder-image');
    getByText('Title');
    getByText('Author');
    getByText('Opinion');
    getByText('Submit');
  });

  it('executes the OnCamera callback when the user press on camera button', () => {
    const props = {
      ...defaultProps,
      onCamera: jest.fn(),
    };

    const { getByTestId } = render(<UploadBookForm {...props} />);

    const cameraButton = getByTestId('camera-button');
    fireEvent.press(cameraButton);

    expect(props.onCamera()).toHaveBeenCalled();
  });

  it('executes the OnSubmit callback when the user press on submit button', () => {
    const props = {
      ...defaultProps,
      onSubmit: jest.fn(),
    };

    const { getByTestId } = render(<UploadBookForm {...props} />);

    const submitButton = getByTestId('submit-button');
    fireEvent.press(submitButton);

    expect(props.onSubmit()).toHaveBeenCalled();
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
