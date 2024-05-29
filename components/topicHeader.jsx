import { Feather } from '@expo/vector-icons';
import { Alert, Image, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from "react-native";
import { formatDate } from "../lib/time";
import axios, { HttpStatusCode } from 'axios';
import { router } from 'expo-router';

export default function TopicHeader({ topic }) {

    const onUnfollow = async () => {
        try {
            const resp = await axios.delete(`/topics/${topic.id}`, { timeout: 5000 })
            if (resp.status === HttpStatusCode.Ok) {
                ToastAndroid.show("topic unfollowed", ToastAndroid.SHORT)
                router.back()
            }
        } catch (error) {
            Alert.alert("Error", "couldn't unfollow the topic.")
            return
        }
    }

    return (

        <View className='gap-3 border-neutral-500'>
            {/* topic image */}
            <Image src={topic.img_url} style={{ width: "100%", height: 250 }} resizeMode="cover" />

            <View className='px-4 gap-2'>
                {/* topic name */}
                <Text
                    style={{ fontFamily: "TiemposHeadlineBlack" }}
                    className='text-5xl '
                >
                    {topic.name}
                </Text>

                {/* last updated at */}
                <View className=''>
                    <Text className='text-neutral-500 text-lg'>last updated  ●  {formatDate(topic.updated_at)}</Text>
                    <Text className='text-neutral-500 text-lg'>{`${topic.source_count} source${topic.source_count > 1 ? 's' : ''}`}</Text>
                </View>
            </View>

            <View className='flex-row justify-end mx-4' style={{ borderBottomWidth: StyleSheet.hairlineWidth }}>
                <TouchableOpacity className='p-4 items-center justify-center'
                    onPress={() => {
                        Alert.alert("Unfollow Topic", `Do you really want to unfollow ${topic.name}?`, [
                            {
                                text: "Yes",
                                onPress: () => {
                                    onUnfollow();
                                },
                            },
                            {
                                text: "No",
                                isPreferred: true,
                                style: 'cancel'
                            },
                        ])
                    }}
                >
                    <Feather name="trash-2" size={26} color="red" />
                </TouchableOpacity>

                <TouchableOpacity className='p-4 items-center justify-center'
                    onPress={() => router.push(`screens/editTopic/${topic.id}`)}
                >
                    <Feather name="edit-3" size={26} color="red" />
                </TouchableOpacity>

                <TouchableOpacity className='p-4 items-center justify-center'>
                    <Feather name="settings" size={26} color="red" />
                </TouchableOpacity>
            </View>

        </View>

    )
}