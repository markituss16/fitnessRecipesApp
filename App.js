import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import HomeScreen from './src/screens/Home/HomeScreen';
import Search from './src/screens/Search/SearchScreen';
import IngredientsScreen from './src/screens/Ingredients/IngredientsScreen';
import ProfileScreen from './src/screens/Profile/ProfileScreen';
import RecipeScreen from './src/screens/Recipe/RecipeScreen';
import CreateTemplateScreen from './src/screens/CreateTemplate/CreateTemplateScreen';
import Signup from './src/screens/Signup/SignupScreen';
import Login from './src/screens/Login/LoginScreen';

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

function BottomNavigator() {
    return (
        <Tab.Navigator
            initialRouteName="Inici"
            activeColor="#ffffff"
            labelStyle={{ fontSize: 12 }}
            style={{ backgroundColor: 'tomato' }}
        >
            <Tab.Screen
                name="Inici"
                component={HomeScreen}
                options={{
                    tabBarColor: '#000000',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="home" color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="Buscar"
                component={Search}
                options={{
                    tabBarColor: '#000000',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="text-search" color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="Afegir"
                component={CreateTemplateScreen}
                options={{
                    tabBarColor: '#000000',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="plus-circle-outline" color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="Aliments"
                component={IngredientsScreen}
                options={{
                    tabBarColor: '#000000',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="food-variant" color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="Perfil"
                component={ProfileScreen}
                options={{
                    tabBarColor: '#000000',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="face-profile" color={color} size={26} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

function MainNavigator() {
    return (
        <Stack.Navigator 
            initialRouteName="Signup"
            screenOptions={{
                headerTitleAlign: 'center',
                headerStyle: {
                  backgroundColor: '#3740FE',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
            }}>
            <Stack.Screen
                name="Signup" 
                component={Signup} 
                options={{ title: 'Signup' }}
            />
            <Stack.Screen
                name="Login" 
                component={Login} 
                options={
                  {title: 'Login'},
                  {headerLeft: null} 
                }
            />
            <Stack.Screen
                name="MyFitnessRecipes"
                component={BottomNavigator}
                options={{
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    headerLeft: null,
                }}
            />
            <Stack.Screen
                name="Recipe"
                component={RecipeScreen}
                options={{
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }}
            />
        </Stack.Navigator>
    )
}

function App() {
    return (
        <NavigationContainer>
            <MainNavigator />
        </NavigationContainer>
    );
}

export default App;
