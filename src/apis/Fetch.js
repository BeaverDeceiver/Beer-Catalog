import { getAccessToken } from './Session';
import { favoritesURL, getSingleBeerURL } from './URL';

async function sendAuthorizedRequest(url) {
  return await fetch(url, {
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
      'Content-Type': 'application/json',
    },
  });
}

export async function fetchAPI(url) {
  return await (await sendAuthorizedRequest(url)).json();
}

export async function fetchSingleBeer(id) {
  const url = getSingleBeerURL(id);
  return (await (await sendAuthorizedRequest(url)).json())[0];
}

export async function fetchUserFavorites() {
  return await (await sendAuthorizedRequest(favoritesURL)).json();
}
