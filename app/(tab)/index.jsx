import React from 'react'
import { Text, View } from 'react-native'
import { useAuth } from '../../context/authContext'

export default function HomePage() {

  const {user} = useAuth()

  return (
    <View className='flex-1 bg-green-200 '>
      <Text>{JSON.stringify(user, null, 2)}</Text>
    </View>
  )
}