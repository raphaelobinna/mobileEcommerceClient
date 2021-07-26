import * as React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Box } from 'react-native-design-utility';
import { RED } from '../constants/colors';
import { tabBarIcons } from '../constants/images';

export const TabBar = ({ route, focused, size, navigation }) => {

    const handlePress = () => {
        navigation.navigate('Tab', {screen: route})
    }

    const icon = tabBarIcons[focused ? 'active' : 'inactive'][route]

    return (
        <Box f={1} pt={10} center >
            <TouchableOpacity onPress={handlePress} >
            <Box mb={10} >
                <Image source={icon} />
            </Box>
            </TouchableOpacity>
        </Box>
    )
};
