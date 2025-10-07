import api from './api';
import { API_CONFIG } from '../utils/constants';

export const schoolsService = {
  getSchools: async (filters = {}) => {
    try {
      const response = await api.get(API_CONFIG.ENDPOINTS.SCHOOLS, {
        params: filters
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  createSchool: async (schoolData) => {
    try {
      const response = await api.post(API_CONFIG.ENDPOINTS.SCHOOLS, schoolData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  getCities: async (estadoId = null) => {
    try {
      const params = estadoId ? { estado_id: estadoId } : {};
      const response = await api.get(API_CONFIG.ENDPOINTS.CITIES, { params });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  getStates: async () => {
    try {
      const response = await api.get(API_CONFIG.ENDPOINTS.STATES);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  }
};