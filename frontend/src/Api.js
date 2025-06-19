import React from 'react'
import axios from 'axios';
const API_URL = 'https://servicebox35.ru';

export const createClaim = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/claims/create`, data);
    return response.data;
  } catch (error) {
    console.error('Error creating claim:', error.response ? error.response.data : error.message);
    throw error;
  }
};