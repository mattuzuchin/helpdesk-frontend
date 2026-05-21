import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { getName, getUserTickets, logOut } from '../app/api/auth.js';

export function useDashboardData() {
  const [name, setName] = useState("");
  const [tickets, setTickets] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const decoded = jwtDecode(token);

        const getUsername = await getName(decoded.id);
        setName(getUsername.data.name);

        const getTickets = await getUserTickets(decoded.id);
        setTickets(getTickets.data.tickets);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const logOutUser = async () => {
    try {
      setError('');
      await logOut();
      setSuccess("Logged out!");
      setTimeout(() => {
        navigate("/login");
        localStorage.removeItem("token");
      }, 2500);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to logout");
    }
  };

  return { name, tickets, setTickets,menuOpen, setMenuOpen, success, error, logOutUser, navigate };
}

