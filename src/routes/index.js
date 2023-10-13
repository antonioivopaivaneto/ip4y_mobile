import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import List from './../pages/List.js'


const Stack = createNativeStackNavigator();


export function AppRoutes(){
    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName="List" >
                <Stack.Screen name="List" component={List} />

            </Stack.Navigator>
        </NavigationContainer>
    )
}