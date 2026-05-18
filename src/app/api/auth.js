import axios from 'axios';
const hostLink = import.meta.env.HOSTCODE;
export default function login (email, password) {
  return axios.post(`${hostLink}/auth/login`, { email, password });
};