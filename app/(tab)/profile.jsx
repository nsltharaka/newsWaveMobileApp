import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useAuth } from '../../context/authContext'

export default function Profile() {

  const { handleLogout } = useAuth()

  const btnLoginClicked = () => {
    handleLogout()
  }

  return (
    <View className='px-4'>
      <TouchableOpacity className='bg-redl2 h-20 justify-center mt-2'
        onPress={btnLoginClicked}
      >
        <Text className='text-center text-2xl text-white font-extrabold'>Log Out</Text>
      </TouchableOpacity>
    </View>
  )
}