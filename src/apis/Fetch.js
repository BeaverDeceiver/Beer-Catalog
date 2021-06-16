import { getSingleBeerURL } from './URL';

function fetchAPI(url) {
  return fetch(url).then((resolve) => resolve.json());
}

export default fetchAPI;

export function fetchSingleBeer(id) {
  const url = getSingleBeerURL(id);
  return fetchAPI(url).then((data) => data[0]);
}
