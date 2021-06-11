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
  toggleFavorite,
} from '../actions/actions';

const defaultState = {
  query: '',
  status: STATE_STATUS_IDLE,
  reachedEnd: false,
  beer: [],
  page: 1,
  filters: { abv: ALCOHOL_VOLUME_MIN, ibu: IBU_MIN, ebc: EBC_COLOR_MIN },
  filterStatus: false,
};

const beerSearch = handleActions(
  {
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
    [setFilters]: (state, action) => {
      return {
        ...state,
        filters: action.payload.filters,
      };
    },
    [setFilterStatus]: (state, action) => {
      return { ...state, filterStatus: action.payload.filterStatus };
    },
    [toggleFavorite]: (state, action) => {
      return {
        ...state,
        beer: state.beer.map((item) =>
          item.id === action.payload.id
            ? { ...item, isFavorite: !item.isFavorite }
            : item
        ),
      };
    },
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
