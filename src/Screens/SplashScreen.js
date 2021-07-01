import React, { useEffect } from 'react';
import { Box, Text } from 'react-native-design-utility'

import { OnBoardingLogo } from '../commons/OnBoardingLogo';


export const SplashScreen = ({navigation}) => {

    useEffect(() => {
        checkAuth()
    }, [])

    const checkAuth = () => {
        setTimeout(() => {
            navigation.navigate('Auth')
        }, 2000)
    }

    return (
        <Box f={1} center>
            <OnBoardingLogo />
        </Box>
    )
}