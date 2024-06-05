import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import { ActivityIndicator, Alert, FlatList, View } from 'react-native'
import SuggestedPost from '../../components/SuggestedPost'
import EmptyScreen from '../../components/EmptyScreen'
import { router, useFocusEffect } from 'expo-router'

export default function Explore() {
  // google news api key - 72e8df6085754244aaec2264079e395c
  const [content, setContent] = useState([])
  const [refreshing, setRefreshing] = useState(false)

  const fetchContent = async () => {
    if (refreshing) return

    console.log("fetching...");
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
      url.searchParams.set("q", query)
      
      const urlStr = url.toString().replace(/\+/g, "%20")
      console.log(urlStr);

      const resp = await axios.get(urlStr, { timeout: 5000 })
      if (resp.data.articles.length > 0) {
        setContent(resp.data.articles)
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

  useFocusEffect(useCallback(() => {
    if (refreshing) return
    fetchContent()
  }, []))

  return (
    <View className='bg-white items-center justify-center'>
      <FlatList
        className=''
        contentContainerStyle={{ gap: 5 }}

        data={content}
        renderItem={({ item }) => (
          <SuggestedPost item={item} />
        )}

        refreshing={refreshing}
        onRefresh={() => {
          setContent([])
          fetchContent()
        }}

        ListEmptyComponent={<EmptyScreen
          infoMsg={"Add topics to see suggested content."}
          linkText={"Add Topic"}
          onPressHandler={() => router.push("/(tab)/addtopic")}
        />}
      />
    </View>
  )
}