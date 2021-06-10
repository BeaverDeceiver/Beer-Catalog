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

export function selectFilters(state) {
  return state.beerSearch.filters;
}
export function selectFilterStatus(state) {
  return state.beerSearch.filterStatus;
}
