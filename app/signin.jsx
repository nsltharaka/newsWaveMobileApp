import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../context/authContext';

export default function Signin() {

  const { promptAsync } = useAuth()

  return (
    <View className='flex-1 items-center justify-around'>

      <View style={{ width: 350, aspectRatio: 1 }}>
        <Image
          className='flex-1 w-full'
          source={require('../assets/images/login.png')}
        />
      </View>

      <View className='w-full p-8 gap-8 bg-orange'>
        <TouchableOpacity className='w-full h-16 rounded-full flex-row justify-center items-center relative bg-black' onPress={() => promptAsync()}>
          <Ionicons name="logo-google" size={24} color="white" className='absolute left-8' />
          <Text className='text-center font-medium text-xl text-white'>Continue with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity className='w-full h-16 rounded-full flex-row justify-center items-center relative bg-fb-blue'>
          <FontAwesome5 name="facebook-f" size={24} color="white" className='absolute left-9' />
          <Text className='text-white text-center font-medium text-xl font'>Continue with facebook</Text>
        </TouchableOpacity>

        <TouchableOpacity className='w-full h-16 rounded-full flex-row justify-center items-center relative bg-apple-gray'>
          <Ionicons name="logo-apple" size={28} color="black" className='absolute left-8' />
          <Text className='text-black text-center font-medium text-xl'>Continue with apple</Text>
        </TouchableOpacity>
      </View>

    </View>
  )
}