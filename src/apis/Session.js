import Cookies from 'js-cookie';

export const parseToken = (token) => {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace('-', '+').replace('_', '/');
  return JSON.parse(window.atob(base64));
};

export const getRefreshToken = () => {
  return Cookies.get('__refresh-token');
};

export const setTokens = ({ accessToken, refreshToken }) => {
  logOut();
  Cookies.set('__access-token', accessToken, { sameSite: 'Strict' });
  Cookies.set('__refresh-token', refreshToken, {
    expires: 1,
    sameSite: 'Strict',
  });
};

export const getAccessToken = () => {
  return Cookies.get('__access-token');
};

export const logOut = () => {
  Cookies.remove('__access-token');
};

export const hardLogOut = () => {
  Cookies.remove('__access-token');
  Cookies.remove('__refresh-token');
};

export const getOwnId = () => parseToken(getAccessToken()).id;
