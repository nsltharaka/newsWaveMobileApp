import { View, Text } from "react-native"
import { Ionicons } from '@expo/vector-icons';
import Colors from "../constants/Colors";

const ListEnd = ({title, message}) => {
    return (
        <View className='items-center bg-white py-8 gap-2'>
            <Ionicons name="checkmark-circle-outline" size={60} color={Colors.palette.redl1} />
            <View>
                <Text className='text-2xl font-bold text-center'>{title}</Text>
                <Text className='text-lg text-center'>{message}</Text>
            </View>
        </View>
    )
}

export default ListEnd