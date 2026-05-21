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

export async function logOut() {
  const token = localStorage.getItem("token");
  return axios.post(
    `${hostLink}auth/logout`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }                   
  );
}

export async function forgotPW(email) {
  return axios.patch(
    `${hostLink}auth/forgotPW`, {email}                 
  );
}

export async function resetPW(token, newPassword) {
  return axios.patch(`${hostLink}auth/resetPW`, { token, newPassword });
}

export async function verifyResetToken(token) {
    return axios.post(`${hostLink}auth/verifyResetToken`, { token });
}
export async function addCommentAPI(ticketId, content, imageUrl) {
  const token = localStorage.getItem("token");
  return axios.post(
    `${hostLink}tickets/${ticketId}/comments`,
    { content, imageUrl },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
}

export async function deleteCommentFromTicket(commentId) {
  const token = localStorage.getItem("token");
  return axios.delete(
    `${hostLink}tickets/deletecomment/${commentId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
}