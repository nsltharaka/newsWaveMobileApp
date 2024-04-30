import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { ActivityIndicator, Pressable, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Colors from '../constants/Colors';
import { useAuth } from '../context/authContext';

export default function Signin() {
  const router = useRouter()

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [loading, setLoading] = useState(false)

  const { handleLogin } = useAuth()

  const btnLoginClicked = async () => {

    if (!formData.email || !formData.password) {
      return
    }

    setLoading(true)
    await handleLogin(formData.email, formData.password,)
    setLoading(false)

  }

  return (
    <View className='flex-1'>
      <StatusBar style='dark' />
      <View style={{ marginTop: 30 }} className='flex-1 px-6 gap-12'>

        <View style={{ height: 175 }} className='items-center justify-end'>
          <View className='flex-row gap-0 w-96 justify-center'>
            <Text style={{ fontFamily: 'passionOneRegular' }} className='text-8xl text-redl2'>News</Text>
            <Text style={{ fontFamily: 'passionOneRegular' }} className='text-8xl'>Wave</Text>
          </View>
        </View>

        <Text style={{ fontFamily: 'passionOneRegular' }} className='text-5xl tracking-wider text-center text-neutral-600 mt-8'>Sign In</Text>
        <View className='gap-4'>
          {/* text inputs */}
          <View className='flex-row gap-6 h-20 px-8  bg-neutral-200 items-center'>
            <Ionicons name="mail-outline" size={28} color="black" />
            <TextInput cursorColor={Colors.palette.redl2} onChangeText={(txt) => setFormData({ ...formData, email: txt })} placeholder='Email Address' placeholderTextColor={'gray'} className='flex-1 font-semibold text-neutral-700 text-xl' />
          </View>

          <View className='gap-3'>
            <View className='flex-row gap-6 h-20 px-8  bg-neutral-200 items-center'>
              <Ionicons name="lock-closed-outline" size={28} color="black" />
              <TextInput cursorColor={Colors.palette.redl2} onChangeText={(txt) => setFormData({ ...formData, password: txt })} placeholder='Password' placeholderTextColor={'gray'} secureTextEntry className='flex-1 font-semibold text-neutral-700 text-xl' />
            </View>

            <Pressable onPress={() => router.push('forgotPassword')}>
              <Text className='text-right pr-6 text-neutral-500 font-semibold'>forgot password?</Text>
            </Pressable>
          </View>

          {loading ?
            <ActivityIndicator color={"red"} size={'large'} />
            :
            <TouchableOpacity className='bg-redl2 h-20 justify-center mt-2'
              onPress={btnLoginClicked}
            >
              <Text className='text-center text-2xl text-white font-extrabold'>Sign In</Text>
            </TouchableOpacity>
          }

          <Pressable onPress={() => router.replace('signUp')}>
            <View className='gap-2 justify-center items-center mt-12 pr-6'>
              <Text className='text-neutral-500 font-semibold'>Don't have an account?</Text>
              <Text className='text-redl2 font-bold'>Sign Up</Text>
            </View>
          </Pressable>

        </View>

      </View>
    </View>
  )
}