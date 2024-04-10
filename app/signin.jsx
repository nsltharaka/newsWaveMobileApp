import { View, Text, TouchableOpacity } from 'react-native'
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import React from 'react'

export default function Signin() {

  const blurhash =
    '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj['

  return (
    <View className='flex-1 flex-col justify-center items-center px-8 gap-5'>

      <TouchableOpacity className='w-full h-16 rounded-full border flex-row justify-center items-center relative bg-black'>
        <Ionicons name="logo-google" size={24} color="white" className='absolute left-8' />
        <Text className='text-center font-medium text-xl text-white'>Continue with Google</Text>
      </TouchableOpacity>

      <TouchableOpacity className='w-full h-16 rounded-full flex-row justify-center items-center relative bg-fb-blue'>
        <FontAwesome5 name="facebook-f" size={24} color="white" className='absolute left-9' />
        <Text className='text-white text-center font-medium text-xl'>Continue with facebook</Text>
      </TouchableOpacity>

      <TouchableOpacity className='w-full h-16 rounded-full flex-row justify-center items-center relative bg-apple-gray'>
        <Ionicons name="logo-apple" size={28} color="black" className='absolute left-8' />
        <Text className='text-black text-center font-medium text-xl'>Continue with apple</Text>
      </TouchableOpacity>

    </View>
  )
}