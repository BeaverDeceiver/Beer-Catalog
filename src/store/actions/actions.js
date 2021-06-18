import { createAction } from 'redux-actions';

// list
export const listBeer = createAction('LIST_BEER');

export const listMoreBeer = createAction('LIST_MORE_BEER');

export const clearBeer = createAction('CLEAR_LIST');

// fetch
export const fetchBeer = createAction('FETCH_BEER');

export const fetchMoreBeer = createAction('FETCH_MORE_BEER');

export const fetchMoreBeerWithFilters = createAction(
  'FETCH_MORE_BEER_WITH_FILTERS'
);

// filters
export const setFilters = createAction('SET_FILTERS');

export const setFilterStatus = createAction('SET_FILTER_STATUS');

export const clearFilters = createAction('CLEAR_FILTERS');

// favorites
export const addFavorite = createAction('ADD_FAVORITE');

export const toggleFavorite = createAction('TOGGLE_FAVORITE');

export const removeFavorite = createAction('REMOVE_FAVORITE');

export const toggleFavoriteDetails = createAction('TOGGLE_FAVORITE_DETAILS');

export const addFavoriteDetails = createAction('ADD_FAVORITE_DETAILS');

export const removeFavoriteDetails = createAction('REMOVE_FAVORITE_DETAILS');

// status
export const setStatus = createAction('SET_STATUS');

export const reachedEnd = createAction('REACHED_END');
