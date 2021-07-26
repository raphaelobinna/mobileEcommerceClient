//import { createStackNavigator, createSwitchNavigator, createBottomTabNavigator } from 'react-navigation-stack'
import React, {useEffect} from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, HeaderBackground } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {LoginScreen} from './LoginScreen';
import {HomeScreen} from './HomeScreen';
import {SplashScreen} from './SplashScreen';
import { navigationRef } from '../api/NavigationService'
import { RegisterScreen } from './RegisterScreen';
import { OrderScreen } from './OrderScreen';
import { ListScreen } from './ListScreen';
import { StoreScreen } from './StoreScreen';
import { LIGHT_GRAY, BLUE, LIGHT_GREEN, GREEN, GRAY } from '../constants/colors';

import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { tabBarIcons } from '../constants/images';
import { TabBar } from '../commons/TabBar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Nunito_700Bold } from '@expo-google-fonts/nunito';
import { store } from '../models'
import { getStore } from "mobx-store-provider";

function getHeaderTitle(route) {
  // If the focused route is not found, we need to assume it's the initial screen
  // This can happen during if there hasn't been any navigation inside the screen
  // In our case, it's "Feed" as that's the first screen inside the navigator
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home';

  switch (routeName) {
    case 'Home':
      return 'Home';
    case 'List':
      return 'List';
    case 'Order':
      return 'Order';
    case 'Stores':
      return 'Stores';
  }
}

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();


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
  const Store = getStore(store)

  useEffect(() => {
    checkAuth()
}, [])

  const checkAuth = async () => {
    console.log('hit tos')
    const checker = await Store.currentUser.setUpAuth()
    if (checker === false) {
      console.log('good')
        await AsyncStorage.setItem('@Logged_in', 'false')
    } else if (checker === true) {
      console.log('bad')
        await AsyncStorage.setItem('@Logged_in', 'true')
    }
    // setTimeout(() => {
    //     navigation.navigate('Auth')
    // }, 2000)
  }


    function MyTabs({navigation, route}) {

        React.useLayoutEffect(() => {
            navigation.setOptions({ headerTitle: getHeaderTitle(route), 
                headerStyle: {
                    backgroundColor: GREEN,
                  },
                  headerTintColor: '#fff',
                  headerTitleStyle: {
                    fontWeight: 'bold',
                    alignSelf: 'center',
                    flex: 1,
                    marginRight: '15%',
                    color: '#98FB98'
                  }
            });
          }, [navigation, route]);

        return (
          <Tab.Navigator initialRouteName="Tab"
          tabBarOptions={{
            activeTintColor: LIGHT_GREEN,
            inactiveTintColor: GRAY,
            labelStyle: {
              fontWeight: 'bold',
              marginBottom: '5%'
            }
          }}
          screenOptions={({ route, navigation }) => ({
            tabBarIcon: ({ focused, color, size }) => (
              <TabBar navigation={navigation} route={route.name} focused={focused} size={size} />
            )
          })}
          >
            <Tab.Screen 
                name="Home" 
                component={HomeScreen}
            />
            <Tab.Screen 
                name="Order"
                 component={OrderScreen}
            />
            <Tab.Screen 
                name="List" 
                component={ListScreen}
            />
            <Tab.Screen 
                name="Stores" 
                component={StoreScreen}
            />
          </Tab.Navigator>
        );
      }

    return (
        <NavigationContainer ref={navigationRef} >
            <Stack.Navigator>
                <Stack.Screen
                    name="Splash"
                    component={SplashScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Auth"
                    component={LoginScreen}
                    options={{ title: 'Login' }}
                />
                <Stack.Screen
                    name="Register"
                    component={RegisterScreen}
                    options={{ title: 'Register' }}
                />
                <Stack.Screen
                    name="Tab"
                    component={MyTabs}
                    options={({ route }) => ({
                        headerTitle: getHeaderTitle(route),
                      })}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}