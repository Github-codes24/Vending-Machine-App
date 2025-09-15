import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import MainStack from './MainStack';
import NavigationService from './NavigationService';
import useLanguageStore from '../store/languageStore';

const Routes = () => {
  const { initializeLanguage, currentLanguage } = useLanguageStore();
  useEffect(() => {
    initializeLanguage();
  }, []);

  return (
    <NavigationContainer
      // key={currentLanguage}
      ref={navigatorRef => {
        NavigationService.setTopLevelNavigator(navigatorRef);
      }}
    >
      <MainStack />
    </NavigationContainer>
  );
};

export default Routes;
