import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { ActivityIndicator } from 'react-native'
import { UtilityThemeProvider, Box, Text } from 'react-native-design-utility'
import {Navigation} from './src/Screens/index'
import { images, tabBarIcons } from './src/constants/images'
import { cacheImages } from './src/utils/CacheImages'
import { theme } from './src/constants/theme'
import { useProvider, useCreateStore } from "mobx-store-provider";
import { store } from './src/models';


export default function App() {

  const [isReady, setReady] = useState(false)

  useEffect(() => {
    cacheAssets()
}, [])

const cacheAssets = async() => {
   const imageAssets = cacheImages([
     ...Object.values(images),
     ...Object.values(tabBarIcons.active),
     ...Object.values(tabBarIcons.inactive)
   ])

   await Promise.all([...imageAssets])

   setReady(true)
}
 // Create the AppStore instance
 //const appStore = useCreateStore(store, {user: 'Jonathan'});

 // Get the Provider for the AppStore
 const Provider = useProvider(store);

  if(!isReady) {
    return (
      <Box f={1} center bg="white">
        <ActivityIndicator size="large" color="#00ff00" />
      </Box>
    )
  }else {
    return (
      <Provider value={store}>
        <UtilityThemeProvider theme={theme}>
          <Navigation/>
        </UtilityThemeProvider> 
      </Provider>
      
    );
  } 
  
}