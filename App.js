import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'; 
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NavigationContainer, StackActions } from '@react-navigation/native'; 
import HomeScreen from './src/screens/Home/HomeScreen';
import Search from './src/screens/Search/SearchScreen';
import IngredientsScreen from './src/screens/Ingredients/IngredientsScreen';
//import RecipeScreen from './src/screens/Recipe/RecipeScreen';

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

function App() {
  return (
  <NavigationContainer>
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
        component={Search}
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
        component={Search}
            options={{
                tabBarColor: '#000000',
                tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="face-profile" color={color} size={26} />
                ),
            }}
        />
    </Tab.Navigator>
    
  </NavigationContainer>  
  );
}

export default App;
