import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';

import store from '../../../redux';
import PostsList from './PostsList';

describe('Posts List', () => {
  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should render the markup properly', () => {
    const { getByText } = render(
      <Provider store={store}>
        <PostsList />
      </Provider>
    );

    expect(getByText(/Reddit Posts/i)).toBeInTheDocument();
    expect(getByText(/Dismiss All/i)).toBeInTheDocument();
  });

  it('should display loading indicator', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <PostsList />
      </Provider>
    );

    expect(getByTestId('loader')).toBeInTheDocument();
  });
});
