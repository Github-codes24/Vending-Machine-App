import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Strings from '../constants/Strings';

interface LanguageStore {
  currentLanguage: string;
  isLoading: boolean;
  
  // Actions
  initializeLanguage: () => Promise<void>;
  changeLanguage: (language: string) => Promise<void>;
}

const useLanguageStore = create<LanguageStore>((set) => ({
  currentLanguage: 'en',
  isLoading: true,

  initializeLanguage: async () => {
    try {
      const savedLanguage = await AsyncStorage.getItem('selectedLanguage');
      if (savedLanguage) {
        Strings.setLanguage(savedLanguage);
        set({ currentLanguage: savedLanguage, isLoading: false });
      } else {
        set({ isLoading: false });
      }
    } catch (error) {
      console.error('Error loading language:', error);
      set({ isLoading: false });
    }
  },

  changeLanguage: async (language: string) => {
    try {
      await AsyncStorage.setItem('selectedLanguage', language);
      Strings.setLanguage(language);
      set({ currentLanguage: language });
    } catch (error) {
      console.error('Error saving language:', error);
    }
  },
}));

export default useLanguageStore;