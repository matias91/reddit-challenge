import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';

import store from '../../../redux';
import Post from './Post';

const postFactory = ({
  author = 'Matias',
  num_comments = '3000',
  title = 'some title',
  created = 123456789,
  thumbnail = 'http://some-awesome-image-here.svg',
}) => ({
  author,
  num_comments,
  title,
  created,
  thumbnail,
});

describe('Post', () => {
  it('should render post properly', () => {
    const { getByText } = render(
      <Provider store={store}>
        <Post post={postFactory({})} />
      </Provider>
    );

    expect(getByText(/some title/i)).toBeInTheDocument();
    expect(getByText(/Matias/i)).toBeInTheDocument();
    expect(getByText(/3000/i)).toBeInTheDocument();
    expect(getByText(/47 years ago/i)).toBeInTheDocument();
  });
});
