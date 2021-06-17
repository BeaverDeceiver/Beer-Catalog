import { all, put, takeEvery } from 'redux-saga/effects';

import {
  addFavorite,
  addFavoriteDetails,
  listBeer,
  listMoreBeer,
  reachedEnd,
  removeFavorite,
  removeFavoriteDetails,
  setStatus,
} from '../store/actions/actions';

import fetchAPI from '../apis/Fetch';
import { getMultipleBeerBackendURL } from '../apis/URL';
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
  const url =
    query !== ''
      ? getMultipleBeerBackendURL({
          beer_name: query,
          page,
          per_page: PER_PAGE,
        })
      : getMultipleBeerBackendURL({ page, per_page: PER_PAGE });

  let fetchData = yield fetchAPI(url);
  let items = mapResponse(fetchData, favorites);

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
    watchToggleFavorite(),
    watchToggleFavoriteDetails(),
  ]);
}
