//import { createStackNavigator, createSwitchNavigator, createBottomTabNavigator } from 'react-navigation-stack'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {LoginScreen} from './LoginScreen';
import {HomeScreen} from './HomeScreen';
import {SplashScreen} from './SplashScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();


// const AuthNavigator = createStackNavigator(
//     {
//         Login: {
//             screen: LoginScreen
//         }
//     }
// )

// const TabNavigator = createBottomTabNavigator(
//     {
//         Home: {
//             screen: HomeScreen
//         }
//     }
// )

// const MainNavigator = createStackNavigator(
//     {
//         Tab: TabNavigator
//     }
// )

// const AppNavigator = createSwitchNavigator(
//     {
//         Splash: {
//             screen: SplashScreen
//         },
//         Auth: AuthNavigator,
//         Main: MainNavigator
//     },
//     {
//         initialRouteName: 'Splash'
//     }
// );

export const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Splash"
                    component={SplashScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Auth"
                    component={LoginScreen}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}