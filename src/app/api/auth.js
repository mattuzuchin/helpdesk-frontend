import axios from 'axios';
import { jwtDecode } from "jwt-decode";
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

export async function getAllTickets() {
  const token = localStorage.getItem("token");
  return axios.get(
    `${hostLink}tickets`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
}

export async function deleteTicket(ticketId) {
  const token = localStorage.getItem("token");
  return axios.delete(
    `${hostLink}tickets/delete/${ticketId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
}

export async function closeTicket(ticketId) {
  const token = localStorage.getItem("token");
  return axios.patch(
    `${hostLink}tickets/${ticketId}/close`,
    {},
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  );
}

export async function getAllUsers() {
  const token = localStorage.getItem("token");
  return axios.get(
    `${hostLink}users/getAllUsers`,
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  );
}

export async function changeUserRole(userId, newRole) {
  const token = localStorage.getItem("token");
  return axios.patch(
    `${hostLink}users/${userId}/changerole`,
    { newRole },
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  );
}

export async function deleteUser(userId) {
  const token = localStorage.getItem("token");
  return axios.delete(
    `${hostLink}users/delete/${userId}`,
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  );
}

export async function claimTicket(ticketId) {
  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  return axios.patch(
    `${hostLink}tickets/${ticketId}/assign`,
    { agentID: decoded.id },
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  );
}


export async function reassignTicket(ticketId, agentID) {
  const token = localStorage.getItem("token");
  return axios.patch(
    `${hostLink}tickets/${ticketId}/reassign`,
    { agentID: agentID },
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  );
}


export async function reopenTicket(ticketId) {
  const token = localStorage.getItem("token");
  return axios.patch(
    `${hostLink}tickets/${ticketId}/reopen`,
    {},
    {
      headers: { Authorization: `Bearer ${token}` }
    }
  );
}