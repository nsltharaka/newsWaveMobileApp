import { Ionicons } from '@expo/vector-icons'
import { useFocusEffect, useRouter } from 'expo-router'
import React, { useCallback, useState } from 'react'
import { Alert, RefreshControl, ScrollView, ToastAndroid, TouchableOpacity, View } from 'react-native'
import Topic from '../../components/Topic'
import { getAllTopicsForUser, unfollowTopic } from '../../lib/api'
import EmptyScreen from '../../components/EmptyScreen'

export default function Topics() {

  const router = useRouter()

  const [topics, setTopics] = useState([])
  const [refreshing, setRefreshing] = useState(true)

  const fetchPosts = () => {
    (async () => {
      console.log("fetching data on topics page...");

      try {
        const data = await getAllTopicsForUser()
        setTopics(data)

      } catch (error) {
        Alert.alert('Could not get topics', 'please check your network connection and try again')
      }

      setRefreshing(false)

    })()
  }

  useFocusEffect(
    useCallback(() => {
      fetchPosts()
    }, [])
  )

  return (
    <>
      {topics.length != 0 ?
        <View className='flex-1 relative'>

          <TouchableOpacity
            onPress={() => router.push('screens/addTopic')}
            className='w-20 rounded-full aspect-square bg-redl2 absolute bottom-8 right-7 z-30 items-center justify-center'>
            <Ionicons name='add' size={30} color={"white"} />
          </TouchableOpacity>


          <ScrollView overScrollMode='never' showsVerticalScrollIndicator={false}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => fetchPosts()} />}
          >

            {
              topics.map(t => {

                const onUnfollow = async () => {
                  try {
                    await unfollowTopic(t.id)
                    ToastAndroid.show("topic unfollowed", ToastAndroid.SHORT)
                    fetchPosts()
                  } catch (error) {
                    Alert.alert("Error", "couldn't unfollow the topic.")
                    return
                  }
                }

                return (
                  <TouchableOpacity key={t.id} onPress={() => router.push(`screens/${t.id}`)}>
                    <Topic
                      key={t.id}
                      topic={t}
                      onUnfollowHandler={onUnfollow}
                    />
                  </TouchableOpacity>)
              })
            }

          </ScrollView>
        </View>
        :
        <EmptyScreen
          infoMsg={"No topics to show. Start by adding one or more topics."}
          linkText={"Add Topic"}
          onPressHandler={() => router.push("screens/addTopic")}
        />

      }
    </>

  )
}