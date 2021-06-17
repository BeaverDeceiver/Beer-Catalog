import { getSingleBeerURL, getSingleBeerURLBackend } from './URL';

function fetchAPI(url) {
  return fetch(url).then((resolve) => resolve.json());
}

export default fetchAPI;

export function fetchSingleBeer(id) {
  const url = getSingleBeerURL(id);
  return fetchAPI(url).then((data) => data[0]);
}

export async function fetchSingleBeerBackend(id) {
  const url = getSingleBeerURLBackend(id);
  const data = await (await fetch(url)).json();
  return data[0];
}
