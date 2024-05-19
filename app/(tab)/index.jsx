import { useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { RefreshControl, ScrollView, Text, View } from 'react-native'
import EmptyScreen from '../../components/EmptyScreen'
import { useAuth } from '../../context/authContext'
import { refreshHome } from '../../lib/api'

export default function HomePage() {

  const { user } = useAuth()
  const router = useRouter()

  const [posts, setPosts] = useState([])
  const [refreshing, setRefreshing] = useState(false)

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
            <ScrollView overScrollMode='never' showsVerticalScrollIndicator={false}
              refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => refreshHome()} />}
            >
              <Text>{JSON.stringify(user, null, 2)}</Text>
            </ScrollView>
          </View>
          :
          <ScrollView overScrollMode='never' showsVerticalScrollIndicator={false}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={async () => {
              setRefreshing(true)
              await refreshHome()
              setRefreshing(false)
            }} />}
          >
            <EmptyScreen
              infoMsg={"Add topics to see latest updates."}
              linkText={"Add Topic"}
              onPressHandler={() => router.push("screens/addTopic")}
            />
          </ScrollView>
      }

    </>
  )
}