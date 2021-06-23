import { getRefreshToken } from './Session';
import { refreshURL, signInURL, signUpURL } from './URL';

export async function sendSignInRequest(user) {
  const url = signInURL;
  const response = fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  return (await response).json();
}

export async function sendRefreshRequest() {
  const refreshToken = getRefreshToken();
  const url = refreshURL;
  const response = fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refreshToken }),
  });
  return (await response).json();
}

export async function sendSignUpRequest(user) {
  const url = signUpURL;
  const response = fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  return await (await response).json();
}
