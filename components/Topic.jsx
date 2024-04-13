import { View, Text, Image } from 'react-native'
import React from 'react'

export default function Topic({ imageSrc, topic, lastUpdated, sourceCount }) {
  return (
    <View className='w-full relative'>
      <View className='bg-black opacity-50 w-full h-full absolute z-10 justify-end'></View>

      <View className='z-20 absolute bottom-12 left-8 gap-1'>
        <Text
          className='text-white text-4xl'
          style={{
            fontFamily: 'TiemposHeadlineBlack'
          }}
        >
          {topic}
        </Text>

        <View>
          <Text className='text-white italic'>
            last updated {lastUpdated}
          </Text>

          <Text className='text-white italic'>
            {sourceCount + " sources"}
          </Text>
        </View>

      </View>

      <View className='items-center z-0'>
        <Image source={{ uri: imageSrc }} resizeMode='cover' style={{
          width: "100%",
          height: 300,
        }} />
      </View>

    </View>
  )
}