import axios, { HttpStatusCode } from "axios"
import { Stack, router, useLocalSearchParams } from "expo-router"
import { useEffect, useState } from "react"
import { Alert, FlatList, StyleSheet, View } from "react-native"
import ListEnd from '../../components/ListEnd'
import Post from "../../components/Post"
import TopicHeader from "../../components/topicHeader"
import { handleAxiosError } from "../../lib/api"
import { useGlobalContext } from "../../context/globalContext"

export default function Page() {

    const { setSelectedTopic } = useGlobalContext()

    const params = useLocalSearchParams()
    const initialPage = `/posts/${params.topicId}?page=1`

    const [posts, setPosts] = useState([])
    const [nextPage, setNextPage] = useState(initialPage)
    const [loading, setLoading] = useState(false)
    const [shouldRefetch, setShouldRefetch] = useState(true)
    const [metadata, setMetadata] = useState({
        "feeds": [],
        "topic": {
            "id": "",
            "name": "",
            "img_url": "",
            "updated_at": "",
            "source_count": 0
        }
    })

    const fetchData = async () => {
        setLoading(true)

        try {
            const resp = await axios.get(`topics/${params.topicId}`, { timeout: 5000 })
            setMetadata(resp.data)
            setSelectedTopic(resp.data)

        } catch (error) {
            if (error.response) {
                Alert.alert("Error in fetching topic data", error.response.data.error || JSON.stringify(error, null, 2))
                return
            }
            handleAxiosError(error)
        }

        setLoading(false)

    }

    const fetchPosts = async () => {
        if (!shouldRefetch) return

        setLoading(true)
        try {
            const resp = await axios.get(nextPage, { timeout: 5000 })
            if (resp.status == HttpStatusCode.Ok) {
                setPosts([...posts, ...resp.data.posts])
                setNextPage(resp.data.info.next)
                if (!resp.data.info.next) setShouldRefetch(false)
            }

        } catch (error) {
            if (error.response) {
                Alert.alert("Error in fetching post data", error.response.data.error || JSON.stringify(error, null, 2))
                return
            }
            handleAxiosError(error)
        }
        setLoading(false)

    }

    const handleEndReached = () => {
        fetchPosts()
    }

    useEffect(() => {
        if (loading) {
            return
        }

        fetchData()
        fetchPosts()
    }, [])

    return (
        <View className="bg-white">
            <Stack.Screen options={{
                headerTitle: metadata.topic.name || "Topic",
            }} />

            <FlatList
                overScrollMode='never'
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={() => <TopicHeader topic={metadata.topic} />}
                ListFooterComponent={() => <ListEnd title={"You're all caught up"} message={"You've seen all the posts from this topic."} />}

                data={posts}
                renderItem={({ item }) => (
                    <>
                        <Post post={item} />
                        <View className='mx-4' style={{ borderBottomWidth: StyleSheet.hairlineWidth }}></View>
                    </>
                )}

                onEndReached={!loading && shouldRefetch ? handleEndReached : undefined}
                onEndReachedThreshold={3}
            />

        </View>
    )
}