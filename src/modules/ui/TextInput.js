import React from 'react';
import { TextInput, Text, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements'
import { Input } from "react-native-elements";
const Textinput = (props) => {
    const { disabled, secureTextEntry, age_now, oldvalue, value, ref, type, iconname, input, meta, label, description, ...inputProps } = props
    // const test = parseInt(age_now)
    // input.onChange(age_now)



    const Rendererror = ({ touched, error }) => {
        if (touched && error) {
            return (
                <Text style={{ color: 'red' }}>{error}</Text>
            )
        }
    }
    return (

        <>
            <Input
                {...inputProps}
                errorStyle={{ height: 0 }}
                labelStyle={styles.labelStyle}
                inputContainerStyle={styles.inputContainerStyle}
                leftIconContainerStyle={styles.leftIconContainerStyle}
                leftIcon={<Icon
                    name={iconname}
                    type='font-awesome'
                    color='#4a8dcb'
                    size={22}
                    onPress={() => console.log('hello')} />
                }
                inputStyle={styles.inputStyle}
                label={label}
                type={input.type}
                // ref={ref} 
                // value={test ? test : "1"}
                //   value="4" 
                defaultValue={oldvalue}
                // value={age_now?age_now:'ee'}
                onChangeText={input.onChange}
                secureTextEntry={secureTextEntry ? true : false}
                disabled={disabled ? true : false}
            />
            {Rendererror(meta)}
        </>


    )
}
export default Textinput
const styles = StyleSheet.create({
    labelStyle: {
        marginBottom: 6,
        marginLeft: 7,
        fontSize: 14,
        fontWeight: 'bold'
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
        borderColor: "#c9c9c9",
    },


    inputStyle: {
        marginLeft: 10,
        fontSize: 13,
    },

})