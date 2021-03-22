// @Vendors
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// @Transforms
import ImmutablePersistenceTransform from './ImmutablePersistenceTransform'

const persistConfig = {
  key: 'root',
  storage,
  transforms: [ImmutablePersistenceTransform]
}

const createStore = (rootReducer, rootSaga) => {
  /* --- CREATE SAGA MIDDLEWARE --- */
  const sagaMiddleware = createSagaMiddleware();

  const persistedReducer = persistReducer(persistConfig, rootReducer);

  /* --- CREATE STORE --- */
  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    }).concat(sagaMiddleware)
  });

  /* --- RUN SAGA  --- */
  sagaMiddleware.run(rootSaga);

  return store;
}

export default createStore;
