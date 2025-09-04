// hooks/useLogout.ts
import { useState } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import useUserStore from '../store/userStore';

export const useLogout = () => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigation = useNavigation<any>();
  const { logout, setUser } = useUserStore();

  const performLogout = async () => {
    try {
      setIsLoggingOut(true);

      // Call logout from store
      await logout();

      // Clear user data
      setUser(null);

      // Navigate to Start screen and reset navigation stack
      navigation.reset({
        index: 0,
        routes: [{ name: 'Start' }],
      });
    } catch (error) {
      console.error('Logout error:', error);
      Alert.alert('Error', 'Failed to logout. Please try again.');
    } finally {
      setIsLoggingOut(false);
    }
  };

  return {
    performLogout,
    isLoggingOut,
  };
};
