import { openBrowserAsync } from "expo-web-browser";
import { Text, TouchableOpacity, View } from "react-native";

const formatDate = (dateString) => {
    const date = new Date(dateString); // Parse the original date string
    const year = date.getFullYear();
    const month = date.getMonth(); // Use month index directly
    const day = date.getDate();

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const formattedDate = `${monthNames[month]} ${day}, ${year}`;
    return formattedDate;
}


const Post = ({ post }) => {
    return (
        <TouchableOpacity
            className='p-4 py-6 gap-5 bg-white'
            activeOpacity={.8}
            onPress={() => openBrowserAsync(post.url)}
        >

            {/* topic container */}
            {post.topic &&
                <Text
                    style={{ fontFamily: 'passionOneRegular' }}
                    className='bg-redl1 text-2xl text-white px-2 self-start'
                >
                    #{post.topic}
                </Text>}

            {/* title Container */}
            <Text
                style={{ fontFamily: 'TiemposHeadlineBold' }}
                className='text-3xl'
            >{post.title}</Text>

            {/* description container */}
            <Text
                className='text-justify text-xl text-ellipsis truncate'
                numberOfLines={10}
            >{post.description}
            </Text>

            <Text className='text-redl1 font-bold -mt-2'>Read more</Text>

            {/* metadata container */}
            <Text className='text-neutral-500 italic text-lg self-end'>{formatDate(post.pub_date)}  ●  {new URL(post.feed_url).host}</Text>

        </TouchableOpacity>
    )
}

export default Post