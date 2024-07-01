
import React from "react";
import { Input } from "react-native-elements";
import { Icon } from 'react-native-elements';
import moment from 'moment';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { StyleSheet, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import SelectPicker from 'react-native-form-select-picker';


const SelectPickerInput = ({selected,consult_options,label}) => {
    const selectConsultation = () => {
        // alert('hid');
        return(
            <SelectPicker
                // onValueChange={(value) => {
                //     // Do anything you want with the value. 
                //     // For example, save in state.
                //     // setSelected(value);
                // }}
                // selected={selected}
                >
                
                {Object.values(consult_options).map((val, index) => (
                    <SelectPicker.Item label={val} value={val} key={index} />
            ))}
        </SelectPicker>
        ) 
    }
   return (
    <TouchableOpacity style={styles.inputDate} onPress={selectConsultation}  >
        <Input
        errorStyle={{ height: 0 }}
        labelStyle={styles.labelStyle}
        inputContainerStyle={styles.inputContainerStyle}
        leftIconContainerStyle={styles.leftIconContainerStyle}
        leftIcon={
            <Icon
                name='calendar'
                type='font-awesome'
                color='#f50'
                size={22}
            />
        }
        inputStyle={styles.inputStyle}
        label={label}
        // value={gatvalue ? moment(gatvalue.toString()).format('l') : ''}
        //onFocus={selectConsultation}
        // placeholder="Date of Birth"
        // onChangeText={(e) => setDate(e)
        // }

        />

    </TouchableOpacity>
   )
}

export default SelectPickerInput
const styles = StyleSheet.create({
   labelStyle: {
      marginBottom: 6,
      fontSize: 13,
   },
   inputContainerStyle: {
      borderWidth: 0.8,
      borderColor: "#c9c9c9",
      borderRadius: 15,
      height: 50,
   },
   leftIconContainerStyle: {
      height: 25,
      width: 48,
      borderRightWidth: 0.8,
      borderColor: "#c9c9c9",
   },
   inputStyle: {
      marginLeft: 10,
      fontSize: 13,
   },
   inputDate: {
      width: "100%",
   },
})