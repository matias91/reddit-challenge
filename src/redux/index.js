// @Vendors
import { resettableReducer } from 'reduxsauce';

// @Store
import configureStore from './Store';

// @Sagas
import rootSaga from '../sagas';

const resettable = resettableReducer('RESET');

const rootReducer = {
  reddit: resettable(require('./RedditRedux').reducer)
}

const store = configureStore(rootReducer, rootSaga);

export default store;
