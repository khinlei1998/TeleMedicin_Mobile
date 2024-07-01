import React from "react";

import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Button, TextInput, FlatList, Modal } from 'react-native';
import { Icon } from 'react-native-elements';
import { RadioButton } from 'react-native-paper';
import { useTranslation } from 'react-i18next';


const Rendererror = ({ touched, error }) => {
    if (touched && error) {
        return (
            <Text style={{ color: 'red' }}>{error}</Text>
        )
    }
}


const Consulation_selectbox = ({ meta, consult_change, datavalue, input, ...rest }) => {
    const { t, i18n } = useTranslation();
    input.onChange(datavalue)
    return (
        <View>
            <View style={{
                paddingVertical: 12,
                paddingHorizontal: 8,
                marginTop: 10,
                flexDirection: "row",
                alignItems: "center"
            }}>
                {/* <Icon name="phone" color="#f50" size={20} /> */}
                <Text style={{ fontSize: 14, color: 'gray', fontWeight: 'bold', marginLeft: 5 }}>{t('Select Consultation Method')}</Text>

            </View>
            <View style={{
                paddingVertical: 12,
                paddingHorizontal: 20,
            }}>
                <RadioButton.Group
                    {...rest}
                    onValueChange={consult_change}
                    // onValueChange={input.onChange}
                    value={datavalue}>
                    <View style={styles.cardcotainer}>
                        <View
                            style={{
                                marginVertical: 18,
                                marginHorizontal: 10,
                                flexDirection: 'row',
                            }}
                        >
                            <RadioButton
                                value="1"
                            />
                            <Icon name="phone" color="#5da7ec" size={20} style={{ marginTop: 8 }} />
                            <Text style={{ marginTop: 8, marginLeft: 2 }}>Video Consultation</Text>

                        </View>
                        <View style={{ flexDirection: 'row', textAlign: 'center', marginHorizontal: 12, }}>
                            <RadioButton
                                value="2"
                            />
                            <Icon name="comment" color="#5da7ec" size={20} style={{ marginTop: 8 }} />
                            <Text style={{ marginTop: 6, marginLeft: 2 }}>Chat Consultation</Text>
                        </View>
                    </View>
                </RadioButton.Group>

            </View>
            {Rendererror(meta)}
        </View>

    )
}
export default Consulation_selectbox
const styles = StyleSheet.create({
    cardcotainer: {
        width: '100%',
        height: 120,
        backgroundColor: "white",
        borderRadius: 12,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    }
})
