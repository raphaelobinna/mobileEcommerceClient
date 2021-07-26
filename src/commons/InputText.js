import * as React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, TextInput, Text, View } from 'react-native';
import {LIGHT_GRAY, GRAY, WHITE, BLACK} from '../constants/colors';

export const InputText = ({style={}, label, secureTextEntry, preInput='', returnInput, reference}) => {
    const [input, setInput] = React.useState(preInput);
    const ref = React.useRef(null);

    return (
        <View>
            {label && <Text style={[styles.label, style.label]}>{label ?? null}</Text>}
            <View style={[styles.inputFence, style.inputFence]}>
                <TextInput 
                    ref={reference ?? ref}
                    secureTextEntry={secureTextEntry??false}
                    style={[styles.input, style.input]}
                    defaultValue={input} 
                    onChangeText={(value)=>{setInput(value); returnInput(value)}}
                    autoCapitalize='none'
                />
            </View>
        </View>
    );
};

// PropTypes
InputText.propTypes = {
    label:PropTypes.string,
    secureTextEntry:PropTypes.bool,
    returnInput:PropTypes.func.isRequired
}

const styles = StyleSheet.create({
    inputFence:{
        marginLeft:'8%',
        marginRight:'8%',
        padding:'2%',
        borderWidth: 1,
        borderRadius:90,
        borderColor:LIGHT_GRAY,
        backgroundColor:WHITE,
    },
    input:{
        width:'90%',
        color:BLACK,
        paddingLeft:'3%',
        paddingRight:'3%',
    },
    label:{
        marginLeft:'8%',
        marginRight:'8%',
        marginBottom:'1%',
        color:GRAY
    }
});