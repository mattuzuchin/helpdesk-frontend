import axios from 'axios';
const hostLink = import.meta.env.VITE_HOSTCODE;
export default function login (email, password) {
console.log('Attempting to log in with email:', email);
console.log('Using host link:', `${hostLink}auth/login`);
  return axios.post(`${hostLink}auth/login`, { email, password });
};