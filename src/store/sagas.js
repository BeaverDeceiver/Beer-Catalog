import { all, put, takeEvery } from 'redux-saga/effects';

import {
  addFavorite,
  listBeer,
  listMoreBeer,
  reachedEnd,
  removeFavorite,
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
  return url;
}

function* apiCall(query = '', page = 1, favorites) {
  const url =
    query !== ''
      ? getURL({ beer_name: query, page, per_page: PER_PAGE })
      : getURL({ page, per_page: PER_PAGE });

  // fetch api
  let fetchData = yield fetchAPI(url);
  let items = fetchData.map((item) => {
    return { ...item, isFavorite: false };
  });
  // XMLHttpRequest api
  // let xhrData = yield xhrAPI(url);
  // let items = xhrData.map((item) => ({ ...item, isFavorite: false }));
  if (items.length < PER_PAGE) yield put(reachedEnd());
  return items;
}

export function* fetchBeer(action) {
  const { query, favorites } = action.payload;
  const items = yield apiCall(query, 1, favorites);
  yield put(listBeer({ query, items }));
  yield put(setStatus({ status: STATE_STATUS_IDLE }));
}

export function* fetchMoreBeer(action) {
  const { query, page, favorites } = action.payload;
  const items = yield apiCall(query, page, favorites);

  console.log(items);
  yield put(listMoreBeer({ items, page }));
  yield put(setStatus({ status: STATE_STATUS_IDLE }));
}

export function* toggleFavorite(action) {
  const { favorites, id } = action.payload;
  if (!favorites.find((item) => item.id === id)) {
    yield put(addFavorite({ id }));
  } else {
    yield put(removeFavorite({ id }));
  }
}

export function* watchFetchBeer() {
  yield takeEvery('FETCH_BEER', fetchBeer);
}

export function* watchFetchMoreBeer() {
  yield takeEvery('FETCH_MORE_BEER', fetchMoreBeer);
}

export function* watchToggleFavorite() {
  yield takeEvery('TOGGLE_FAVORITE', toggleFavorite);
}

export default function* rootSaga() {
  yield all([watchFetchBeer(), watchFetchMoreBeer(), watchToggleFavorite()]);
}
