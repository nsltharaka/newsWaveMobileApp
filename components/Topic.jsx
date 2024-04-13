import { View, Text, Image } from 'react-native'
import React from 'react'

export default function Topic({imageSrc}) {
  return (
    <View className='bg-green-200 w-full'>
      <Image source={imageSrc} />
    </View>
  )
}