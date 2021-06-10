import { configureStore } from '@reduxjs/toolkit';
import beerSearchReducer from './reducers/reducers';
import Saga from 'redux-saga';
import rootSaga from './sagas';

const sagaMiddleware = Saga();

export const store = configureStore({
  reducer: {
    beerSearch: beerSearchReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);
