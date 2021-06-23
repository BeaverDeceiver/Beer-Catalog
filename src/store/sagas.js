import { all, put, takeEvery } from 'redux-saga/effects';

import {
  addFavorite,
  addFavoriteDetails,
  listBeer,
  listMoreBeer,
  reachedEnd,
  removeFavorite,
  removeFavoriteDetails,
  setFavorites,
  setStatus,
} from './actions/actions';

import { fetchAPI, fetchUserFavorites } from '../apis/Fetch';
import { getMultipleBeerURL } from '../apis/URL';
import { PER_PAGE, STATE_STATUS_IDLE } from '../constants/stateConstants';

function mapResponse(response, favorites) {
  return response.map((item) => {
    return {
      ...item,
      isFavorite:
        favorites.find((f_item) => {
          return f_item.id === item.id;
        }) !== undefined,
    };
  });
}

function* apiCall(query = '', page = 1, favorites) {
  const params =
    query === ''
      ? { page, per_page: PER_PAGE }
      : {
          beer_name: query,
          page,
          per_page: PER_PAGE,
        };
  const url = getMultipleBeerURL(params);

  let fetchData = yield fetchAPI(url);
  let items = mapResponse(fetchData, favorites);

  if (items.length < PER_PAGE) yield put(reachedEnd());
  return items;
}

function* apiCallWithFilters(query = '', page = 1, favorites, filters) {
  const params =
    query === ''
      ? { page, per_page: PER_PAGE, ...filters }
      : {
          beer_name: query,
          page,
          per_page: PER_PAGE,
          ...filters,
        };

  console.log(params);

  const url = getMultipleBeerURL(params);

  let fetchData = yield fetchAPI(url);
  let items = mapResponse(fetchData, favorites);

  if (items.length < PER_PAGE) yield put(reachedEnd());
  return items;
}

// initial beer list - o
export function* fetchBeer(action) {
  const { query } = action.payload;
  const favorites = yield fetchUserFavorites();
  yield put(setFavorites({ favorites }));

  const items = yield apiCall(query, 1, favorites);

  yield put(listBeer({ query, items }));
  yield put(setStatus({ status: STATE_STATUS_IDLE }));
}

// following beer list
export function* fetchMoreBeer(action) {
  const { query, page } = action.payload;

  const favorites = yield fetchUserFavorites();
  yield put(setFavorites({ favorites }));

  const items = yield apiCall(query, page, favorites);

  yield put(listMoreBeer({ items, page }));
  yield put(setStatus({ status: STATE_STATUS_IDLE }));
}

export function* fetchMoreBeerWithFilters(action) {
  const { query, page, filters } = action.payload;

  const favorites = yield fetchUserFavorites();
  yield put(setFavorites({ favorites }));

  const items = yield apiCallWithFilters(query, page, favorites, filters);

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

export function* toggleFavoriteDetails(action) {
  const { favorites, beer } = action.payload;
  if (!favorites.find((item) => item.id === beer.id)) {
    yield put(addFavoriteDetails({ beer }));
  } else {
    yield put(removeFavoriteDetails({ beer }));
  }
}

export function* watchFetchBeer() {
  yield takeEvery('FETCH_BEER', fetchBeer);
}

export function* watchFetchMoreBeer() {
  yield takeEvery('FETCH_MORE_BEER', fetchMoreBeer);
}

export function* watchFetchMoreBeerWithFilters() {
  yield takeEvery('FETCH_MORE_BEER_WITH_FILTERS', fetchMoreBeerWithFilters);
}

export function* watchToggleFavorite() {
  yield takeEvery('TOGGLE_FAVORITE', toggleFavorite);
}

export function* watchToggleFavoriteDetails() {
  yield takeEvery('TOGGLE_FAVORITE_DETAILS', toggleFavoriteDetails);
}

export default function* rootSaga() {
  yield all([
    watchFetchBeer(),
    watchFetchMoreBeer(),
    watchFetchMoreBeerWithFilters(),
    watchToggleFavorite(),
    watchToggleFavoriteDetails(),
  ]);
}
