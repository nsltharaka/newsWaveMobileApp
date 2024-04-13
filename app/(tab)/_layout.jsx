import { AntDesign, Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import colors from '../../constants/Colors';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          height: 70,
          backgroundColor: 'black',
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: 'bold',
        },
        tabBarItemStyle : {
          height : 50,
          alignSelf :'center'
        },
        tabBarActiveTintColor: 'white',
        headerStyle: {
          backgroundColor: colors.palette.redl2,
          height: 100,
        },
        headerTitleStyle: {
          color: 'white',
          fontSize: 40,
          fontFamily: 'passionOneRegular',
        }
      }}
    >
      <Tabs.Screen name='index' options={{
        headerTitle: "NewsWave",
        tabBarLabel: "Home",
        tabBarIcon: ({ color }) => <Ionicons name="home" size={28} color={color} />
      }} />
      <Tabs.Screen name='topics' options={{
        // headerTitle: "My TOPICS",
        // tabBarLabel: 'My Topics',
        title : "My Topics",
        tabBarIcon: ({ color }) => <AntDesign name="appstore1" size={28} color={color} />
      }} />
      <Tabs.Screen name='explore' options={{
        title: "Explore",
        tabBarIcon: ({ color }) => <Ionicons name="search" size={28} color={color} />
      }} />
      <Tabs.Screen name='profile' options={{
        title: "Profile",
        tabBarIcon: ({ color }) => <Ionicons name="person-sharp" size={28} color={color} />
      }} />
    </Tabs>
  )
}