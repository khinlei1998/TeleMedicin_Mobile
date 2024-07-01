import React, { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";
import SelectPicker from 'react-native-form-select-picker'; // Import the package
import { useTranslation } from 'react-i18next';

import { TextInput, Text, StyleSheet } from 'react-native';
const Deptrenderselect = ({ oldvalue, meta, titleText, options, input, onValueChange, ...rest }) => {
  const test = options.map((value) => value)
  const select_value = input.value
  const { t, i18n } = useTranslation();
  const Rendererror = ({ touched, error }) => {
    if (touched && error) {
      return (
        <Text style={{ color: 'red' }}>{error}</Text>
      )
    }
  }


  return (
    <>
      <SelectPicker
        {...rest}
        onValueChange={input.onChange}
        style={{
          borderColor: '#5da7ec',
          // backgroundColor: '#5da7ec',
          borderWidth: 1,
          width: '100%',
          borderRadius: 15,
          // marginLeft: 20
        }}
        titleText={titleText}
        //   defaultValue={oldvalue}

        placeholder={oldvalue}
        doneButtonTextStyle={select_value ? { backgroundColor: '#58db56' } : { backgroundColor: 'none' }}


      >


        {Object.values(test).map((val, index) => (
          <SelectPicker.Item label={t(val.mm_name)} value={val.id} key={val.id} />
        ))}

      </SelectPicker>
      {Rendererror(meta)}
    </>
  )
}

export default Deptrenderselect