import { useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Alert, FlatList, RefreshControl, Text, View } from 'react-native'
import EmptyScreen from '../../components/EmptyScreen'
import { getPosts, refreshHome } from '../../lib/api'

export default function HomePage() {

  const limit = 10

  const router = useRouter()

  const [posts, setPosts] = useState([])
  const [nextPage, setNextPage] = useState(`/posts/all?limit=${limit}&offset=${0}`)
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  const fetchPosts = async () => {
    if (loading) return

    console.log("fetching posts...");
    try {
      setLoading(true)
      const data = await getPosts(nextPage)
      console.log("fetched ", data.info.count);

      if (data.posts.length === 0) {
        return
      }

      setPosts([...posts, data.posts])
      setNextPage(data.info.next)

    } catch (error) {
      Alert.alert("Error fetching posts", error)

    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchPosts() }, [])

  return (
    <View className='flex-1 bg-green-200 '>
      <FlatList
        overScrollMode='never'
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => refreshHome()} />}

        data={posts}
        renderItem={({ item }) => <Text>{JSON.stringify(item, null, 2)}</Text>}

        onEndReached={() => fetchPosts()}
        onEndReachedThreshold={3}

        ListFooterComponent={() => loading && <ActivityIndicator size={"large"} color={"red"} />}

        ListEmptyComponent={() => (
          <EmptyScreen
            infoMsg={"Add topics to see latest updates."}
            linkText={"Add Topic"}
            onPressHandler={() => router.push("screens/addTopic")}
          />
        )}
      />
    </View>
  )
}