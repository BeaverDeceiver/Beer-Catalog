import { getSingleBeerURL } from './URL';

export async function fetchAPI(url) {
  const resolve = await fetch(url);
  return await resolve.json();
}

export async function fetchSingleBeer(id) {
  const url = getSingleBeerURL(id);
  const data = await fetchAPI(url);
  return data[0];
}

export async function fetchSingleBeerBackend(id) {
  const url = getSingleBeerURL(id);
  const data = await (await fetch(url)).json();
  return data[0];
}
