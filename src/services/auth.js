import api from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_CONFIG } from '../utils/constants';

export const authService = {
  login: async (email, senha) => {
    try {
      const response = await api.post(API_CONFIG.ENDPOINTS.LOGIN, {
        email,
        senha
      });
      
      if (response.data.token) {
        await AsyncStorage.setItem('userToken', response.data.token);
        await AsyncStorage.setItem('userData', JSON.stringify(response.data));
      }
      
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  logout: async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('userData');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  },

  getStoredUser: async () => {
    try {
      const userData = await AsyncStorage.getItem('userData');
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Erro ao acessar usuário:', error);
      return null;
    }
  }
};