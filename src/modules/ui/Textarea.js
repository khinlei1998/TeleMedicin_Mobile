import React from 'react';
import { TextInput, Text, StyleSheet } from 'react-native';
import { Icon, Input, View } from 'react-native-elements'
const Textarea = (props) => {
    const { placeholder, type, onChangeText, iconname, input, meta, label, description, ...rest } = props
    const Rendererror = ({ touched, error }) => {
        if (touched && error) {
            return (
                <Text style={{ color: 'red' }}>{error}</Text>
            )
        }
    }
    return (

        <>
            <Text style={{ fontWeight: 'bold', color: '#8a8888', textAlign: 'left', alignSelf: 'stretch', marginLeft: 15 }}>{label}</Text>
            <TextInput
                {...rest}
                type={type}
                multiline={true}
                numberOfLines={5}
                onChangeText={input.onChange}
                placeholder={placeholder}
                style={{
                    // borderRadius: 20,
                    // borderWidth: 1,
                    // height: Platform.OS === "ios" ? 60 : 80,
                    // fontSize: 16,
                    // paddingHorizontal: 10,
                    // marginHorizontal: 15,
                    // padding: 10,
                    // marginTop: 8,
                    // borderColor: '#c9c5c5',
                    // width: '95%'
                    //
                    borderRadius: 8,
                    borderWidth: 1,
                    height: Platform.OS === "ios" ? 60 : 80,
                    fontSize: 16,
                    paddingHorizontal: 10,
                    marginHorizontal: 15,
                    padding: 10,
                    marginTop: 8,
                    borderColor: '#4a8dcb',
                    width: '95%'

                }}
            />
            {Rendererror(meta)}
        </>



    )
}
export default Textarea
const styles = StyleSheet.create({




    labelStyle: {
        marginBottom: 6,
        fontSize: 13,
    },

    inputContainerStyle: {
        borderWidth: 0.8,
        borderColor: "#4a8dcb",
        borderRadius: 15,
        height: 50,
    },

    leftIconContainerStyle: {
        height: 25,
        width: 48,
        borderRightWidth: 0.8,
        borderColor: "#4a8dcb",
    },


    inputStyle: {
        marginLeft: 10,
        fontSize: 13,
    },






})