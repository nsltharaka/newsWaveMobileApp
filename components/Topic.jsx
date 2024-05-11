import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Entypo } from '@expo/vector-icons';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import ContextMenu from './ContextMenu';

const defaultImage = require("../assets/images/defaultTopicImage.jpg")

export default function Topic({ topic }) {

  const [contextMenuLoading, setContextMenuVisible] = useState(false)

  return (
    <View className='w-full relative'>
      <View className='bg-black opacity-50 w-full h-full absolute z-10 justify-end'></View>

      <View className='z-20 absolute bottom-12 left-8 right-4 gap-1'>
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

      <View className='items-center z-0'>
        <Image source={topic.img_url ? { uri: topic.img_url } : defaultImage} resizeMode='cover' style={{
          width: "100%",
          height: 300,
        }} />
      </View>

      {/* three dot menu */}
      <View className='z-20 w-20 items-center justify-center aspect-square absolute top-0 -right-2'>
        <Menu>
          <MenuTrigger customStyles={{
            TriggerTouchableComponent: () => (<Entypo name="dots-three-vertical" size={24} color="white" />)
          }} />
          <MenuOptions>
            <MenuOption onSelect={() => alert(`Save`)} text='Save' />
            <MenuOption onSelect={() => alert(`Delete`)} >
              <Text style={{ color: 'red' }}>Delete</Text>
            </MenuOption>
            <MenuOption onSelect={() => alert(`Not called`)} disabled={true} text='Disabled' />
          </MenuOptions>
        </Menu>
      </View>
    </View>
  )
}