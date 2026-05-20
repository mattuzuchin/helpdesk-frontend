import axios from 'axios';
const hostLink = import.meta.env.VITE_HOSTCODE;
export function login (email, password) {
  return axios.post(`${hostLink}auth/login`, { email, password });
};

export function register (name, email, password) {
  return axios.post(`${hostLink}auth/register`, { name, email, password});
};

export async function getName(id) {

  const token = localStorage.getItem("token");

  return axios.get(
    `${hostLink}users/${id}/getName`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
}

export async function getUserTickets(id) {

  const token = localStorage.getItem("token");

  return axios.get(
    `${hostLink}tickets/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
}

export async function createTicket(title, description) {

  const token = localStorage.getItem("token");

  return axios.post(
    `${hostLink}tickets/createticket`,
    {
        title,
        description
    },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
}

export async function getTicketInfo(id) {

  const token = localStorage.getItem("token");

  return axios.get(
    `${hostLink}tickets/${id}/getTicket`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
}