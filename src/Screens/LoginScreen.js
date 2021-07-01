import React, {useState, useEffect, useRef} from 'react';
import { Alert, TouchableOpacity, Animated } from 'react-native';
import { Box, Text } from 'react-native-design-utility'
import { FacebookApi } from '../api/Facebook';
import { GoogleApi } from '../api/Google';
import { LoginButton } from '../commons/LoginButton';
import { OnBoardingLogo } from '../commons/OnBoardingLogo';

const BoxAnimated = Animated.createAnimatedComponent(Box)


export const LoginScreen = () => {

    useEffect(() => {
        Animated.parallel([opacityAnim(), positionAnim()])
        
    }, [])

    const animatedValue = useRef(new Animated.Value(0.0)).current; 


    const [opacity, setOpacity]= useState(animatedValue)
    const [position, setPosition]= useState(animatedValue)

    const opacityAnim = () => {
         Animated.timing(opacity, {
             toValue: 1,
             duration: 200,
             delay: 100,
             useNativeDriver: true
         }).start()
    }

    const positionAnim = () => {
        Animated.timing(opacity, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true
        }).start()
   }

    const onGooglePress = async () => {
        try {
            const token = await GoogleApi.GloginAsync()

            console.log('token', token)
        } catch (error) {
            console.log('error', error)
        }
    }

    const onFaceBookPress = async () => {
       
        try {
            const token = await FacebookApi.loginAsync()

            console.log('token', token)
        } catch (error) {
            console.log('error', error)
        }
    }

    const logoTranslate = position.interpolate({
        inputRange: [0, 1],
        outputRange: [150, 0]
    })

    return (
        <Box f={1} center>
            <BoxAnimated style={{ flex: 1, transform: [{ translateY: logoTranslate }] }} >
            <Box f={1} center >
            <OnBoardingLogo />
            </Box>
            </BoxAnimated>

            <BoxAnimated style={{ flex: 0.9, width: '100%' }} opacity={opacity} > 
                <LoginButton onPress={onGooglePress}type="google" >Continue with Google</LoginButton>
                <LoginButton onPress={onFaceBookPress} type="facebook" >Continue with FaceBook</LoginButton>
            </BoxAnimated>
        </Box>
    )
}