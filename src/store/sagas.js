import { all, put, takeEvery } from 'redux-saga/effects';

import { listBeer } from '../store/actions/actions';

// import xhrAPI from '../apis/XmlHttpRequest';
import fetchAPI from '../apis/Fetch';

function getURL(params = {}) {
  // cant use url for query generation as is due to the api specs
  let url = new URL('https://api.punkapi.com/v2/beers');
  if (params.beer_name !== '')
    for (const [key, value] of Object.entries(params)) {
      url.searchParams.set(key, value.replace(/\s/g, '_'));
    }
  return url;
}

export function* fetchBeer(action) {
  const { query } = action.payload;
  const url = getURL({ beer_name: query });

  // fetch api
  let fetchData = yield fetchAPI(url);
  let items = fetchData.map((item) => ({ ...item, isFavorite: false }));

  // XMLHttpRequest api
  // let xhrData = yield xhrAPI(url);
  // let items = xhrData.map((item) => ({ ...item, isFavorite: false }));
  yield put(listBeer({ query, items }));
}

export function* watchFetchVideos() {
  yield takeEvery('FETCH_BEER', fetchBeer);
}

export default function* rootSaga() {
  yield all([watchFetchVideos()]);
}
