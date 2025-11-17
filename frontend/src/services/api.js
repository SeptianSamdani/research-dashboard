import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const searchTopic = async (topic) => {
  const response = await axios.post(`${API_URL}/search`, { topic });
  return response.data;
};

export const getDashboardData = async (topic) => {
  const response = await axios.get(`${API_URL}/dashboard-data`, {
    params: { topic }
  });
  return response.data;
};

export const exportToCSV = async (topic) => {
  const response = await axios.get(`${API_URL}/export-csv`, {
    params: { topic },
    responseType: 'blob' // Important for file download
  });
  return response.data;
};