import React from 'react';
import { Image, Text, View } from 'react-native';
import { getTimeDifferenceString } from '../lib/time';

const defaultImage = require("../assets/images/defaultTopicImage.jpg")

export default function Topic({ topic }) {
  return (
    <View className='w-full relative'>
      {/* mask */}
      <View className='bg-black opacity-50 w-full h-full absolute z-10 justify-end'></View>

      {/* topic info container */}
      <View className='z-20 absolute bottom-12 left-8 right-20 gap-1'>
        <Text
          className='text-white text-4xl'
          style={{
            fontFamily: 'TiemposHeadlineBlack'
          }}
        >
          {topic.name}
        </Text>

        <View>
          <Text className='text-white italic'>
            last updated ● {getTimeDifferenceString(new Date(topic.updated_at))}
          </Text>

          <Text className='text-white italic'>
            {topic.source_count ? topic.source_count + ` source${topic.source_count == 1 ? '' : 's'}` : ""}
          </Text>
        </View>

      </View>

      {/* image */}
      <View className='items-center z-0'>
        <Image source={topic.img_url ? { uri: topic.img_url } : defaultImage} resizeMethod='scale' resizeMode='cover' style={{
          width: "100%",
          height: 300,
        }} />
      </View>
    </View>
  )
}