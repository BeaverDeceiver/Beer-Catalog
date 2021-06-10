import { handleActions } from 'redux-actions';
import { STATE_STATUS_IDLE } from '../../constants/stateConstants';

import { listBeer } from '../actions/actions';

const defaultState = {
  query: '',
  status: STATE_STATUS_IDLE,
  beer: [],
  nextPageToken: 1,
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
  },
  defaultState
);

export default beerSearch;
