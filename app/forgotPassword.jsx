import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { Text, TextInput, View, TouchableOpacity } from 'react-native'
import Colors from '../constants/Colors'

export default function ForgotPasswordPage() {

    const handleChange = () => { }

    return (
        <View className='flex-1 px-4 gap-6'>
            <StatusBar style='dark' />

            <View style={{}} className='mt-20  items-center justify-center'>
                <View className='flex-row gap-0 w-96 justify-center'>
                    <Text style={{ fontFamily: 'passionOneRegular' }} className='text-5xl text-redl2'>News</Text>
                    <Text style={{ fontFamily: 'passionOneRegular' }} className='text-5xl'>Wave</Text>
                </View>
            </View>

            <View className='gap-4 mt-8'>
                <Text className='text-xl font-semibold'>Enter your email address associated with your account. You will receive a link to reset your password.</Text>
                <View className='flex-row gap-6 h-16 px-6 bg-neutral-200 items-center'>
                    <TextInput
                        className='flex-1 font-semibold text-neutral-700 text-xl'
                        cursorColor="black"
                        placeholder='Email Address'
                        placeholderTextColor={'gray'}
                        onChange={() => handleChange()}
                    />
                </View>
            </View>

            <TouchableOpacity className='bg-redl2 h-16 justify-center mt-2'>
                <Text className='text-center text-2xl text-white font-extrabold'>Continue</Text>
            </TouchableOpacity>

        </View>
    )
}