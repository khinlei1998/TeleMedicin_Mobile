import React from "react";
import SelectPicker from 'react-native-form-select-picker'; // Import the package

import { Text, } from 'react-native';
const PatientSelect = ({ getvalue, oldvalue, meta, titleText, options, input, onValueChange, ...rest }) => {
    const test = options.map((value) => value)
    const select_value = input.value
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
                    // borderColor: '#d1cdcd',
                    // borderWidth: 1,
                    // width: '100%',
                    // borderRadius: 15,
                    borderColor: '#5da7ec',
                    // backgroundColor: 'red',
                    borderWidth: 1,
                    width: '100%',
                    borderRadius: 15,
                    color: '#5da7ec'
                    // marginLeft: 20
                }}
                titleText={titleText}
                placeholder={oldvalue}
                doneButtonTextStyle={select_value ? { backgroundColor: '#58db56' } : { backgroundColor: 'none' }}
                placeholderStyle={{ fontSize: 15, color: '#454545' }}

            >
                {test.map((val) => (

                    <SelectPicker.Item label={val.sub_patient_info.name} value={val.sub_patient_info.id} key={val.sub_patient_info.id} />
                ))}

            </SelectPicker>
            {Rendererror(meta)}
        </>
    )
}

export default PatientSelect