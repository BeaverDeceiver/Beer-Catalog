import { configureStore } from '@reduxjs/toolkit';
import beerSearchReducer from './reducers/beer';
import Saga from 'redux-saga';
import rootSaga from './sagas';
import { batchedSubscribe } from 'redux-batched-subscribe';

const sagaMiddleware = Saga();

export const store = configureStore({
  reducer: {
    beerSearch: beerSearchReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
  enhancers: [
    batchedSubscribe((notify) => {
      notify();
    }),
  ],
});

sagaMiddleware.run(rootSaga);
