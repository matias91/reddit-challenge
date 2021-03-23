import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';

import store from '../../../redux';
import PostDetail from './PostDetail';

const postFactory = ({
  author = 'Matias',
  title = 'some title',
  thumbnail = 'http://thumbnail-placeholder.svg'
}) => ({
  author,
  title,
  thumbnail
});

describe('Post Detail', () => {
  it('should render post details properly', () => {
    const { getByAltText, getByText } = render(
      <Provider store={store}>
        <PostDetail post={postFactory({})} />
      </Provider>
    );

    expect(getByText(/some title/i)).toBeInTheDocument();
    expect(getByText(/Matias/i)).toBeInTheDocument();
    expect(getByAltText(/some title/i));
  });
});
