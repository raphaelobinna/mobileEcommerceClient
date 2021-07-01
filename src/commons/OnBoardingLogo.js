import React from 'react';
import { Box, Text } from 'react-native-design-utility';
import { Image } from 'react-native'
import { images } from '../constants/images'

export const OnBoardingLogo = () => (
    <Box center>
    <Box mb="sm" f={1} center>
        <Image source={images.logo} />
       <Box mb="sm">
       <Text size="2xl" >In<Text color="green" size="2xl" >Store</Text></Text>
       </Box>
        <Text size="sm">easy grocery shopping</Text>
    </Box>
</Box>
)