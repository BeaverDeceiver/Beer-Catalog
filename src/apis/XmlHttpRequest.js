function xhrAPI(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.send();
    xhr.onload = () => resolve(JSON.parse(xhr.response));
  });
}
export default xhrAPI;
