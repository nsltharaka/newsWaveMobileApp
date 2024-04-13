import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import Topic from '../../components/Topic'

export default function Topics() {
  return (
    <View className='flex-1'>
      <ScrollView overScrollMode='never'>
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