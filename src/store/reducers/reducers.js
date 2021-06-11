import { handleActions } from 'redux-actions';
import {
  ALCOHOL_VOLUME_MIN,
  EBC_COLOR_MIN,
  IBU_MIN,
} from '../../constants/beerConstants';
import { STATE_STATUS_IDLE } from '../../constants/stateConstants';

import {
  listBeer,
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
  nextPageToken: 1,
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
        nextPageToken: 2,
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
      console.log('caught');
      return {
        ...state,
        status: action.payload.status,
      };
    },
  },
  defaultState
);

export default beerSearch;
