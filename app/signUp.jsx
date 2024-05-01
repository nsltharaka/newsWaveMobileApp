import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Alert, Pressable, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Colors from '../constants/Colors';
import { useAuth } from '../context/authContext';

export default function Signin() {

    const router = useRouter()
    const { handleRegister } = useAuth()

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    })

    const btnSignUpClicked = () => {

        if (formData.username === "" || formData.email === "" || formData.password === "") {
            Alert.alert("Error", "username, email and password fields cannot be empty.")
            return
        }

        if (!/^[a-zA-Z]*$/g.test(formData.username)) {
            Alert.alert("Error", "username can only contain letters.")
            return
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            Alert.alert("Error", "please provide a valid email.")
            return
        }

        if (formData.password !== formData.confirmPassword) {
            Alert.alert("Error", "passwords doesn't match")
            return
        }

        handleRegister(
            formData.username,
            formData.email,
            formData.password
        )

    }

    return (
        <View className='flex-1'>
            <StatusBar style='dark' />
            <View style={{ marginTop: 30 }} className='flex-1 px-6 gap-12'>

                <View style={{ height: 100, marginTop: 40 }} className=' items-center justify-center'>
                    <View className='flex-row gap-0 w-96 justify-center'>
                        <Text style={{ fontFamily: 'passionOneRegular' }} className='text-8xl text-redl2'>News</Text>
                        <Text style={{ fontFamily: 'passionOneRegular' }} className='text-8xl'>Wave</Text>
                    </View>
                </View>

                <Text style={{ fontFamily: 'passionOneRegular' }} className='text-5xl tracking-wider text-center text-neutral-600'>Sign Up</Text>

                <View className='gap-6'>
                    {/* text inputs */}
                    <View className='flex-row gap-6 h-20 px-8  bg-neutral-200 items-center'>
                        <Ionicons name="person-outline" size={28} color="black" />
                        <TextInput cursorColor={Colors.palette.redl2} onChangeText={(txt) => setFormData({ ...formData, username: txt.trim() })} placeholder='Username' placeholderTextColor={'gray'} className='flex-1 font-semibold text-neutral-700 text-xl' />
                    </View>

                    <View className='flex-row gap-6 h-20 px-8  bg-neutral-200 items-center'>
                        <Ionicons name="mail-outline" size={28} color="black" />
                        <TextInput cursorColor={Colors.palette.redl2} onChangeText={(txt) => setFormData({ ...formData, email: txt.trim() })} placeholder='Email Address' placeholderTextColor={'gray'} className='flex-1 font-semibold text-neutral-700 text-xl' />
                    </View>

                    <View className='flex-row gap-6 h-20 px-8  bg-neutral-200 items-center'>
                        <Ionicons name="key-outline" size={28} color="black" />
                        <TextInput cursorColor={Colors.palette.redl2} onChangeText={(txt) => setFormData({ ...formData, password: txt.trim() })} placeholder='Password' placeholderTextColor={'gray'} secureTextEntry className='flex-1 font-semibold text-neutral-700 text-xl' />
                    </View>

                    <View className='flex-row gap-6 h-20 px-8  bg-neutral-200 items-center'>
                        <Ionicons name="key-outline" size={28} color="black" />
                        <TextInput
                            cursorColor={Colors.palette.redl2}
                            placeholder='Confirm Password' placeholderTextColor={'gray'} secureTextEntry className='flex-1 font-semibold text-neutral-700 text-xl'
                            onChangeText={(txt) => {
                                setFormData({ ...formData, confirmPassword: txt.trim() })
                            }
                            } />
                    </View>

                    <TouchableOpacity className='bg-redl2 h-20 justify-center mt-2'
                        onPress={btnSignUpClicked}
                    >
                        <Text className='text-center text-2xl text-white font-extrabold'>Sign Up</Text>
                    </TouchableOpacity>

                    <Pressable onPress={() => router.replace('signin')}>
                        <View className='gap-2 justify-center items-center mt-6 pr-6'>
                            <Text className='text-neutral-500 font-semibold'>already have an account?</Text>
                            <Text className='text-redl2 font-bold'>Sign In</Text>
                        </View>
                    </Pressable>

                </View>

            </View>
        </View>
    )
}