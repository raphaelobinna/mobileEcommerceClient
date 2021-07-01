import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { ActivityIndicator } from 'react-native'
import { UtilityThemeProvider, Box, Text } from 'react-native-design-utility'
import {Navigation} from './src/Screens/index'
import { images } from './src/constants/images'
import { cacheImages } from './src/utils/CacheImages'
import { theme } from './src/constants/theme'

export default function App() {

  const [isReady, setReady] = useState(false)

  useEffect(() => {
    cacheAssets()
}, [])

const cacheAssets = async() => {
   const imageAssets = cacheImages(Object.values(images))

   await Promise.all([...imageAssets])

   setReady(true)
}

  if(!isReady) {
    return (
      <Box f={1} center bg="white">
        <ActivityIndicator size="large" color="#00ff00" />
      </Box>
    )
  }else {
    return (
      <UtilityThemeProvider theme={theme}>
       <Navigation/>
      </UtilityThemeProvider> 
      
    );
  } 
  
}