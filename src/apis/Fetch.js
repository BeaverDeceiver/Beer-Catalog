function fetchAPI(url) {
  return fetch(url).then((resolve) => resolve.json());
}

export default fetchAPI;
