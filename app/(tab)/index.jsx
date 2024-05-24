import React, { useEffect, useState } from 'react'
import { Alert, FlatList, View } from 'react-native'
import EmptyScreen from '../../components/EmptyScreen'
import ListEnd from '../../components/ListEnd'
import Post from '../../components/Post'
import { getPosts, refreshHome } from '../../lib/api'

export default function HomePage() {

  // limit is how many posts per page
  const initialPage = `/posts/all?page=1`

  const [posts, setPosts] = useState([])
  const [nextPage, setNextPage] = useState(initialPage)
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  const fetchPosts = async () => {
    // if loading do not trigger another fetch
    if (loading) return

    // if there is no next page, nothing to fetch
    if (!nextPage) {
      return
    }

    try {
      setLoading(true)

      // get next page
      const data = await getPosts(nextPage)
      // new posts are appending to the existing posts
      setPosts([...posts, ...data.posts])

      // next page link to fetch posts
      setNextPage(data.info.next)

    } catch (error) {
      Alert.alert("Error fetching posts", error)

    }

    setLoading(false)

  }

  const onRefresh = async () => {

    setPosts([])
    setNextPage(initialPage)

    setRefreshing(true)
    await refreshHome()
    setRefreshing(false)

  }

  useEffect(() => {
    if (loading || refreshing) return

    console.log("effect running...")
    fetchPosts()
  }, [refreshing])

  return (
    <View className='flex-1 bg-white'>
      {
        posts.length > 0 ?
          <FlatList
            className='bg-black'
            overScrollMode='never'
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ gap: 3 }}

            data={posts}
            renderItem={({ item }) => <Post post={item} />}

            refreshing={refreshing}
            onRefresh={() => onRefresh()}

            onEndReached={() => !loading && !refreshing && fetchPosts()}
            onEndReachedThreshold={3}

            ListFooterComponent={() => <ListEnd title={"You're all caught up"} message={"You've seen all the posts from your feeds."} />}
          />

          :

          <EmptyScreen
            infoMsg={"No posts to fetch."}
            linkText={"Tap to refresh"}
            onPressHandler={() => onRefresh()}
          />
      }
    </View>
  )
}