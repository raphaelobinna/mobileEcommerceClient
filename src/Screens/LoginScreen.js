import React, {useState, useEffect, useRef} from 'react';
import { Alert, TouchableOpacity, StyleSheet, Animated, View, ScrollView } from 'react-native';
import { Box, Text } from 'react-native-design-utility';
import { ActivityIndicator } from 'react-native'
import { FacebookApi } from '../api/Facebook';
import { GoogleApi } from '../api/Google';
import { LoginButton } from '../commons/LoginButton';
import { InputText } from '../commons/InputText';
import { OnBoardingLogo } from '../commons/OnBoardingLogo';
import { LIGHT_GRAY, BLUE, LIGHT_GREEN } from '../constants/colors';
import { SolidPillButton } from '../commons/SolidPillButton';
import { PaperBoardLayout } from '../commons/PaperBoardLayout';
import { store } from '../models'
import { getStore } from "mobx-store-provider";
import AsyncStorage from '@react-native-async-storage/async-storage';

const BoxAnimated = Animated.createAnimatedComponent(Box)

const logger = async({navigation}) => {
  console.log('running')
   const logger = await AsyncStorage.getItem('@Logged_in')
  console.log('logger', logger)
  if(logger === 'false') navigation.navigate('Auth')
}
logger()


export const LoginScreen = ({ navigation }) => {

    const Store = getStore(store)
    
    // console.log('props', Store.currentUser)

   

    const animatedValue = useRef(new Animated.Value(0.0)).current; 

    const [input, setInput] = React.useState({email:"", password:""});
    const [isLoading, setLoading] = useState(false)
    const [opacity, setOpacity]= useState(animatedValue)
    const [position, setPosition]= useState(animatedValue)

    useEffect(() => {
      Animated.parallel([opacityAnim(), positionAnim()])
  }, [isLoading]) 

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
            const result = await Store.currentUser.loginProvider(token, 'GOOGLE')
            if (result === true) {
              navigation.navigate('Main')
            }
            
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

    const onLogInPress = async () => {
      try {
        console.log('started', input.password)
        setLoading(true)
        const result = await Store.currentUser.login(input.email, input.password)
        if (result === true) navigation.navigate('Tab', { screen: 'Home' })

        console.log('result', result)
        if (result === false) {
          setLoading(false)
          await AsyncStorage.setItem('@Logged_in', 'true')
        }
      } catch (error) {
        console.log('error', error)
      }
    }

    const logoTranslate = position.interpolate({
        inputRange: [0, 1],
        outputRange: [150, 0]
    })

    if (isLoading) {
      return (
        <Box f={1} center bg="white">
          <ActivityIndicator size="large" color="#00ff00" />
        </Box>
      )
    } else {
      return (
        <ScrollView>
        <PaperBoardLayout navigation={navigation}>
        <ScrollView style={styles.section} >

            <BoxAnimated style={{ flex: 1, transform: [{ translateY: logoTranslate }] }} >
            <Box f={1} center >
            <OnBoardingLogo />
            </Box>
            </BoxAnimated>

            <BoxAnimated style={{ flex: 0.9, width: '100%' }} opacity={opacity} > 
                <LoginButton onPress={onGooglePress}type="google" >Continue with Google</LoginButton>
                <LoginButton onPress={onFaceBookPress} type="facebook" >Continue with FaceBook</LoginButton>
            </BoxAnimated>

            <View style={[styles.article,styles.mark]}>
          <View style={styles.hr}></View>
          <Text style={styles.ht}>{'OR'}</Text>
          <View style={styles.hr}></View>
        </View>

        <View style={styles.article}>
          <InputText label={'Enter your email address'} returnInput={(value)=>setInput({...input,email:value.toLowerCase().split(' ').join('')})}></InputText>
        </View>

        <View style={styles.article}>
          <InputText label={'Password'} secureTextEntry={true} returnInput={(value)=>setInput({...input,password:value})}></InputText>
        </View>

        <TouchableOpacity style={styles.forgotPassword} onPress={()=>{}}>
          <Text style={styles.colorGreen}>{'Forgot your password?'}</Text>
        </TouchableOpacity>

        <View style={styles.article}>
          <SolidPillButton title={'Log In'} onPress={onLogInPress}></SolidPillButton>
        </View>

        <TouchableOpacity style={[styles.article,styles.alignSelfCenter]} onPress={()=> navigation.navigate('Register')}>
          <Text style={styles.bottomText}>{'Create Account'}</Text>
        </TouchableOpacity>

       

        </ScrollView>
       </PaperBoardLayout>
       </ScrollView>
    )
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
    mark:{
      flexDirection:'row',
      justifyContent:'center',
      marginLeft:'8%',
      marginRight:'8%',
    },
    hr:{
      height:1,
      width:'50%',
      backgroundColor:LIGHT_GRAY,
      alignSelf:'center'
    },
    ht:{
      color:LIGHT_GRAY,
      paddingRight:10,
      paddingLeft:10,
    },
    colorGreen:{
      color:LIGHT_GREEN
    },
    alignSelfCenter:{
      alignSelf:'center'
    },
    forgotPassword:{
      alignSelf:'flex-end',
      marginBottom:'3%',
      marginRight:'10%'
    },
    bottomText: {
        marginBottom:'30%',
        color:LIGHT_GREEN
    }
  });