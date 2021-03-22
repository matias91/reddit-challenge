// @Vendors
import { combineReducers } from 'redux';

import { reducer } from './RedditRedux';

// @Store
import configureStore from './Store';

// @Sagas
import rootSaga from '../sagas';

const rootReducer = combineReducers({
  reddit: reducer
});

const store = configureStore(rootReducer, rootSaga);

export default store;
