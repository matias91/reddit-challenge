// @Vendors
import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  // FETCH TOP
  fetchTopRequest: ['after', 'before'],
  fetchTopSuccess: ['response', 'before'],
  fetchTopFailure: ['response'],
  // SET SELECTED POST
  setSelectedPost: ['selectedPost'],
  // DISSMISS POST
  dissmissPost: ['postIndex'],
  // DISSMISS ALL POSTS
  dissmissAllPosts: null,
});

export const RedditTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  after: null,
  before: null,
  count: 0,
  errorMessage: '',
  fetching: false,
  posts: [],
  selectedPost: null,
  showError: false,
});

/* ------------- Reducers ------------- */

export const request = (state) =>
  state.merge({
    errorMessage: '',
    fetching: true,
    showError: false
  });

export const fetchTopRequest = (state) =>
  state.merge({
    errorMessage: '',
    fetching: true,
    posts: [],
    showError: false
  });

export const success = (state, { response }) =>
  state.merge({
    fetching: false
  });

export const fetchTopSuccess = (state, { response, before }) =>
  state.merge({
    after: response.data.after,
    before: response.data.before,
    count: before ? state.count - 50 : state.count + 50,
    posts: response.data.children,
    fetching: false
  });

export const failure = (state, { response }) =>
  state.merge({
    errorMessage: response,
    fetching: false,
    showError: true
  });

export const setSelectedPost = (state, { selectedPost }) =>
  state.merge({
    selectedPost
  });

export const dissmissPost = (state, { postIndex }) =>
  state.merge({
    posts: state.posts.filter((post, index) => index !== postIndex),
    selectedPost: null
  });

export const dissmissAllPosts = (state) =>
  state.merge(INITIAL_STATE);

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  // FETCH TOP
  [Types.FETCH_TOP_REQUEST]: fetchTopRequest,
  [Types.FETCH_TOP_SUCCESS]: fetchTopSuccess,
  [Types.FETCH_TOP_FAILURE]: failure,
  // SET SELECTED POST
  [Types.SET_SELECTED_POST]: setSelectedPost,
  // DISSMISS POST
  [Types.DISSMISS_POST]: dissmissPost,
  // DISSMISS ALL POSTS
  [Types.DISSMISS_ALL_POSTS]: dissmissAllPosts,
});
