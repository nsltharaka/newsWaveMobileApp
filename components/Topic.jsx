import { Feather, FontAwesome6 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

const defaultImage = require("../assets/images/defaultTopicImage.jpg")

export default function Topic({ topic }) {

  const router = useRouter()

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
            last updated ● {topic.updated_at}
          </Text>

          <Text className='text-white italic'>
            {topic.source_count + ` source${topic.source_count == 1 ? '' : 's'}`}
          </Text>
        </View>

      </View>

      {/* image */}
      <View className='items-center z-0'>
        <Image source={topic.img_url ? { uri: topic.img_url } : defaultImage} resizeMode='cover' style={{
          width: "100%",
          height: 300,
        }} />
      </View>

      {/* actions container */}
      <View className='z-20 flex-row absolute top-4 right-0'>

        {/* edit icon */}
        <TouchableOpacity className='w-14 aspect-square items-center justify-center'

          onPress={() => router.push(`screens/editTopic/${topic.id}`)}

        ><FontAwesome6 name="edit" size={24} color="white" /></TouchableOpacity>

        {/* unfollow icon */}
        <TouchableOpacity className='w-14 aspect-square items-center justify-center'
          onPress={() => console.log("delete ", topic.id)}

        >
          <Feather name="trash-2" size={24} color="white" />
        </TouchableOpacity>

      </View>

    </View>
  )
}