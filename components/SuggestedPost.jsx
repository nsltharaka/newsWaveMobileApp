import { openBrowserAsync } from "expo-web-browser";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { formatDate } from "../lib/time";

const defaultImage = require("../assets/images/defaultTopicImage.jpeg")

export default function SuggestedPost({ item }) {
    return (
        <TouchableOpacity onPress={() => openBrowserAsync(item.url)}
            className='bg-white gap-2'
            activeOpacity={.8}
        >
            <Image source={item.urlToImage ? { uri: item.urlToImage } : defaultImage} resizeMethod='scale' resizeMode='cover' style={{
                width: "100%",
                height: 300,
            }} />

            <View className='p-3 gap-4'>
                <Text style={{ fontFamily: "TiemposHeadlineBlack" }}
                    className='text-3xl'
                >{item.title}</Text>

                <View className='flex-row gap-1'>
                    <Text className='italic text-neutral-500'>{formatDate(item.publishedAt)}</Text>
                    <Text className='text-neutral-500'> ● </Text>
                    <Text className='italic text-neutral-500'>{item.source?.name}</Text>
                </View>

                <Text className='text-xl'>{item.description}</Text>


            </View>

        </TouchableOpacity>
    )
}