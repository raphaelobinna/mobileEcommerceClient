import * as Google from 'expo-google-app-auth';
import * as Linking from 'expo-linking';

const config = {
  expoClientId: `<YOUR_WEB_CLIENT_ID>`,
  androidClientId: `965435042329-3bq03iv4b6sjamhqe4bu546sp87uh9nf.apps.googleusercontent.com`,
  scopes: ['profile', 'email'],
  //redirectUrl: Linking.createURL('/api/oauth2callback'),
};

async function GloginAsync() {
    console.log('nose')
    try {
        const { type, accessToken } = await Google.logInAsync(config);

        if (type === 'success') {
                let userInfoResponse = await fetch('https://www.googleapis.com/userinfo/v2/me', {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            console.log('Info', userInfoResponse)
            return accessToken
            
        } else {
            console.log('It failed')
        }
    } catch (error) {
        console.log(error)
    }
}

export const GoogleApi = {
    GloginAsync
}