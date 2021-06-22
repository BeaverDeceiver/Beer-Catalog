import React, { useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { sendRefreshRequest } from '../../apis/Auth';
import { getAccessToken, getRefreshToken, setTokens } from './Session';
import { LinearProgress } from '@material-ui/core';
// import { useDispatch } from 'react-redux';

export function PrivateRoute({ component: Component, ...rest }) {
  const [loggedIn, setLoggedIn] = useState(getAccessToken());
  // const dispatch = useDispatch();

  async function restoreSession(props) {
    try {
      sendRefreshRequest().then((response) => {
        setTokens(response);
        setLoggedIn(getAccessToken());
        // dispatch(setAuthStatus({ status: AUTH_STATUS_LOGGED_IN }));
      });
    } catch (e) {
      console.log(`error :${e}`);
      // dispatch(setAuthStatus({ status: AUTH_STATUS_LOGGED_OUT }));
      return false;
    }
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        loggedIn ? (
          <Component {...props} />
        ) : getRefreshToken() ? (
          (() => {
            restoreSession();
            return <LinearProgress />;
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
