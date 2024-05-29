import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native';
import Colors from '../../../constants/Colors';
import { useGlobalContext } from '../../../context/globalContext';
import { handleAxiosError, updateTopic } from '../../../lib/api';
import validateURL from '../../../lib/urlValidator';
import axios from 'axios';

export default function Page() {

  const param = useLocalSearchParams()
  const { selectedTopic } = useGlobalContext()

  const router = useRouter()

  const [submissionProcessing, setSubmissionProcessing] = useState(false)
  const [validationProcessing, setValidationProcessing] = useState(false)
  const [sourceText, setSourceText] = useState('')
  const [formData, setFormData] = useState({
    title: "",
    sources: [],
  })

  useEffect(() => {
    setFormData({
      title: selectedTopic.topic.name,
      sources: selectedTopic.feeds.map(f => f.url),
    })
  }, [])

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
      const data = await updateTopic(param.id, formData) // TODO need to get the topic id
      console.log(JSON.stringify(data, null, 2));

      ToastAndroid.show("Topic updated", ToastAndroid.SHORT)

    } catch (error) {
      console.log(error);
      Alert, alert("Error", "failed to edit the topic. please check your internet connection.")

    } finally {
      setSubmissionProcessing(false)
      router.back()
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
    <View className='flex-1 p-4 gap-4'>
      <View className='gap-3 bg-white px-4  py-8 shadow-2xl'>
        <Text className='text-3xl font-bold text-neutral-600'>Topic</Text>
        <TextInput
          defaultValue={formData.title}
          className='h-16 border-b-[2px] border-redl2 text-neutral-700 text-xl'
          cursorColor='black'
          placeholder='(required)'
          onChangeText={(txt) => setFormData({ ...formData, title: txt.trim() })}
        />
      </View>
      <View className='gap-3 bg-white px-4  py-8 shadow-2xl'>
        <Text className='text-3xl font-bold text-neutral-600'>Sources</Text>

        <FlatList
          data={formData.sources}
          renderItem={({ item }) => <ListItem content={item} />}
        />

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

      <View className='h-16 justify-center'>
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

    </View>
  )
}

