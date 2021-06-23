// const urlBase = `https://beer-catalog-21-back.herokuapp.com/`;
const urlBase = `http://localhost:5000/`;

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

export const refreshURL = `${urlBase}auth/refresh`;

export const favoritesURL = `${urlBase}favorites`;

export const getFavoriteURLFromId = (id) => `${urlBase}favorites/${id}`;
