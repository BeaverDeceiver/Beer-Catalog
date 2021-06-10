export function selectBeer(state) {
  return state.beerSearch.beer;
}

export function selectStatus(state) {
  return state.beerSearch.status;
}

export function selectQuery(state) {
  return state.beerSearch.query;
}

export function selectNextPageToken(state) {
  return state.beerSearch.nextPageToken;
}
