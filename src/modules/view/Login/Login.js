import React, { useState, useEffect } from "react";
import { View, Image, Text, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import LinearGradient from 'react-native-linear-gradient';
import { Field, reduxForm } from 'redux-form';
import Textinput from "../../ui/TextInput";
import { connect } from "react-redux";
import { fetchlogin } from "../../../redux/Login";
// const Logo = require('../../../../assets/Login5/logo.png');
const LogoBg = require('../../../../assets/Login5/newbg3.jpg');
import SweetAlert from 'react-native-sweet-alert';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
const windowHeight = Dimensions.get("window").height;

const Login = (props) => {
  const [phone, setphoneno] = useState()
  const { t, i18n } = useTranslation();
  useEffect(() => {

    AsyncStorage.getItem("Phone_no").then((token) => {
      if (token) {

        setphoneno(token)

      }
    })


    props.navigation.addListener('focus', () => {
      AsyncStorage.getItem("Phone_no").then((token) => {
        if (token) {
          setphoneno(token)
        }
      })
    })
  }, [])
  const [spinner, setclosespinner] = useState(false);
  const { handleSubmit } = props


  const onSubmit = (values) => {

    setclosespinner(true)
    props.fetchlogin(values, (type) => {
      if (type == 'loginsuccess') {
        setclosespinner(false)
        props.initialize()
        SweetAlert.showAlertWithOptions({
          title: 'Login Successfully',
          subTitle: '',
          confirmButtonTitle: 'OK',
          confirmButtonColor: '#000',
          otherButtonTitle: 'Cancel',
          otherButtonColor: '#dedede',
          style: 'success',
          cancellable: true
        }),
          props.navigation.goBack()


      } else {
        setclosespinner(false)
        SweetAlert.showAlertWithOptions({
          title: 'Login Invalid',
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
    })
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>

      <ScrollView vertical={true} contentContainerStyle={{ flexGrow: 1 }}>
        <SafeAreaView style={styles.container}>

          <Image
            style={{ width: '100%', height: 600 }}
            source={LogoBg} />

          <View style={styles.content}>
            <View style={[styles.row, styles.titleArea]}>
              <Text style={styles.title}>{t("Log In")}</Text>
            </View>

            <Field parse={value => Number(value)} name="phone_number" iconname="phone" label={t('Phone Number')} component={Textinput} placeholder={'Phone Number'} />

            <Field name="password" iconname="lock" label={t('Password')} component={Textinput} placeholder={'Password'} secureTextEntry />

            <View style={[styles.row, styles.rememberArea]}>
              {phone ?
                <>
                </>
                :
                <View style={{ width: '50%' }}>
                  <TouchableOpacity onPress={() => { props.navigation.navigate('Signup') }}>
                    <Text style={styles.signupText}>{t('New User ? Sign Up')}</Text>
                  </TouchableOpacity>
                </View>

              }
              <View style={{ width: '50%' }}>
                <TouchableOpacity onPress={() => { props.navigation.navigate('Forgot Password') }} >
                  <Text style={styles.forgetText}>{t('Forgot Password?')}</Text>
                </TouchableOpacity>
              </View>

            </View>


            <TouchableOpacity style={styles.signButton} onPress={handleSubmit(onSubmit)}>

              <LinearGradient
                colors={["#2980B9", "#6DD5FA"]}
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 0 }}
                style={styles.signGradient}
              >
                <Text style={styles.signText}>{t("Login")}</Text>
              </LinearGradient>
            </TouchableOpacity>

            <View style={{ position: 'absolute', top: "50%", right: 0, left: 0 }}>
              {spinner ?
                <Spinner
                  visible={spinner}
                  textContent={'Loading...'}
                  textStyle={styles.spinnerTextStyle}
                />
                :
                <Text></Text>
              }
            </View>

          </View>
        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView >
  );
}


const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: '#FFF'
  },
  row: {
    flexDirection: "row",
  },

  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    paddingBottom: 5,
  },

  logoWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },

  logoImgContainer: {
    width: 26,
    height: 26,
  },

  logo: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },

  logoText: {
    fontSize: 18,
    fontFamily: "Exo_900Black",
    color: "#EC0C92",
    marginLeft: 8,
  },

  imageContainer: {
    width: "100%",
    height: "100%",
    minHeight: windowHeight * 0.42,
    marginTop: -35,
    zIndex: -1,
  },

  image: {
    flex: 1,
    width: "100%",
    height: "100%",
    marginTop: 35,
  },

  content: {
    width: "100%",
    maxWidth: 450,
    alignItems: "center",
    paddingHorizontal: 30,
    marginTop: -350
  },

  titleArea: {
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "1%",
    marginBottom: 8,
    paddingHorizontal: 9,
  },

  title: {
    fontSize: 20,
    fontFamily: "Poppins_700Bold",
  },

  socialButton: {
    borderWidth: 0.8,
    borderColor: "#c9c9c9",
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },

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

  icon: {
    marginLeft: 7,
  },

  inputStyle: {
    marginLeft: 10,
    fontSize: 13,
  },

  rememberArea: {
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 9,
    marginTop: -4,
  },

  switch: {
    transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }],
  },

  remember: {
    alignItems: "center",
  },

  rememberText: {
    fontSize: 13,
    fontFamily: "Poppins_600SemiBold",
  },

  forgetText: {
    fontSize: 13,
    fontWeight: 'bold',
    fontFamily: "Poppins_600SemiBold",
    color: "#EC4468",
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20
  },

  signupText: {
    fontSize: 13,
    fontWeight: 'bold',
    fontFamily: "Poppins_600SemiBold",
    color: "#4a8dcb",
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20
  },

  signButton: {
    width: "100%",
    marginVertical: 7,
    paddingHorizontal: 9,
  },

  inputDate: {
    width: "100%",
  },

  dropStyle: {
    borderRadius: 30,
    marginTop: 20,
    width: "100%"
  },

  signGradient: {
    height: 45,
    borderRadius: 15,
    justifyContent: "center",
  },

  signText: {
    color: "#fff",
    alignSelf: "center",
    fontFamily: "Poppins_600SemiBold",
    fontSize: 13,
  },
});

const formwrapp = reduxForm({
  form: "LoginForm",
  // validate
})(Login)
export default connect(null, { fetchlogin })(formwrapp)
