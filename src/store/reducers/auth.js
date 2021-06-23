import { handleActions } from 'redux-actions';

import { setAuthStatus } from '../actions/actions';

import { AUTH_STATUS_LOGGED_OUT } from '../../constants/authConstants';

const defaultState = {
  status: AUTH_STATUS_LOGGED_OUT,
};

const authReducer = handleActions(
  {
    // list
    [setAuthStatus]: (state, action) => {
      return {
        ...state,
        status: action.payload.status,
      };
    },
  },
  defaultState
);

export default authReducer;
