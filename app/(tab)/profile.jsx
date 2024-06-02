import axios from 'axios'
import { useFocusEffect } from 'expo-router'
import React, { useCallback, useState } from 'react'
import { Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import { useAuth } from '../../context/authContext'
import { handleAxiosError } from '../../lib/api'

export default function Profile() {

  const { handleLogout, user } = useAuth()

  const [data, setData] = useState({
    "topics": 0,
    "feeds": 0,
  })

  const btnLoginClicked = () => {
    handleLogout()
  }

  const fetchPostCount = async () => {
    try {
      const resp = await axios.get("/topics/count", { timeout: 5000 })
      setData({ ...data, topics: resp.data.message })
      fetchFeedCount()

    } catch (error) {
      if (error.response) {
        ToastAndroid.show("Couldn't fetch data", ToastAndroid.SHORT)
        return
      }
      handleAxiosError(error)
    }
  }

  const fetchFeedCount = async () => {
    try {
      const resp = await axios.get("/feeds/count", { timeout: 5000 })
      setData({ ...data, feeds: resp.data.message })

    } catch (error) {
      if (error.response) {
        ToastAndroid.show("Couldn't fetch data", ToastAndroid.SHORT)
        return
      }
      handleAxiosError(error)
    }
  }

  useFocusEffect(useCallback(() => {
    fetchPostCount()
  }, []))


  return (
    <View className='p-4 gap-8'>

      <View className='bg-white p-4 gap-8'>
        <View className='items-center p-4'>
          <Text className='font-bold text-5xl'>{user.username}</Text>
          <Text className='text-neutral-500 text-xl'>{user.email}</Text>
        </View>
        <View className='flex-row'>
          <View className={`items-center flex-1 gap-2 border-neutral-400 border-r`}>
            <Text className='text-2xl font-bold text-neutral-500'>Topics</Text>
            <Text className='text-2xl text-neutral-500 font-semibold'>{data.topics}</Text>
          </View>
          <View className={`items-center flex-1 gap-2`}>
            <Text className={style.txtInfo}>Feeds</Text>
            <Text className={style.txtInfoCount}>{data.feeds}</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity className='bg-redl2 h-20 justify-center mt-2'
        onPress={btnLoginClicked}>
        <Text className='text-center text-2xl text-white font-extrabold'>Log Out</Text>
      </TouchableOpacity>

    </View>
  )
}

const style = {
  txtInfo: "text-2xl font-bold text-neutral-500",
  txtInfoCount: "text-2xl text-neutral-500 font-semibold",

}