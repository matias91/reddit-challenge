// @Vendors
import { put } from 'redux-saga/effects';

import axios from 'axios';

// @Actions
import RedditActions from '../redux/RedditRedux';

import { API_URL } from '../config/Environment.js';

export function* fetchTop() {
  const url = `${API_URL}/top.json?limit=50`;
  const response = yield axios.get(url);

  if (response.status === 200) {
    yield put(RedditActions.fetchTopSuccess(response.data));
  } else {
    yield put(RedditActions.fetchTopFailure(response));
  }
}
