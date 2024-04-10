import { Tabs } from 'expo-router'
import React from 'react'

export default function TabLayout() {
  return (
    <Tabs>
        <Tabs.Screen name='index' options={{
            tabBarLabel : "Home"
        }}/>
        <Tabs.Screen name='topics' options={{
            tabBarLabel : "My Topics"
        }}/>
        <Tabs.Screen name='explore' options={{
            tabBarLabel : "Explore"
        }}/>
    </Tabs>
  )
}