// @Vendors
import { all, takeLatest } from 'redux-saga/effects';

/* --- Types --- */
import { RedditTypes } from '../redux/RedditRedux';

/* --- Sagas --- */
import {
  fetchTop,
} from './RedditSagas';

/* --- Connect Types To Sagas --- */

export default function* root() {
  try {
    yield all([
      // REDDIT
      takeLatest(RedditTypes.FETCH_TOP_REQUEST, fetchTop)
    ]);
  } catch (err) {
    console.log(err);
  }
}
