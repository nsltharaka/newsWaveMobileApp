import { Ionicons } from '@expo/vector-icons'
import { useFocusEffect, useRouter } from 'expo-router'
import React, { useCallback, useState } from 'react'
import { Alert, RefreshControl, ScrollView, ToastAndroid, TouchableOpacity, View } from 'react-native'
import EmptyScreen from '../../components/EmptyScreen'
import Topic from '../../components/Topic'
import { getAllTopicsForUser, unfollowTopic } from '../../lib/api'

export default function Topics() {

  const router = useRouter()

  const [topics, setTopics] = useState([])
  const [refreshing, setRefreshing] = useState(true)

  const fetchPosts = () => {
    (async () => {

      try {
        const data = await getAllTopicsForUser()
        setTopics(data)

      } catch (error) {
        console.log(error);
        // Alert.alert('Could not get topics', JSON.stringify(error, null, 2))
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
        <View className='flex-1'>

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
          onPressHandler={() => router.push("/(tab)/addtopic")}
        />

      }
    </>

  )
}