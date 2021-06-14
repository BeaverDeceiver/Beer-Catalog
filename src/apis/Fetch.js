import GetURL from './URL';

function fetchAPI(url) {
  return fetch(url).then((resolve) => resolve.json());
}

export default fetchAPI;

export function fetchBeer(id) {
  const url = GetURL({ id });
  return fetchAPI(url);
}
