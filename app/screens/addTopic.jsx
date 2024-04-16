import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Colors from '../../constants/Colors';
import validateURL from '../../lib/urlValidator'

export default function Page() {

  const [validationProcessing, setValidationProcessing] = useState(false)
  const [sourceText, setSourceText] = useState('')
  const [formData, setFormData] = useState({
    title: "",
    sources: [],
  })

  const handleAdd = async () => {

    if (formData.sources.includes(sourceText) || sourceText === "") {
      setSourceText('')
      return
    }

    setValidationProcessing(true)
    try {
      const [isValid, errorMsg] = await validateURL(sourceText)

      if (isValid) {
        setFormData({ ...formData, sources: [...formData.sources, sourceText] })
        setSourceText('')
      } else {
        Alert.alert('Validation Failed', errorMsg)
      }

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
          value={formData.title}
          className='h-16 border-b-[2px] border-redl2 text-neutral-700 text-xl'
          cursorColor='black'
          placeholder='(required)'
          onChangeText={(txt) => setFormData({ ...formData, title: txt })}
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
      <TouchableOpacity className='bg-redl2 h-16 justify-center mt-2'>
        <Text className='text-center text-2xl text-white font-extrabold'>Submit</Text>
      </TouchableOpacity>
    </View>
  )
}

