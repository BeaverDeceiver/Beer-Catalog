import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { sendRefreshRequest } from '../../apis/Auth';
import { getRefreshToken, setTokens } from '../../apis/Session';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthStatus } from '../../store/actions/actions';
import {
  AUTH_STATUS_LOGGED_IN,
  AUTH_STATUS_LOGGED_OUT,
} from '../../constants/authConstants';
import { Error } from '../Error/Error';
import { selectAuthStatus } from '../../store/selectors/selectors';

export function PrivateRoute({ component: Component, ...rest }) {
  const dispatch = useDispatch();
  const authStatus = useSelector(selectAuthStatus);

  async function restoreSession() {
    sendRefreshRequest()
      .then((response) => {
        setTokens(response);
        dispatch(setAuthStatus({ status: AUTH_STATUS_LOGGED_IN }));
      })
      .catch((e) => {
        dispatch(setAuthStatus({ status: AUTH_STATUS_LOGGED_OUT }));
        return <Error message={e.statusText} status={e.status} />;
      });
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        authStatus ? (
          <Component {...props} />
        ) : getRefreshToken() ? (
          (() => {
            restoreSession();
          })()
        ) : (
          <Redirect
            to={{
              pathname: '/auth/signin',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
}
