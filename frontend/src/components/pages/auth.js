// pages/auth.js
import jwt_decode from 'jwt-decode';

export const isTokenValid = (token) => {
  if (!token) return false;
  try {
    const { exp } = jwt_decode(token);
    if (exp < Date.now() / 3000) {
      return false;
    }
    return true;
  } catch (err) {
    return false;
  }
};