import { handleActions } from 'redux-actions';
import {
  ALCOHOL_VOLUME_MIN,
  EBC_COLOR_MIN,
  IBU_MIN,
} from '../../constants/beerConstants';
import { STATE_STATUS_IDLE } from '../../constants/stateConstants';

import {
  listBeer,
  listMoreBeer,
  reachedEnd,
  setFilters,
  setFilterStatus,
  setStatus,
  removeFavorite,
  addFavorite,
  clearBeer,
  clearFilters,
} from '../actions/actions';

const defaultFilters = {
  abv: ALCOHOL_VOLUME_MIN,
  ibu: IBU_MIN,
  ebc: EBC_COLOR_MIN,
};

const defaultState = {
  query: '',
  status: STATE_STATUS_IDLE,
  reachedEnd: false,
  beer: [],
  favorites: [],
  page: 1,
  filters: defaultFilters,
  filterStatus: false,
};

const beerSearch = handleActions(
  {
    // list
    [listBeer]: (state, action) => {
      return {
        ...state,
        query: action.payload.query,
        beer: action.payload.items,
        page: 2,
        reachedEnd: false,
      };
    },
    [listMoreBeer]: (state, action) => {
      return {
        ...state,
        beer: state.beer.concat(action.payload.items),
        page: state.page + 1,
      };
    },
    [clearBeer]: (state, action) => {
      return {
        ...state,
        beer: [],
      };
    },
    // filters
    [setFilters]: (state, action) => {
      return {
        ...state,
        filters: action.payload.filters,
      };
    },
    [setFilterStatus]: (state, action) => {
      return { ...state, filterStatus: action.payload.filterStatus };
    },
    [clearFilters]: (state, action) => {
      return {
        ...state,
        filters: defaultFilters,
        filterStatus: false,
      };
    },
    // favorites
    [removeFavorite]: (state, action) => {
      return {
        ...state,
        beer: state.beer.map((item) =>
          item.id === action.payload.id ? { ...item, isFavorite: false } : item
        ),
        favorites: state.favorites.filter(
          (item) => item.id !== action.payload.id
        ),
      };
    },
    [addFavorite]: (state, action) => {
      return {
        ...state,
        beer: state.beer.map((item) =>
          item.id === action.payload.id ? { ...item, isFavorite: true } : item
        ),
        favorites: state.favorites.concat(
          state.beer.find((item) => item.id === action.payload.id)
        ),
      };
    },
    // status
    [setStatus]: (state, action) => {
      return {
        ...state,
        status: action.payload.status,
      };
    },
    [reachedEnd]: (state, action) => {
      return {
        ...state,
        reachedEnd: true,
      };
    },
  },
  defaultState
);

export default beerSearch;
