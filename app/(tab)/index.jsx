import { useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import EmptyScreen from '../../components/EmptyScreen'
import { useAuth } from '../../context/authContext'

export default function HomePage() {

  const { user } = useAuth()
  const router = useRouter()

  const [posts, setPosts] = useState([])

  useEffect(
    () => {
      console.log("HOMEPAGE: fetching posts...")
      setPosts([])
      
    }, [])

  return (
    <>
      {
        posts.length > 0 ?
          <View className='flex-1 bg-green-200 '>
            <Text>{JSON.stringify(user, null, 2)}</Text>
          </View>
          :
          <EmptyScreen
            infoMsg={"Add topics to see latest updates."}
            linkText={"Add Topic"}
            onPressHandler={() => router.push("screens/addTopic")}
          />
      }

    </>
  )
}