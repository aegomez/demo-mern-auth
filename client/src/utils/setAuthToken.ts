import ky from 'ky';

const setAuthToken = (token: string | boolean) => {
  if (token && typeof token === 'string') {
    // Apply authorization token to every request if logged in
    ky.extend({
      headers: { Authorization: token }
    });
  } else {
    ky.extend({
      headers: { Authorization: '' }
    });
  }
};

export default setAuthToken;
