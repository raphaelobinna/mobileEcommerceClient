import React, { useEffect } from 'react';
import { Box, Text } from 'react-native-design-utility'
import { store } from '../models'
import { getStore } from "mobx-store-provider";

import { OnBoardingLogo } from '../commons/OnBoardingLogo';


export const SplashScreen = ({navigation}) => {

    const Store = getStore(store)

    useEffect(() => {
        checkAuth()
    }, [])

    const checkAuth = async () => {
        const checker = await Store.currentUser.setUpAuth()
        if (checker === false) {
            navigation.navigate('Auth')
        } else if (checker === true) {
            navigation.navigate('Tab', { screen: 'Home' })
        }
        // setTimeout(() => {
        //     navigation.navigate('Auth')
        // }, 2000)
    }

    return (
        <Box f={1} center>
            <OnBoardingLogo />
        </Box>
    )
}