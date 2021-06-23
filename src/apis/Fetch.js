import { getAccessToken } from './Session';
import { favoritesURL, getFavoriteURLFromId, getSingleBeerURL } from './URL';

async function sendAuthorizedRequest(url, method = 'GET') {
  return await fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
      'Content-Type': 'application/json',
    },
  });
}

export async function fetchBeerList(url) {
  return await (await sendAuthorizedRequest(url)).json();
}

export async function fetchSingleBeer(id) {
  const url = getSingleBeerURL(id);
  return (await (await sendAuthorizedRequest(url)).json())[0];
}

export async function fetchUserFavorites() {
  return await (await sendAuthorizedRequest(favoritesURL)).json();
}

export async function requestDeleteFavorite(id) {
  const url = getFavoriteURLFromId(id);
  return await sendAuthorizedRequest(url, 'DELETE');
}

export async function requestAddFavorite(id) {
  const url = getFavoriteURLFromId(id);
  return await (await sendAuthorizedRequest(url, 'POST')).json();
}
