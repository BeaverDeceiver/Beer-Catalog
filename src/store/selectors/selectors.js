export function selectBeer(state) {
  return state.beerSearch.beer;
}

export function selectFavorites(state) {
  return state.beerSearch.favorites;
}

export function selectStatus(state) {
  return state.beerSearch.status;
}

export function selectQuery(state) {
  return state.beerSearch.query;
}

export function selectPage(state) {
  return state.beerSearch.page;
}

export function selectFilters(state) {
  return state.beerSearch.filters;
}

export function selectFilterStatus(state) {
  return state.beerSearch.filterStatus;
}

export function selectReachedEnd(state) {
  return state.beerSearch.reachedEnd;
}
