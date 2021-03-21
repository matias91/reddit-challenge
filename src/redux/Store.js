import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

export default (rootReducer, rootSaga) => {
  /* --- CREATE SAGA MIDDLEWARE --- */
  const sagaMiddleware = createSagaMiddleware();

  /* --- CREATE STORE --- */
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware)
  });

  /* --- RUN SAGA  --- */
  sagaMiddleware.run(rootSaga);

  return store
}
