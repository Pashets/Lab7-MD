import React from 'react';

import Account from "../screens/Account";
import Diagram from "../screens/Diagram";
import Book from "../screens/Book";
import Picture from "../screens/Picture";

import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Create from "../modules/Create";
import Details from "../modules/Details";

import { styleConfig } from "../style";

const Stack = createStackNavigator();


const bookStackNavigator = () => {
    return(
        <Stack.Navigator initialRouteName="Book">
            <Stack.Screen 
                name="Book"
                component={Book}
                options={{ ...styleConfig, title: 'Мої книжки' }}
            />
            <Stack.Screen 
                name="Create"
                component={Create}
                options={{ ...styleConfig, title: 'Створити книгу' }}
            />
            <Stack.Screen 
                name="Details"
                component={Details}
                options={{ ...styleConfig, title: 'Детальніше' }}
            />
        </Stack.Navigator>
    )
}

const galleryStackNavigator = () => {
    return(
        <Stack.Navigator initialRouteName="Picture">
            <Stack.Screen
                name="Picture"
                component={Picture}
                options={{ ...styleConfig, title: 'Картинки' }}
            />
        </Stack.Navigator>
    )
}

const creatorStackNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="Account">
            <Stack.Screen
                name="Account"
                component={Account}
                options={{ ...styleConfig, title: 'Моя Заліковка' }}
            />
        </Stack.Navigator>
    )
}


const diagramStackNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="Diagram">
            <Stack.Screen
                name="Diagram"
                component={Diagram}
                options={{ ...styleConfig, title: 'Рисунки' }}
            />
        </Stack.Navigator>
    )
}



const Tab = createBottomTabNavigator();

export default function RootNavigator() {
    return (
        <Tab.Navigator
            tabBarOptions={{ 
                labelStyle: { paddingBottom: 5 }, 
                style: { borderTopColor: styleConfig.footerStyle.shadowColor},
                activeTintColor: '#000',
                    activeBackgroundColor: styleConfig.footerStyle.backgroundColor,
                    inactiveBackgroundColor: styleConfig.footerStyle.backgroundColor }}>

            <Tab.Screen
                name="General"
                component={creatorStackNavigator}
                options={{
                    tabBarLabel: 'Заліковка',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="account-outline" color={color} size={size} />
                    ),
                }}
            />

            <Tab.Screen
                name="Diagrams"
                component={diagramStackNavigator}
                options={{
                    tabBarLabel: 'Рисунки',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="chart-scatter-plot" color={color} size={size} />
                    ),
                }}
            />

            <Tab.Screen
                name="Book"
                component={bookStackNavigator}
                options={{
                    tabBarLabel: 'Мої книжки',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="book" color={color} size={size} />
                    ),
                }}
            />

            <Tab.Screen
                name="Gallery"
                component={galleryStackNavigator}
                options={{
                    tabBarLabel: 'Картинки',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="image-filter-hdr" color={color} size={size} />
                    ),
                }}

            />
        </Tab.Navigator>
    );
}
