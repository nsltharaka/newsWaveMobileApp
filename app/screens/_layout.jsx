import { Stack } from 'expo-router'
import React from 'react'
import Colors from '../../constants/Colors'

export default function _layout() {
    return (
        <Stack screenOptions={{
            headerTitleStyle: {
                fontWeight: 'bold'
            },
            headerTintColor: 'white',
            headerStyle: {
                backgroundColor: Colors.palette.redl2,
            }
        }}>
            <Stack.Screen name='addTopic' options={{
                headerTitle: "Add Topic",
            }} />
        </Stack>
    )
}