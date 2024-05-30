// frontend/src/auth/auth.js

import axios from 'axios';



export const login = async (email, password) => {
  try {
    const formData = new URLSearchParams();
    formData.append("username", email);
    formData.append("password", password);

    const response = await axios.post('/auth/jwt/login', formData, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    const { access_token } = response.data;
    localStorage.setItem('token', access_token);
    return access_token;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem('token');
};

export const getCurrentUser = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    console.error('No token found in local storage');
    return null;
  }

  try {
    const response = await axios.get('/users/me', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.error('Token is invalid or expired. Clearing token from localStorage.');
      localStorage.removeItem('token');
    } else {
      console.error('Get current user error:', error.response ? error.response.data : error.message);
    }
    return null;
  }
};





export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};
