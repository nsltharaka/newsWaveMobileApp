import { View, Text, Pressable } from "react-native";

export default function EmptyScreen({ infoMsg, linkText, onPressHandler }) {
    return (
        <View className='flex-1 justify-center items-center'>
            <Pressable onPress={onPressHandler}>
                <View className='w-[50%] justify-center items-center gap-2'>
                    <Text className='font-semibold color text-neutral-500 text-center'>{infoMsg}</Text>
                    {linkText &&
                        <Text className='text-redl2 font-bold'>
                            {linkText}
                        </Text>
                    }
                </View>
            </Pressable>
        </View >
    )
}