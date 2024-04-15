import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { ScrollView, TouchableOpacity, View } from 'react-native'
import Topic from '../../components/Topic'
import { useRouter } from 'expo-router'

export default function Topics() {

  const router = useRouter()

  return (
    <View className='flex-1 relative'>

      <TouchableOpacity
        onPress={() => router.push('screens/addTopic')}
        className='w-20 rounded-full aspect-square bg-redl2 absolute bottom-8 right-7 z-30 items-center justify-center'>
        <Ionicons name='add' size={30} color={"white"} />
      </TouchableOpacity>


      <ScrollView overScrollMode='never' showsVerticalScrollIndicator={false} >
        <Topic
          imageSrc={"https://swarajya.gumlet.io/swarajya/2022-10/64332d71-ebaa-4cac-9109-8135e08ac4bf/Russia_Image.png?w=640&q=75&auto=format,compress&format=webp"}
          topic="Russian-Ukraine War"
          lastUpdated="2 Hours ago"
          sourceCount={10}
        />
        <Topic
          imageSrc={"https://cdn.create.vista.com/api/media/small/78007746/stock-photo-passenger-train-in-sri-lanka"}
          topic="Train Updates"
          lastUpdated="20 Minutes ago"
          sourceCount={10}
        />
        <Topic
          imageSrc={"https://www.freecodecamp.org/news/content/images/size/w2000/2021/10/golang.png"}
          topic="GO Programming"
          lastUpdated="10 Weeks ago"
          sourceCount={7}
        />
      </ScrollView>
    </View>
  )
}