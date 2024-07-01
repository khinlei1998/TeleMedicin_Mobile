import React, { useEffect, useState } from 'react';
import { Text, View, Image, ScrollView, StyleSheet, TouchableOpacity, } from 'react-native';
import { reduxForm, } from 'redux-form';
import { connect } from "react-redux";
import RadioButtonRN from 'radio-buttons-react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SweetAlert from 'react-native-sweet-alert';
import { RadioButton } from 'react-native-paper';


const Language = (props) => {
    const { all_languages } = props
    const [lng, setlng] = useState()

    const data = [
        {
            label: 'Burmese',
            accessibilityLabel: 'br'
        },
        {
            label: 'English',
            accessibilityLabel: 'en'
        },
        {
            label: 'Chin',
            accessibilityLabel: 'cn'
        }

    ];

    const [checked, setChecked] = React.useState('first');
    const [value, setValue] = React.useState('first');

    useEffect(() => {
        AsyncStorage.getItem("lng").then((token) => {
            setlng(token)
        })


    }, [])


    // const language = all_languages.map(({ name, value }) => ({ label: name, accessibilityLabel: value }));
    //language
    const { t, i18n } = useTranslation();
    const presslng = async (value) => {
        i18n.changeLanguage(value)
        await AsyncStorage.setItem("lng", value);
        if (value == 'en' || value == 'br' || value == 'cn') {
            SweetAlert.showAlertWithOptions({
                title: 'Languaged Changed',
                subTitle: '',
                confirmButtonTitle: 'OK',
                confirmButtonColor: '#000',
                otherButtonTitle: 'Cancel',
                otherButtonColor: '#dedede',
                style: 'success',
                cancellable: true
            },
                callback => console.log('callback'));
        } else {
            SweetAlert.showAlertWithOptions({
                title: 'Sorry Language is Unavailable',
                subTitle: '',
                confirmButtonTitle: 'OK',
                confirmButtonColor: '#000',
                otherButtonTitle: 'Cancel',
                otherButtonColor: '#dedede',
                style: 'error',
                cancellable: true
            },
                callback => console.log('callback'));
        }
        props.navigation.goBack()
    }
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 30, }}>
                <Image style={{ width: 80, height: 80 }} source={require('../../../assets/images/category/globalization.png')} />
                <Text style={{ marginTop: 20 }}>{t('Choose Language')}</Text>
            </View>

            <ScrollView style={{ flex: 1, marginTop: 20 }}>
                {/* <RadioButtonRN
                    data={data}
                    selectedBtn={(e) => setlng(e.accessibilityLabel)}

                /> */}

                <RadioButton.Group onValueChange={e => setlng(e)} value={lng}>
                    <RadioButton.Item label="Burmese" value="br" />
                    <View
                        style={{
                            marginTop: 10,
                            borderBottomColor: '#cccccc',
                            borderBottomWidth: 1,
                            marginLeft: 10,
                            marginRight: 10
                        }}
                    />
                    <RadioButton.Item label="English" value="en" />
                    <View
                        style={{
                            marginTop: 10,
                            borderBottomColor: '#cccccc',
                            borderBottomWidth: 1,
                            marginLeft: 10,
                            marginRight: 10
                        }}
                    />
                    <RadioButton.Item label="Chin" value="cn" />
                    <View
                        style={{
                            marginTop: 10,
                            borderBottomColor: '#cccccc',
                            borderBottomWidth: 1,
                            marginLeft: 10,
                            marginRight: 10
                        }}
                    />
                    {/* <RadioButton.Item label="Chin" value="cn" /> */}
                </RadioButton.Group>


            </ScrollView>

            <TouchableOpacity style={styles.signButton} onPress={() => presslng(lng)} >


                <LinearGradient
                    colors={["#2980B9", "#6DD5FA"]}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.signGradient}
                >
                    <Text style={styles.signText}>Confirm</Text>
                </LinearGradient>
            </TouchableOpacity>

        </View>
    );
}


const stateToProps = state => {
    return {

        all_languages: state.language.all_languages

    };
}
const languagewrpa = reduxForm({
    form: "languageform",
    // validate

})(Language)
export default connect(stateToProps, null)(languagewrpa)
const styles = StyleSheet.create({
    signGradient: {
        height: 45,
        width: '100%',
        borderRadius: 15,
        justifyContent: "center",
        marginTop: 30,
    },

    signText: {
        color: "#fff",
        alignSelf: "center",
        fontFamily: "Poppins_600SemiBold",
        fontSize: 13,
    },

    signButton: {
        width: "100%",
        marginVertical: 7,
        paddingHorizontal: 9,

    },
})