import axios from 'axios';
const hostLink = import.meta.env.VITE_HOSTCODE;
export function login (email, password) {
  return axios.post(`${hostLink}auth/login`, { email, password });
};

export function register (name, email, password) {
  return axios.post(`${hostLink}auth/register`, { name, email, password});
};