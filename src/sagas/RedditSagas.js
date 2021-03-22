// @Vendors
import { put, select } from 'redux-saga/effects';

import axios from 'axios';

// @Actions
import RedditActions from '../redux/RedditRedux';

import { API_URL } from '../config/Environment.js';

const getCount = (state) => state.reddit.count;

export function* fetchTop({ after, before }) {
  const count = yield select(getCount);
  let url = `${API_URL}/top.json?limit=50&count=${count}`;
  after && (url = `${url}&after=${after}`);
  before && (url = `${url}&before=${before}`);
  const response = yield axios.get(url);

  if (response.status === 200) {
    yield put(RedditActions.fetchTopSuccess(response.data, before));
  } else {
    yield put(RedditActions.fetchTopFailure(response));
  }
}
