import { all, put, takeEvery } from 'redux-saga/effects';

import {
  listBeer,
  listMoreBeer,
  reachedEnd,
  setStatus,
} from '../store/actions/actions';

// import xhrAPI from '../apis/XmlHttpRequest';
import fetchAPI from '../apis/Fetch';
import { PER_PAGE, STATE_STATUS_IDLE } from '../constants/stateConstants';

function getURL(params = {}) {
  // cant use url for query generation as is due to the api specs
  let url = new URL('https://api.punkapi.com/v2/beers');
  for (const [key, value] of Object.entries(params)) {
    if (typeof value === 'string')
      url.searchParams.set(key, value.replace(/\s/g, '_'));
    else url.searchParams.set(key, value);
  }
  console.log(url);
  return url;
}

function* apiCall(query = '', page = 1) {
  const url =
    query !== ''
      ? getURL({ beer_name: query, page, per_page: PER_PAGE })
      : getURL({ page, per_page: PER_PAGE });

  // fetch api
  let fetchData = yield fetchAPI(url);
  let items = fetchData.map((item) => ({ ...item, isFavorite: false }));

  // XMLHttpRequest api
  // let xhrData = yield xhrAPI(url);
  // let items = xhrData.map((item) => ({ ...item, isFavorite: false }));
  if (items.length < PER_PAGE) yield put(reachedEnd());
  return items;
}

export function* fetchBeer(action) {
  const { query } = action.payload;
  const items = yield apiCall(query);
  yield put(listBeer({ query, items }));
  yield put(setStatus({ status: STATE_STATUS_IDLE }));
}

export function* fetchMoreBeer(action) {
  const { query, page } = action.payload;
  const items = yield apiCall(query, page);

  console.log(items);
  yield put(listMoreBeer({ items, page }));
  yield put(setStatus({ status: STATE_STATUS_IDLE }));
}

export function* toggleFavorite(action) {}

export function* watchFetchBeer() {
  yield takeEvery('FETCH_BEER', fetchBeer);
}

export function* watchFetchMoreBeer() {
  yield takeEvery('FETCH_MORE_BEER', fetchMoreBeer);
}

export function* watchToggleFavorite() {
  yield takeEvery('TOGGLE_FAVORITE', fetchMoreBeer);
}

export default function* rootSaga() {
  yield all([watchFetchBeer(), watchFetchMoreBeer()]);
}
