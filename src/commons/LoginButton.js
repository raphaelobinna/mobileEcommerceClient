import React from 'react'
import { Box, Text } from 'react-native-design-utility';
import { TouchableOpacity, Image } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'

import { images } from '../constants/images';
import { theme } from '../constants/theme';

const bgColor = type => {
    switch (type) {
        case 'google': 
            return 'googleBlue';
        case 'facebook':
            return 'faceBookBlue';
        default: 
            return 'white';
    }
}

export const LoginButton = ({children, type, onPress }) => (
    <TouchableOpacity onPress={onPress} >
                    <Box dir="row" align="center" shadow={1} bg={bgColor(type)} w="80%" self="center" p="xs" radius="xs" mb="sm" style={{position: 'relative'}}>
                        <Box mr="sm">
                            <Box bg="white" h={32} w={32} radius="xs" center > 
                                {type === 'google' && <Image source={images.googleColorIcon} />}
                                {type === 'facebook' && (<FontAwesome name="facebook" color={theme.color.faceBookBlue} size={30} style={{ position: 'absolute', bottom: -3}}/>)}
                            </Box>
                        </Box>
                        <Box>
                          <Text size="md" color="white" >{children}</Text>
                        </Box>
                        
                    </Box>
                </TouchableOpacity>
);