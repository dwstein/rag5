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
    // console.log('Login response:', response.data);
    // console.log('access_token (auth.js):', access_token);
    localStorage.setItem('token', access_token);

    return access_token;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};


export const signup = async (email, password) => {
  try {
    // console.log('Signup request: ', email, password);
    const response = await axios.post('/auth/register', {
      email,
      password,
    });
    // console.log('Signup response:', response.data);

    const access_token = await login(email, password);
    // console.log('Login response token: ', access_token);
  
    return access_token;
  } catch (error) {
    // console.log('Signup error:', error.response ? error.response.data : error.message);
    console.error('Signup error:', error);
    throw error;
  }
};


export const logout = () => {
  localStorage.removeItem('token');
};

export const getCurrentUser = async () => {
  const token = localStorage.getItem('token');
  // console.log('Current user token:', token);
  if (!token) {
    console.error('No token found in local storage');
    return null;
  }

  try {
    const response = await axios.get('/users/me', {
      headers: { Authorization: `Bearer ${token}` },
    });
    // console.log('Current user response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Get current user error:', error.response ? error.response.data : error.message);
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
