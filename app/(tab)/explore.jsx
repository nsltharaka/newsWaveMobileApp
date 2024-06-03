import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Alert, FlatList, View } from 'react-native'
import SuggestedPost from '../../components/SuggestedPost'
import EmptyScreen from '../../components/EmptyScreen'
import { router } from 'expo-router'

export default function Explore() {
  // google news api key - 72e8df6085754244aaec2264079e395c
  const [currentPage, setCurrentPage] = useState(1)
  const [content, setContent] = useState([])
  const [refreshing, setRefreshing] = useState(false)

  const fetchContent = async () => {
    if (refreshing) return

    console.log("fetching ", currentPage);
    setRefreshing(true)
    try {
      const response = await axios.get('/topics', { timeout: 5000 })
      const query = response.data
        .map(topic => topic.name)
        .join(' OR ')

      if (!query) {
        return
      }

      // const url = `https://newsapi.org/v2/everything?q=${query}&apiKey=&page=${currentPage}&language=en`

      const url = new URL("https://newsapi.org/v2/everything")
      url.searchParams.set("apiKey", "72e8df6085754244aaec2264079e395c")
      url.searchParams.set("language", "en")
      url.searchParams.set("page", currentPage)
      url.searchParams.set("pageSize", 100)
      url.searchParams.set("q", query)

      const resp = await axios.get(url.toString(), { timeout: 5000 })
      if (resp.data.articles.length > 0) {
        setContent([...content, ...resp.data.articles])
      } else {
        setCurrentPage(0)
      }

    } catch (error) {
      if (error.response) {
        Alert.alert("Error", "couldn't fetch content. please check your network connection and try again")
        Alert.alert("Error", JSON.stringify(error.response, null, 2))
        return
      }
      handleAxiosError(error)
    }

    setRefreshing(false)
  }

  const onRefresh = () => {
    if (refreshing) return

    setContent([])
    setCurrentPage(1)
  }

  useEffect(() => {
    if (refreshing) return

    fetchContent()
  }, [currentPage])

  return (
    <View className='bg-white items-center justify-center'>
      {
        content.length > 0 ?

          <FlatList
            className=''
            contentContainerStyle={{ gap: 5 }}

            data={content}
            renderItem={({ item }) => (
              <SuggestedPost item={item} />
            )}

            onEndReached={() => {
              console.log("end reached");
              if (currentPage) {
                setCurrentPage(prev => prev + 1)
              }
            }}

            ListFooterComponent={<ActivityIndicator color={"red"} size={"large"} />}

            refreshing={refreshing}
            onRefresh={onRefresh}
          />
          :
          <EmptyScreen
            infoMsg={"Add topics to see suggested content."}
            linkText={"Add Topic"}
            onPressHandler={() => router.push("/(tab)/addtopic")}
          />
      }
    </View>
  )
}