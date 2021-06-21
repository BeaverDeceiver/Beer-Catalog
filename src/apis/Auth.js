import { signInURL, signUpURL } from './URL';

export async function sendSignInRequest(user) {
  const url = signInURL;
  const response = fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  return await (await response).json();
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
