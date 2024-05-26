import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import { Text, TextInput, View, TouchableOpacity, ActivityIndicator, Alert } from 'react-native'
import Colors from '../constants/Colors'
import { useRouter } from 'expo-router'
import axios, { HttpStatusCode } from 'axios'
import { handleAxiosError } from '../lib/api'

export default function ForgotPasswordPage() {

    const router = useRouter()

    const [formData, setFormData] = useState({
        txtEmail: "",
        txtPassCode: "",
        txtPassword: "",
        txtConfirmation: "",
    })
    const [stepLoading, setStepLoading] = useState(false)
    const [step, setStep] = useState(0)
    const [processData, setProcessData] = useState({
        userId: "",
        code: "",
        password: "",
    })

    const handleChange = () => { }
    const onContinue = () => {

        switch (step) {
            case 0:
                handleEmailSubmit()
                break;

            case 1:
                handlePassCode()
                break;

            case 2:
                handleResetPassword()
                break;
        }


    }

    const handleEmailSubmit = async () => {

        // setStep(prev => prev + 1)
        // return

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.txtEmail)) {
            Alert.alert("Error", "please provide a valid email.")
            return
        }

        try {
            setStepLoading(true)

            const resp = await axios.post("auth/forgot-password", { email: formData.txtEmail }, { timeout: 5000 })
            if (resp.status == HttpStatusCode.Ok) {
                const { msg, userId } = resp.data
                setProcessData({ ...processData, userId: userId })
                Alert.alert("Check Emails", msg)
                setStep(prev => prev + 1)
            }

        } catch (error) {
            if (error.response) {
                Alert.alert("Error", error.response.data.error || JSON.stringify(error.response, null, 2))
                return
            }
            handleAxiosError(error)
        } finally {
            setStepLoading(false)
        }

    }

    const handlePassCode = () => {
        if (formData.txtPassCode === "") {
            Alert.alert("Error", "field cannot be empty")
            return
        }

        if (!/^\d{6}$/.test(formData.txtPassCode)) {
            Alert.alert("Error", "field only accepts 6-digit number")
            return
        }

        setProcessData({ ...processData, code: formData.txtPassCode })
        setStep(prev => prev + 1)

    }

    const handleResetPassword = async () => {

        if (formData.txtPassword !== formData.txtConfirmation) {
            Alert.alert("Error", "Mismatched passwords")
            return
        }

        try {
            setStepLoading(true)

            const resp = await axios.post("/auth/forgot-password/reset", {
                code: formData.txtPassCode,
                user_id: processData.userId,
                password: formData.txtPassword,
            }, { timeout: 5000 })

            if (resp.status === HttpStatusCode.Ok) {
                Alert.alert("Success", resp.data.msg)
                router.replace("signin")
            }

        } catch (error) {
            if (error.response) {
                Alert.alert("Error", error.response.data.error || JSON.stringify(error.response, null, 2))
                return
            }
            handleAxiosError(error)
        } finally {
            setStepLoading(false)
        }
    }

    return (
        <View className='flex-1 px-4 bg-white'>
            <StatusBar style='dark' />

            <View style={{}} className='mt-16  items-center justify-center'>
                <View className='flex-row gap-0 w-96 justify-center'>
                    <Text style={{ fontFamily: 'passionOneRegular' }} className='text-5xl text-redl2'>News</Text>
                    <Text style={{ fontFamily: 'passionOneRegular' }} className='text-5xl'>Wave</Text>
                </View>
            </View>

            <View className='gap-4 mt-8'>
                <Text className='text-xl'>Enter the email address associated with your account.</Text>
                <View className='flex-row gap-6 h-16 px-6 bg-neutral-200 items-center'>
                    <TextInput
                        className='flex-1 font-semibold text-neutral-700 text-xl'
                        cursorColor="black"
                        placeholder='Email Address'
                        placeholderTextColor={'gray'}
                        onChangeText={(text) => setFormData({ ...formData, txtEmail: text })}
                    />
                </View>
            </View>

            {step >= 1 &&
                <View className='gap-4 mt-8'>
                    <Text className='text-xl'>Enter 6-digit number sent to your email.</Text>
                    <View className='flex-row gap-6 h-16 px-6 bg-neutral-200 items-center'>
                        <TextInput
                            className='flex-1 font-semibold text-neutral-700 text-xl'
                            cursorColor="black"
                            placeholder='6-digit passcode'
                            placeholderTextColor={'gray'}
                            onChangeText={(text) => setFormData({ ...formData, txtPassCode: text })}
                        />
                    </View>
                </View>
            }

            {step >= 2 &&
                <View className='gap-4 mt-8'>
                    <Text className='text-xl'>Enter your new password.</Text>
                    <View className='flex-row gap-6 h-16 px-6 bg-neutral-200 items-center'>
                        <TextInput
                            className='flex-1 font-semibold text-neutral-700 text-xl'
                            cursorColor="black"
                            placeholder='new password'
                            placeholderTextColor={'gray'}
                            onChangeText={(text) => setFormData({ ...formData, txtPassword: text })}
                        />
                    </View>
                    <View className='flex-row gap-6 h-16 px-6 bg-neutral-200 items-center'>
                        <TextInput
                            className='flex-1 font-semibold text-neutral-700 text-xl'
                            cursorColor="black"
                            placeholder='confirm new password'
                            placeholderTextColor={'gray'}
                            onChangeText={(text) => setFormData({ ...formData, txtConfirmation: text })}
                        />
                    </View>
                </View>
            }

            {stepLoading ?
                <ActivityIndicator className="mt-11" size={"large"} color={Colors.palette.redl1} />
                :
                <TouchableOpacity className='bg-redl2 h-16 justify-center mt-8' onPress={onContinue}>
                    <Text className='text-center text-2xl text-white font-extrabold'>Continue</Text>
                </TouchableOpacity>
            }

        </View>
    )
}

