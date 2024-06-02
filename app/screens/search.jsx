import { Ionicons } from "@expo/vector-icons";
import { Stack, router } from "expo-router";
import { useState } from "react";
import { Alert, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { handleAxiosError } from '../../lib/api'
import axios from "axios";
import Topic from '../../components/Topic'
import Post from '../../components/Post'

export default function Page() {

    const [txtSearch, setTxtSearch] = useState("")
    const [posts, setPosts] = useState([])
    const [topics, setTopics] = useState([])
    const [nextPage, setNextPage] = useState('')

    const search = async () => {

        if (!txtSearch) return
        if (!nextPage) return

        try {
            const resp = await axios.get(nextPage, { timeout: 5000 })
            setPosts(resp.data.posts || [])
            setTopics(resp.data.topics || [])
            setNextPage(resp.data.next)

        } catch (error) {
            if (error.response) {
                Alert.alert("Error", JSON.stringify(error.response.data, null, 2))
                return
            }
            handleAxiosError(error)
        }

    }


    return (
        <View className='flex-1 px-4 pt-4 bg-white gap-4'>

            <Stack.Screen options={{
                title: ""
            }} />

            <View className='flex-row py-2 pr-2 mt-2 items-center border-b-2 border-redl1'>
                <TextInput
                    value={txtSearch}
                    onChangeText={txt => {
                        setTxtSearch(txt)
                        setNextPage(`/search?q=${txt}&page=1`)
                    }}
                    className='flex-1 px-4 text-2xl'
                    cursorColor={"black"}
                    placeholder="search"
                    returnKeyType="search"
                    selectTextOnFocus
                    autoFocus
                    onSubmitEditing={search}
                />
                <TouchableOpacity onPress={() => setTxtSearch("")}>
                    <Ionicons name="close-circle-sharp" size={28} color={"gray"} />
                </TouchableOpacity>
            </View>

            <Text className='text-xl font-semibold'>Search Results:</Text>

            <FlatList
                ListHeaderComponent={() => (
                    <FlatList
                        data={topics}
                        renderItem={({ item }) => (
                            <TouchableOpacity className='w-[400]' onPress={() => router.push(`screens/${item.id}`)}>
                                <Topic topic={item} />
                            </TouchableOpacity>
                        )}
                        horizontal
                        contentContainerStyle={{
                            gap: 10
                        }}
                    />
                )}

                className=''
                data={posts}
                renderItem={({ item }) => (
                    <Post post={item} />
                )}
                contentContainerStyle={{
                    gap: 10
                }}
                ItemSeparatorComponent={<View className='mx-4' style={{ borderBottomWidth: StyleSheet.hairlineWidth }}></View>}
                showsVerticalScrollIndicator={false}
            />

        </View>
    )
}