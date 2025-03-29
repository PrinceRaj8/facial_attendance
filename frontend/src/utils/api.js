import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const loginUser = async (username, password) => {
  const res = await axios.post(`${API_URL}/auth/login`, { username, password });
  return res.data;
};

export const registerUser = async (username, password) => {
  const res = await axios.post(`${API_URL}/users`, { username, password });
  return res.data;
};

export const markAttendance = async (user_id, token) => {
  const res = await axios.post(
    `${API_URL}/attendance/`,
    { user_id },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};
