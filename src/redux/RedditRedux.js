// @Vendors
import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  // FETCH TOP
  fetchTopRequest: null,
  fetchTopSuccess: ['response'],
  fetchTopFailure: ['response'],
});

export const RedditTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  errorMessage: '',
  feed: [],
  fetching: false,
  showError: false,
});

/* ------------- Reducers ------------- */

export const request = (state) =>
  state.merge({
    errorMessage: '',
    fetching: true,
    showError: false
  });

export const success = (state, { response }) =>
  state.merge({
    fetching: false
  });

export const fetchTopSuccess = (state, { response }) =>
  state.merge({
    after: response.data.after,
    feed: response.data.children,
    fetching: false
  });

export const failure = (state, { response }) =>
  state.merge({
    errorMessage: response,
    fetching: false,
    showError: true
  });

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  // FETCH TOP
  [Types.FETCH_TOP_REQUEST]: request,
  [Types.FETCH_TOP_SUCCESS]: fetchTopSuccess,
  [Types.FETCH_TOP_FAILURE]: failure,
});
