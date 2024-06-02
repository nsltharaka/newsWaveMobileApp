import { Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import { useState } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";

export default function Page() {

    const [txtSearch, setTxtSearch] = useState("")

    return (
        <View className='flex-1 p-4 bg-white'>

            <Stack.Screen options={{
                title: ""
            }} />

            <View className='flex-row py-2 pr-2 mt-2 items-center border-b-2 border-redl1'>
                <TextInput
                    value={txtSearch}
                    onChangeText={txt => setTxtSearch(txt)}
                    className='flex-1 px-4 text-2xl'
                    cursorColor={"black"}
                    placeholder="search"
                    returnKeyType="search"
                    autoFocus
                    onSubmitEditing={() => {
                        console.log("searching...");
                    }}
                />
                <TouchableOpacity onPress={() => setTxtSearch("")}>
                    <Ionicons name="close-circle-sharp" size={28} color={"gray"} />
                </TouchableOpacity>
            </View>




        </View>
    )
}