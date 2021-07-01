import * as Facebook from 'expo-facebook';
import { Alert } from 'react-native';

async function loginAsync() {
    try {
      await Facebook.initializeAsync({
        appId: '840340706832943',
        appName: 'EcommerceStore'
      });
      const {
        type,
        token,
        expirationDate,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile'],
      });
      console.log('token', token)
      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
        Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);
        return token
      } else {
        console.log('it failed')
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  }

export const FacebookApi = {
    loginAsync
}