import { Stack, useLocalSearchParams } from "expo-router"
import { useEffect, useState } from "react"
import { Text, View } from "react-native"
import { getTopic } from "../../lib/api"

export default function Page() {

    const param = useLocalSearchParams()
    const [data, setData] = useState({
        topic : {
            name: "",
        },
        feeds : [],
    })

    useEffect(() => {
        const fetchData = async () => {
            const data = await getTopic(param.topicId)
            if (data) {
                setData(data)
            }
        }

        fetchData()

    }, [])

    return (
        <View className="debug flex-1 items-center justify-center">

            <Stack.Screen options={{
                headerTitle: data.topic.name || "Topic",
            }} />

            <Text>
                {JSON.stringify(data, null, 2)}
            </Text>

            {/* 

            user unfollows a topic
            user adds a feed under the topic
            user removes a feed under the topic
            user edits topic name
            
            */}
        </View>
    )
}