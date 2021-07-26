import * as React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { ORANGE, WHITE, GRAY, GREEN } from '../constants/colors';

export const SolidPillButton = ({style={}, onPress, title, children}) => {
    style = style ?? {};
    return (
        <TouchableOpacity 
            style={[styles.button, style.button]}
            onPress={onPress}>
            <View style={[styles.buttonChild, style.buttonChild]}>
                {children ?? null}
                <Text style={[styles.buttonText, style.buttonText]}>{title ?? 'Title'}</Text>
            </View>
        </TouchableOpacity>
    );s
};

const styles = StyleSheet.create({
    button:{
        elevation:5,
        alignSelf:'center',
        width:'85%',
        paddingTop:9,
        paddingBottom:9,
        backgroundColor:GREEN,
        borderRadius:30,
        borderColor: GRAY,
        shadowColor: GRAY
    },
    buttonChild:{
        flexDirection:'row',
        alignSelf:'center',
        alignContent:'center'
    },
    buttonText:{
        fontFamily:"Nunito_400Regular",
        fontSize: 19,
        color:WHITE,
        alignSelf:'center',
    }
});