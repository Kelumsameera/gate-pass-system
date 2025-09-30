import axios from "axios";

const BASE_URL = "http://localhost:5000/users";

export const registerUser = async (data) => {
  return await axios.post(BASE_URL, data);
};

export const loginUser = async (data) => {
  return await axios.post(`${BASE_URL}/login`, data);
};

export const getProfile = async (token) => {
  return await axios.get(`${BASE_URL}/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
