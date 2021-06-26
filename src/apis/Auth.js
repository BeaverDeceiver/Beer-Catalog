import { getRefreshToken } from './Session';
import { refreshURL, signInURL, signUpURL } from './URL';

export async function sendSignInRequest(user) {
  const url = signInURL;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  if (!response.ok) {
    const error = {
      message: (await response.json()).message,
      status: response.status,
    };
    throw error;
  }
  return await response.json();
}

export async function sendRefreshRequest() {
  const refreshToken = getRefreshToken();
  const url = refreshURL;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refreshToken }),
  });
  if (!response.ok) {
    const error = {
      message: (await response.json()).message,
      status: response.status,
    };
    throw error;
  }
  return response.json();
}

export async function sendSignUpRequest(user) {
  const url = signUpURL;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  if (!response.ok) {
    const error = {
      message: (await response.json()).message,
      status: response.status,
    };
    throw error;
  }
  return await response.json();
}
