// services/service.ts
import axios, { AxiosInstance } from 'axios';
import storage from '../utils/storage';

const BASE_URL = `https://vending-machine-backend-xjfo.onrender.com/api`; 

class ApiService {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: BASE_URL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor
    this.axiosInstance.interceptors.request.use(
      async (config) => {
        const token = await storage.getItem('authToken');
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  public async login(email: string, password: string) {
    try {
      const response = await this.axiosInstance.post('/auth/login', {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async getUserProfile(rfid: string) {
    try {
      const response = await this.axiosInstance.get(`/users/${rfid}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public async getUserBalance(rfid: string) {
    try {
      const response = await this.axiosInstance.get(`/users/${rfid}/balance`);
      return response.data?.balance || 0;
    } catch (error) {
      throw error;
    }
  }

  public async getUserPrescriptions(rfid: string) {
    try {
      const response = await this.axiosInstance.get(`/users/${rfid}/prescriptions`);
      return response.data?.prescriptions || [];
    } catch (error) {
      throw error;
    }
  }

  public async getUserPrescriptionDetails(prescriptionId: string) {
    try {
      const response = await this.axiosInstance.get(`/prescriptions/${prescriptionId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }


  public async scanRFID(rfidData: string) {
    try {
      const response = await this.axiosInstance.post('/rfid/scan', {
        rfid: rfidData,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

// Make sure you're exporting a singleton instance
const apiService = new ApiService();
export default apiService;