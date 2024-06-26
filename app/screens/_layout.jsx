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
            },
        }}>
            <Stack.Screen name='editTopic' options={{
                headerTitle: "Edit Topic",
            }} />

            <Stack.Screen name='[topicId]' />

            <Stack.Screen name='search' />
        </Stack>
    )
}