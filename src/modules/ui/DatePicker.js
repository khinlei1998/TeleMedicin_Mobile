
import React from "react";
import { Input } from "react-native-elements";
import { Icon } from 'react-native-elements';
import moment from 'moment';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const DatePickerInput = ({ meta, input, time_abel, starttimeonchange, showtests, testdate, showTimepicker, selecttime, hidedate, gatvalue, showdate, onConfirm, visible, label, ...inputProps }) => {
   testdate ? input.onChange(moment(testdate).format('LT')) : input.onChange(moment(gatvalue).format("YYYY-MM-DD"))

   const Rendererror = ({ touched, error }) => {
      if (touched && error) {
         return (
            <Text style={{ color: 'red' }}>{error}</Text>
         )
      }
   }
   return (
      selecttime ?
         <TouchableOpacity onPress={showTimepicker}>
            <Input
               errorStyle={{ height: 0 }}
               labelStyle={styles.labelStyle}
               inputContainerStyle={styles.inputContainerStyle}
               leftIconContainerStyle={styles.leftIconContainerStyle}
               leftIcon={
                  <Icon
                     name='clock-o'
                     type='font-awesome'
                     color='#4a8dcb'
                     size={22}
                  />
               }
               inputStyle={styles.inputStyle}
               label={time_abel}
               value={testdate ? moment(testdate).format('LT') : ''}
               onFocus={showTimepicker}
            />
            {showtests && (
               <DateTimePicker
                  testID="dateTimePicker"
                  value={testdate}
                  mode='time'
                  is24Hour={false}
                  display="default"
                  onChange={starttimeonchange}
               />
            )}
            {Rendererror(meta)}
         </TouchableOpacity>
         :


         <TouchableOpacity style={styles.inputDate} onPress={showdate}  >
            <Input
               {...inputProps}
               errorStyle={{ height: 0 }}
               labelStyle={styles.labelStyle}
               inputContainerStyle={styles.inputContainerStyle}
               leftIconContainerStyle={styles.leftIconContainerStyle}
               leftIcon={
                  <Icon
                     name='calendar'
                     type='font-awesome'
                     color='#4a8dcb'
                     size={22}
                  />
               }
               inputStyle={styles.inputStyle}
               label={label}
               value={gatvalue ? moment(gatvalue.toString()).format('l') : ''}
               onFocus={showdate}
               // placeholder="Date of Birth"
               onChangeText={input.onChange}

            />
            <DateTimePickerModal
               isVisible={visible}
               mode="date"
               onConfirm={onConfirm}
               onCancel={hidedate}
            // format="YYYY-MM-DD"
            />
            {Rendererror(meta)}


         </TouchableOpacity>

   )
}

export default DatePickerInput
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
