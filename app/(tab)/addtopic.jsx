import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { useFocusEffect, useRouter } from 'expo-router';
import isUrlHttp from 'is-url-http';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Alert, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Colors from '../../constants/Colors';
import { addFollowTopicFeed, handleAxiosError } from '../../lib/api';

export default function Page() {

  const router = useRouter()

  const [submissionProcessing, setSubmissionProcessing] = useState(false)
  const [validationProcessing, setValidationProcessing] = useState(false)
  const [sourceText, setSourceText] = useState('')
  const [formData, setFormData] = useState({
    title: "",
    sources: [],
  })

  const [searching, setSearching] = useState(false)
  const [txtUrl, setTxtUrl] = useState("")

  useFocusEffect(useCallback(() => {
    setFormData({
      title: "",
      sources: [],
    })
  }, []))

  const btnSubmitClicked = async () => {

    if (!formData.title) {
      Alert.alert('Validation', 'title cannot be empty')
      return
    }

    if (formData.sources.length === 0) {
      Alert.alert('Validation', 'at least one source is required in order to add a topic.')
      return
    }

    setSubmissionProcessing(true)
    try {
      await addFollowTopicFeed(formData)
      ToastAndroid.show("topic added", ToastAndroid.SHORT)
      setFormData({
        title: "",
        sources: [],
      })

    } catch (error) {
      console.log(error);
      Alert, alert("Error", "failed to add topic. please check your internet connection.")

    } finally {
      setSubmissionProcessing(false)
      setFormData({
        title: "",
        sources: [],
      })
      router.replace("/(tab)/topics")
    }

  }

  const handleAdd = async () => {

    if (formData.sources.includes(sourceText) || sourceText === "") {
      setSourceText('')
      return
    }

    setValidationProcessing(true)

    try {

      const resp = await axios.get(`/feeds/verify?feed-url=${sourceText.trim()}`, { timeout: 5000 })
      if (resp.data.error) {
        Alert.alert('Validation Failed', resp.data.error)
        return
      }

      setFormData({ ...formData, sources: [...formData.sources, sourceText.trim()] })
      setSourceText('')

    } catch (error) {
      handleAxiosError(error)

    } finally {
      setValidationProcessing(false)
    }

  }

  const handleDelete = (item) => {
    const filteredArr = formData.sources.filter((value) => value !== item)
    setFormData({ ...formData, sources: filteredArr })
  }

  const btnSearchClicked = async () => {

    //validate url
    if (!isUrlHttp(txtUrl)) {
      ToastAndroid.show("Enter a valid URL", ToastAndroid.SHORT)
      return
    }

    setSearching(true)
    try {
      const resp = await axios.get(`https://feedsearch.dev/api/v1/search?url=${txtUrl}`, { timeout: 10000 })
      setFormData({ ...formData, sources: [...formData.sources, ...resp.data.slice(0, 5).map(f => f.url)] })
      setTxtUrl('')

    } catch (error) {
      if (error.response) {
        Alert.alert("Error", "Couldn't find any feeds for the given URL.")
        return
      }
      handleAxiosError(error)

    } finally {
      setSearching(false)
    }
  }

  const ListItem = ({ content }) => (
    <View className='mb-2 flex-row'>
      <View className='flex-row items-center gap-2 max-w-fit bg-gray-200 pl-4 pr-1 py-1 rounded-full'>
        <Text
          numberOfLines={2}
          className='text-neutral-700 text-xl w-fit'
        >{content}</Text>
        <TouchableOpacity onPress={() => handleDelete(content)}>
          <Ionicons name="close-circle-sharp" size={24} color={"gray"} />
        </TouchableOpacity>
      </View>
    </View>
  )

  return (
    <KeyboardAwareScrollView className='flex-1 p-4 gap-4' contentContainerStyle={{ gap: 15 }} >
      <View className='gap-3 bg-white px-4  py-8 shadow-2xl'>
        <Text className='text-3xl font-bold text-neutral-600'>Topic</Text>
        <TextInput
          selectTextOnFocus
          className='h-16 border-b-[2px] border-redl2 text-neutral-700 text-xl'
          cursorColor='black'
          placeholder='(required)'
          onChangeText={(txt) => setFormData({ ...formData, title: txt.trim() })}
        />
      </View>

      <View className='gap-3 bg-white px-4  py-8 shadow-2xl'>
        <Text className='text-3xl font-bold text-neutral-600'>Sources</Text>

        {
          formData.sources.map((source, index) => <ListItem key={index} content={source} />)
        }

        <View className='flex-row gap-2 items-center border-b-[2px] border-redl2 pr-3'>
          <TextInput
            value={sourceText}
            clearTextOnFocus={true}
            className='h-16 text-neutral-700 text-xl flex-1'
            cursorColor='black'
            placeholder='https://'
            onChangeText={(txt) => setSourceText(txt)}
          />

          {validationProcessing ?
            <ActivityIndicator color={"red"} size={'small'} />
            :
            <TouchableOpacity onPress={handleAdd}>
              <Ionicons name="add-circle-sharp" size={34} color={Colors.palette.redl2} />
            </TouchableOpacity>
          }

        </View>
      </View>

      <Text className='text-center text-neutral-500 font-semibold text-lg'>or</Text>

      <View className='gap-3 bg-white px-4  py-8 shadow-2xl'>
        <Text className='text-3xl font-bold text-neutral-600'>Enter URL: </Text>
        <View className='flex-row gap-2 items-center border-b-[2px] border-redl2 pr-3'>
          <TextInput
            value={txtUrl}
            clearTextOnFocus={true}
            className='h-16 text-neutral-700 text-xl flex-1'
            cursorColor='black'
            placeholder='https://'
            onChangeText={(txt) => setTxtUrl(txt)}
          />
          {searching ?
            <ActivityIndicator color={"red"} size={'small'} />
            :
            <TouchableOpacity onPress={btnSearchClicked}>
              <Ionicons name="search" size={32} color={Colors.palette.redl2} />
            </TouchableOpacity>
          }

        </View>
      </View>

      <View className='h-16 justify-center mb-8'>
        {submissionProcessing ?
          <ActivityIndicator color={"red"} size={'large'} />
          :
          <TouchableOpacity className='bg-redl2 h-16 justify-center mt-2'
            onPress={btnSubmitClicked}
          >
            <Text className='text-center text-2xl text-white font-extrabold'>Submit</Text>
          </TouchableOpacity>
        }
      </View>

    </KeyboardAwareScrollView>
  )
}

