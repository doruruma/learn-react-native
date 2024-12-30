import { icons } from '@/constants'
import React, { useState } from 'react'
import { Image, Text, TextInput, View, TouchableOpacity } from 'react-native'

export default function FormField({
  title,
  value,
  placeholder,
  keyboardType,  
  handleChangeText,
  otherStyles,
  ...props
}: any) {

  const [showPassword, setShowPassword] = useState(false)

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className='text-base text-gray-100 font-pmedium'>{title}</Text>
      <View className='w-full h-16 px-4 bg-black-100 border-2 border-black-200 rounded-2xl focus:border-secondary items-center flex-row'>
        <TextInput
          className='flex-1 text-white font-psemibold text-base'
          value={value}
          keyboardType={keyboardType}
          placeholder={placeholder}
          placeholderTextColor="#7b7b8b"
          onChangeText={handleChangeText}
          secureTextEntry={title === 'Password' && !showPassword}
        />
        {title === 'Password' && (
          <TouchableOpacity onPress={() => { setShowPassword(!showPassword) }}>
            <Image
              source={showPassword ? icons.eyeHide : icons.eye}
              className='w-6 h-6'
              resizeMode='contain'
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}
