import { flow, types } from 'mobx-state-tree';
//const axios = require('axios')
import AsyncStorage from '@react-native-async-storage/async-storage';

import { customerProviderApi } from '../api/Api'
import { NavigationService } from '../api/NavigationService';

const TOKEN_KEY = '@instore/token'

const UserInfo = types.model('UserInfo', {
    id: types.number,
    first_name: types.string,
    last_name: types.string,
    avatarUrl: types.maybe(types.string)
})

export const CurrentUser = types.model('CurrentUser', {
    authToken: types.maybe(types.string),
    info: types.maybe(UserInfo)
}).actions(self => ({
    setUpAuth: flow(function*() {
        const b = yield self.getAuthToken();
        console.log('b', b)
       if(b === false) return b
        const c = yield self.getUserInfo();
         return c
    }),
    getAuthToken: flow(function*() {
        console.log('we live !')
        try {
            const token  = yield AsyncStorage.getItem(TOKEN_KEY)
            console.log('token', token)
            if (token) {
                self.authToken = token
            } else {
                return false
            }
        } catch (error) {
            console.log('error', error)
            return false
        }
    }),
    saveToken: flow(function*(token) {
        try {
            yield AsyncStorage.setItem(TOKEN_KEY, token)
        } catch (error) {
            console.log('error', error)
        }
    }),
    loginProvider: flow(function*(providerToken, provider) {
        console.log(providerToken, provider)
        try {
            console.log('was hit')
           
            const res = yield customerProviderApi.url('/login/provider').post({ 
                token: providerToken,
                provider
             }).json();
             if(res.token){
                 self.authToken = res.token.token;
                 console.log('token', self.authToken)
                 yield self.saveToken(res.token.token)
                 self.info = res.data
                 console.log('data', self.info)
                 return true
             }
        } catch (error) {
           console.log('error', error)
           return false
        }
    }),
    login: flow(function*(email, password) {
        try {
            console.log('flows')
            const res = yield customerProviderApi.url('/login')
                                .post({
                                    email,
                                    password
                                }).json()
                    if (res.token) {
                        self.authToken = res.token.token;
                 console.log('token', self.authToken)
                 yield self.saveToken(res.token.token)
                 self.info = res.data
                 console.log('data', self.info)
                 return true
                    }
        } catch (error) {
            console.log('error', error)
            return false
        }
    }),
    register: flow(function*(email, firstName, lastName, password) {
        try {
            const res = yield customerProviderApi.url('/register')
                                .post({
                                    email,
                                    firstName,
                                    lastName,
                                    password
                                }).json()
                if (res.token) {
                    self.authToken = res.token.token;
                    console.log('token', self.authToken)
                    yield self.saveToken(res.token.token)
                    self.info = res.data
                    console.log('data', self.info)
                    return true
                        }
        } catch (error) {
            console.log('error', error)
            return false
        }
    }),
    getUserInfo: flow(function*() {
        try {
            if (self.authToken) {
                const res = yield customerProviderApi.url('/dashboard')
                    .headers({Authorization: `Bearer ${self.authToken}`})
                    .get()
                    .json()

                console.log('result', res.data)
                if (res.data){
                    self.info = res.data
                    return true
                } else {
                    return false
                    
                }
                
            }
        } catch (error) {
            console.log('erro', error)
            return false
        }
    })
}))