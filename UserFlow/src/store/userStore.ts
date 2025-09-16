// stores/userStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiService from '../services/service'; // Make sure this path is correct
import storage from '../utils/storage';

interface User {
  id: string;
  name: string;
  email: string;
  rfid?: string;
  bill?: any;
}

interface UserState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  balance: number;
  prescriptions: any[];
  bill: any;
  
  
  // Actions
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  fetchUserProfile: (rfid: string) => Promise<void>;
  scanRFIDCard: (rfidData: string) => Promise<void>;
  getUserBalance: (rfid: string) => Promise<void>;
  getUserPrescriptions: (rfid: string) => Promise<void>;
}

const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      isLoading: false,
      error: null,
      isAuthenticated: false,
      balance: 0,
      prescriptions: [],
      bill: null,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setLoading: (loading) => set({ isLoading: loading }),
      setError: (error) => set({ error }),

      login: async (email, password) => {
        try {
          set({ isLoading: true, error: null });
          
          // Check if apiService exists and has login method
          if (!apiService || typeof apiService.login !== 'function') {
            throw new Error('API Service not properly initialized');
          }
          
          const response = await apiService.login(email, password);
          
          // Store auth token
          await storage.setItem('authToken', response.token);
          
          // Update user state
          set({
            user: response.user,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error: any) {
          set({
            error: error.message || error.response?.data?.message || 'Login failed',
            isLoading: false,
          });
          throw error;
        }
      },

      logout: async () => {
        try {
          await storage.removeItem('authToken');
          set({
            user: null,
            isAuthenticated: false,
            error: null,
          });
        } catch (error) {
          console.error('Logout error:', error);
        }
      },

      fetchUserProfile: async (rfid: string) => {
        try {
          set({ isLoading: true, error: null, isAuthenticated: false, user: null });
          const userData = await apiService.getUserProfile(rfid);
          console.log('User Data:', userData);
          set({
            user: userData,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error: any) {
          console.log('Error fetching profile:', error);
          set({
            error: error.response?.data?.message || 'Failed to fetch profile',
            isLoading: false,
            isAuthenticated: false,
            user: null,
          });
        }
      },

      getUserBalance: async (rfid: string) => {
        try {
          set({ isLoading: true, error: null });
          const balance = await apiService.getUserBalance(rfid);
          set({
            balance: balance,
            isLoading: false,
          });
        } catch (error: any) {
          set({
            error: error.response?.data?.message || 'Failed to fetch  balance',
            isLoading: false,
            balance: 0,
          });
          throw error;
        }
      },
      getUserPrescriptions: async (rfid: string) => {
        try {
          set({ isLoading: true, error: null });
          const prescriptions = await apiService.getUserPrescriptions(rfid);
          set({
            prescriptions: prescriptions,
            isLoading: false,
          });
        } catch (error: any) {
          set({
            error: error.response?.data?.message || 'Failed to fetch prescriptions',
            isLoading: false,
            prescriptions: [],
          });
          throw error;
        }
      },
      
      getViewBill: async (rfid: string) => {
        try {
          set({ isLoading: true, error: null });
          
          const billData = await apiService.getViewBill(rfid);
          
          set({
            bill: billData,
            isLoading: false,
          });
          
          return billData;
        } catch (error: any) {
          set({
            error: error.response?.data?.message || 'Failed to fetch bill',
            isLoading: false,
            bill: null,
          });
          throw error;
        }
      },
      
      scanRFIDCard: async (rfidData: string) => {
        try {
          set({ isLoading: true, error: null });
          
          const response = await apiService.scanRFID(rfidData);
          
          // Update user with RFID data
          const currentUser = get().user;
          if (currentUser) {
            set({
              user: { ...currentUser, rfid: response.rfidCard },
              isLoading: false,
            });
          }
        } catch (error: any) {
          set({
            error: error.response?.data?.message || 'RFID scan failed',
            isLoading: false,
          });
          throw error;
        }
      },
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
);

export default useUserStore;