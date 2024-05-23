import { useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { Alert, FlatList, Text, View } from 'react-native'
import EmptyScreen from '../../components/EmptyScreen'
import Post from '../../components/Post'
import { getPosts, refreshHome } from '../../lib/api'
import ListEnd from '../../components/ListEnd'

export default function HomePage() {

  const limit = 20
  const initialPage = `/posts/all?limit=${limit}&offset=${0}`

  const router = useRouter()

  const [posts, setPosts] = useState([])
  const [nextPage, setNextPage] = useState(initialPage)
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  const fetchPosts = async () => {
    if (loading) return

    if (!nextPage) {
      return
    }

    console.log("fetching posts...");
    try {
      setLoading(true)
      const data = await getPosts(nextPage)
      console.log("fetched ", data.info.count);

      // setPosts([...posts, ...data.posts])
      setPosts([...posts, ...data.posts])
      setNextPage(data.info.next)

    } catch (error) {
      Alert.alert("Error fetching posts", error)

    } finally {
      setLoading(false)
    }
  }

  const onRefresh = async () => {
    setRefreshing(true)
    setPosts([])
    setNextPage(initialPage)
    await refreshHome()
    setRefreshing(false)
  }

  useEffect(() => { fetchPosts() }, [])

  return (
    <View className='flex-1 bg-black'>
      <FlatList
        overScrollMode='never'
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ gap: 3 }}

        data={posts}
        renderItem={({ item }) => <Post post={item} />}

        refreshing={loading && refreshing}
        onRefresh={onRefresh}

        onEndReached={() => fetchPosts()}
        onEndReachedThreshold={3}

        ListFooterComponent={() => <ListEnd title={"You're all caught up"} message={"You've seen all the posts from your feeds."} />}

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