import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { CrearIncidencia } from '../screens/CrearIncidencia/CrearIncidencia';
import { VerIncidencias } from '../screens/VerIncidencias/VerIncidencias';
import { Notificaciones } from '../screens/Notificaciones/Notificaciones';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';


const Tab = createMaterialBottomTabNavigator();

export const MainStack= () =>{

    return(
        <NavigationContainer>
            <Tab.Navigator
                   initialRouteName="CrearIncidencia"
                   activeColor="#fa154b"
                   labelStyle={{ fontSize: 12 }}
                   style={{ backgroundColor: 'tomato' }}
                    >
                <Tab.Screen
                    name='Crear_Incidencia'
                    component={CrearIncidencia}
                    options={{
                        tabBarLabel: 'Menu',
                        tabBarIcon: ({ color }) => (
                          <MaterialIcon name="public" color={color} size={26} />
                        ),
                      }}
                />
                
                <Tab.Screen
                    name='Ver_Incidencias'
                    component={VerIncidencias}
                    options={{
                        tabBarLabel: 'Incidencias',
                        tabBarIcon: ({ color }) => (
                          <MaterialIcon name="assignment" color={color} size={26} />
                        ),
                      }}
                            />
                
                <Tab.Screen
                    name='Notificaciones'
                    component={Notificaciones}
                    options={{
                        tabBarLabel: 'Notificaciones',
                        tabBarIcon: ({ color }) => (
                          <MaterialIcon name="notifications" color={color} size={26} />
                        ),
                      }}
                            />
            </Tab.Navigator>
        </NavigationContainer>
    )
}