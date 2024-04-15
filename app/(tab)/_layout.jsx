import { AntDesign, Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';
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
        tabBarItemStyle: {
          height: 50,
          alignSelf: 'center'
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
        headerTitle: () => (
          <View className='flex-row gap-0 w-96'>
            <Text style={{ fontFamily: 'passionOneRegular' }} className='text-5xl text-white'>News</Text>
            <Text style={{ fontFamily: 'passionOneRegular' }} className='text-5xl'>Wave</Text>
          </View>
        ),
        tabBarLabel: "Home",
        tabBarIcon: ({ color }) => <Ionicons name="home" size={28} color={color} />
      }} />

      <Tabs.Screen name='topics' options={{
        title: "My Topics",
        tabBarIcon: ({ color }) => <AntDesign name="appstore1" size={28} color={color} />,
        headerRight: () => (
          <View className='mr-8'>
            <Ionicons name="search" size={28} color="white" />
          </View>
        )
      }} />

      <Tabs.Screen name='explore' options={{
        title: "Explore",
        tabBarIcon: ({ color }) => <Ionicons name="earth" size={28} color={color} />
      }} />

      <Tabs.Screen name='profile' options={{
        title: "Profile",
        tabBarIcon: ({ color }) => <Ionicons name="person-sharp" size={28} color={color} />
      }} />

    </Tabs>
  )
}