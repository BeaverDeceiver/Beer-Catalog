const urlBase = `https://beer-catalog-21-back.herokuapp.com/`;

export function getSingleBeerURL(id) {
  return `${urlBase}beer/${id}`;
}

export function getMultipleBeerURL(params) {
  let url = new URL(`${urlBase}`);
  for (const [key, value] of Object.entries(params)) {
    if (typeof value === 'string')
      url.searchParams.set(key, value.replace(/\s/g, '_'));
    else url.searchParams.set(key, value);
  }
  return url;
}

export const signInURL = `${urlBase}auth/signin`;

export const signUpURL = `${urlBase}auth/signup`;
