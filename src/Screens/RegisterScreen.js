import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { GREEN } from '../constants/colors';
import { PaperBoardLayout } from '../commons/PaperBoardLayout';
import { SolidPillButton } from '../commons/SolidPillButton';
import { InputText } from '../commons/InputText';
//import { setActivityNotificationAction } from "../../redux/actions/alertActions";
import { isEmpty, ucfirst } from '../helpers/helper';
import { Box } from 'react-native-design-utility';
import { ActivityIndicator } from 'react-native'

export const RegisterScreen = ({ navigation }) => {

  const [isLoading, setLoading] = useState(false)
  const [input, setInput] = React.useState({firstName:"", lastName:"", email:"", password:""});

  const validateInput = (input) => {
    for (const key in input) {
      if (isEmpty(input[key])) { 
        Alert.alert(
          "Info",
          `${ucfirst(key.replace('_id',''))} input can not be empty`,
          [
            // {
            //   text: "Cancel",
            //   onPress: () => console.log("Cancel Pressed"),
            //   style: "cancel"
            // },
            { text: "OK", onPress: () => console.log("OK Pressed") }
          ],
          { cancelable: false }
        );
    
        //return dispatch(setActivityNotificationAction({type:'info', message:`${ucfirst(key.replace('_id',''))} input can not be empty`})); 
      }
    }

    if (input.password.length < 6) {

      Alert.alert(
        "Info",
        'Password input is less than six characters',
        [
          // {
          //   text: "Cancel",
          //   onPress: () => console.log("Cancel Pressed"),
          //   style: "cancel"
          // },
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ],
        { cancelable: false }
      );

       //return dispatch(setActivityNotificationAction({type:'info', message:'Password input is less than six characters'})); 
      }

    //send the request to the server
    onSignUpPress(input)
  }

  const onSignUpPress = async (input) => {
    try {
      console.log('started', input.password)
      setLoading(true)
      const result = await Store.currentUser.register(input.email, input.firstName, input.lastName, input.password)
      if (result === true) navigation.navigate('Tab', { screen: 'Home' })
    } catch (error) {
      console.log('error', error)
    }
  }

  if (isLoading) {
    return (
      <Box f={1} center bg="white">
        <ActivityIndicator size="large" color="#00ff00" />
      </Box>
    )
  } else {
    return (
      <PaperBoardLayout navigation={navigation}>
        <ScrollView style={styles.section}>
  
          <View style={styles.article}>
            <InputText label={'Enter your first name'} returnInput={ (value)=>setInput({...input,firstName:value.toLowerCase().split(' ').join('')}) }></InputText>
          </View>
  
          <View style={styles.article}>
            <InputText label={'Enter your last name'} returnInput={ (value)=>setInput({...input,lastName:value.toLowerCase().split(' ').join('')}) }></InputText>
          </View>
  
          <View style={styles.article}>
            <InputText label={'Enter your email address'} returnInput={ (value)=>setInput({...input,email:value.toLowerCase().split(' ').join('')}) }></InputText>
          </View>
  
          <View style={styles.article}>
            <InputText label={'Password'} secureTextEntry={true} returnInput={ (value)=>setInput({...input,password:value}) }></InputText>
          </View>
  
          <View style={[styles.article, styles.marginTop30]}>
            <SolidPillButton title={'Sign Up'} onPress={() => validateInput(input)}></SolidPillButton>
          </View>
  
          <TouchableOpacity style={[styles.article,styles.alignSelfCenter]} onPress={() => navigation.goBack()}>
            <Text style={styles.colorGreen}>{'Go Back'}</Text>
          </TouchableOpacity>
  
        </ScrollView>
      </PaperBoardLayout>
    );
  }
};

const styles = StyleSheet.create({
  section:{
    flex:1,
  },
  article:{
    marginTop:'3%',
    marginBottom:'3%'
  },
  marginTop30:{
    marginTop:30
  },
  colorGreen:{
    color:GREEN
  },
  alignSelfCenter:{
    alignSelf:'center'
  }
});