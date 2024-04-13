import { View, Text } from 'react-native'
import React from 'react'
import { useAuth } from '../../context/authContext'

export default function HomePage() {

  const { user } = useAuth()

  return (
    <View className='flex-1 justify-center items-center '>
      <Text>{JSON.stringify(user, null, 2)}</Text>
    </View>
  )
}