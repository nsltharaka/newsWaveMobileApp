import { Stack, useLocalSearchParams } from "expo-router"
import { useEffect, useState } from "react"
import { Text, View } from "react-native"

export default function Page() {

    const param = useLocalSearchParams()
    const [currentTopic, setCurrenTopic] = useState({
        // props of the topic here
        title : ""
    })
    
    useEffect(() => {

        // get topic info for the given topic id
        setCurrenTopic((prev) => ({...prev, title :"Custom Topic"}))

    }, [])

    return (
        <View className="debug flex-1 items-center justify-center">

            <Stack.Screen options={{
                headerTitle: currentTopic.title || "Topic",
            }} />

            <Text>
                {param.topicId}
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