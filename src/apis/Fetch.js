import { getAccessToken } from './Session';
import { getSingleBeerURL } from './URL';

export async function fetchAPI(url) {
  const resolve = await fetch(url, {
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
      'Content-Type': 'application/json',
    },
  });
  return await resolve.json();
}

export async function fetchSingleBeer(id) {
  const url = getSingleBeerURL(id);
  const data = await (
    await fetch(url, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
        'Content-Type': 'application/json',
      },
    })
  ).json();
  return data[0];
}
