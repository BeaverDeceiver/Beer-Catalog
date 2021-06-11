import { createAction } from 'redux-actions';

export const listBeer = createAction('LIST_BEER');

export const fetchBeer = createAction('FETCH_BEER');

export const setFilters = createAction('SET_FILTERS');

export const setFilterStatus = createAction('SET_FILTER_STATUS');

export const toggleFavorite = createAction('TOGGLE_FAVORITE');

export const setStatus = createAction('SET_STATUS');
