export function getMultipleBeerURL(params = {}) {
  let url = new URL('https://api.punkapi.com/v2/beers');
  for (const [key, value] of Object.entries(params)) {
    if (typeof value === 'string')
      url.searchParams.set(key, value.replace(/\s/g, '_'));
    else url.searchParams.set(key, value);
  }
  return url;
}

export function getSingleBeerURL(id) {
  return `https://api.punkapi.com/v2/beers/${id}`;
}

export function getSingleBeerURLBackend(id) {
  return `https://beer-catalog-21-back.herokuapp.com/beer/${id}`;
}

export function getMultipleBeerBackendURL(params) {
  let url = new URL(`https://beer-catalog-21-back.herokuapp.com/`);
  for (const [key, value] of Object.entries(params)) {
    if (typeof value === 'string')
      url.searchParams.set(key, value.replace(/\s/g, '_'));
    else url.searchParams.set(key, value);
  }
  return url;
}
