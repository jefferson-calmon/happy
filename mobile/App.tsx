import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useFonts } from 'expo-font';
import { AppLoading } from 'expo';
import { 
  Nunito_600SemiBold, 
  Nunito_700Bold, 
  Nunito_800ExtraBold 
} from '@expo-google-fonts/nunito';

import Routes from './src/routes';


const App = () => {
  const [ fontsLoaded ] = useFonts({
    Nunito_600SemiBold, 
    Nunito_700Bold, 
    Nunito_800ExtraBold 
  });

  if (!fontsLoaded){
    return <AppLoading />;
  }

  return <Routes />
};

export default App;
