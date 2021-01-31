import { fireEvent, render } from '@testing-library/react-native';
import faker from 'faker';
import React from 'react';
import DetailedInfo from '../../src/components/DetailedInfo';

describe('DetailedInfo component', () => {
  const defaultProps = {
    book: aBook(),
    onPressImage: () => {},
  };

  it('should show a layout with an image, a title, an author and a opinion', () => {
    const { getByText, getByTestId } = render(
      <DetailedInfo {...defaultProps} />,
    );

    getByTestId('book-image');
    getByText(defaultProps.book.title);
    getByText(defaultProps.book.author);
    getByText('Opinion');
    getByText(defaultProps.book.opinion);
  });

  it('executes the onPressImage callback when the book image is pressed', () => {
    const props = {
      onPressImage: jest.fn(),
    };

    const { getByTestId } = render(<DetailedInfo {...defaultProps} />);

    const bookImage = getByTestId('book-image');
    fireEvent.press(bookImage);

    expect(props.onPressImage).toHaveBeenCalled();
  });
});

function aBook() {
  return {
    title: faker.name.title(),
    author: faker.name.findName(),
    image: faker.image.imageUrl(),
    userId: faker.random.uuid(),
    opinion: faker.lorem.paragraph(),
    distance: faker.random.number(),
  };
}
