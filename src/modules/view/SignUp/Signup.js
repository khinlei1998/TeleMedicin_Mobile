import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, ScrollView, KeyboardAvoidingView } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import Textinput from '../../ui/TextInput';
import { Field, reduxForm, reset, } from 'redux-form';
import DatePickerInput from '../../ui/DatePicker';
import RenderSelect from '../../ui/DropDownPicker';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from "react-redux";
import { fetchstate } from '../../../redux/Statereducer';
import { fetchtownship } from '../../../redux/Townshipreducer';
import { fetchgender } from '../../../redux/genderreducer';
import { createuser, fetchsignupdata } from '../../../redux/Signupreducer';
import validate from './validate';
import Textarea from '../../ui/Textarea';
import moment from 'moment';
import RenderImage from '../../ui/RenderImage';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useTranslation } from 'react-i18next';
import { killtown } from '../../../redux/Townshipreducer';
const Signup = (props) => {
  const { t, i18n } = useTranslation();
  const [modalVisible, setimageVisible] = useState(false);
  const [fileData, setfileData] = useState();
  const [fileUri, setfileUri] = useState();
  const LogoBg = require('../../../../assets/Login5/newbg3.jpg');

  const [value, setValue] = useState(null);
  //dob
  const [dobviaible, setdobPickerVisibility] = useState(false);
  const [dobdate, setdobdate] = useState('');
  const [filetype, setfiletype] = useState();
  const [resourcePath, setfilePath] = useState({});
  const [selected, setSelected] = useState();
  const { handleSubmit, all_states, all_township, all_gender, fetchstate, fetchgender, created_patient } = props


  useEffect(() => {
    fetchstate()
    fetchgender()
    return () => {
      props.killtown()
    }
  }, []);

  const dobshowpicker = () => {
    setdobPickerVisibility(true);
  };

  const onConfirm = (date) => {
    setdobdate(date)
    dobhidedatepicker();
  };
  const dobhidedatepicker = () => {
    setdobPickerVisibility(false);
  };
  const onSubmit = async (values, dispatch) => {
    const data = values
    data.register_date = moment().format("YYYY-MM-DD");
    // data.date_of_birth = values.date_of_birth != 'Invalid date' ? values.date_of_birth : '';
    // data.gender = values.gender ? values.gender : ''
    // console.log('data', data)
    // data.phone_number = 579567;

    // props.createuser(data, (type) => {

    //   if (type == 'signupsuccess') {
    //     SweetAlert.showAlertWithOptions({
    //       title: 'User Account Successfully',
    //       subTitle: '',
    //       confirmButtonTitle: 'OK',
    //       confirmButtonColor: '#000',
    //       otherButtonTitle: 'Cancel',
    //       otherButtonColor: '#dedede',
    //       style: 'success',
    //       cancellable: true
    //     }),
    //       props.navigation.navigate(t('Home'));

    //   } else {

    //     SweetAlert.showAlertWithOptions({
    //       title: 'User Account Invalid',
    //       subTitle: '',
    //       confirmButtonTitle: 'OK',
    //       confirmButtonColor: '#000',
    //       otherButtonTitle: 'Cancel',
    //       otherButtonColor: '#dedede',
    //       style: 'error',
    //       cancellable: true
    //     },
    //       callback => console.log('callback'));
    //   }
    // })
    props.navigation.navigate('Enter OTP', { data: data })
  }

  // image upload
  const modalvisibile = () => {

    setimageVisible(true)
  }

  const camera = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchCamera(options, (res) => {

      const requestCameraPermission = async () => {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
              title: "App Camera Permission",
              message: "App needs access to your camera ",
              buttonNeutral: "Ask Me Later",
              buttonNegative: "Cancel",
              buttonPositive: "OK"
            }
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("Camera permission given");
          } else {
            console.log("Camera permission denied");
          }
        } catch (err) {
          console.warn(err);
        }
      };


      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      } else if (res.customButton) {
        console.log('User tapped custom button: ', res.customButton);
        alert(res.customButton);
      } else {
        // console.log('res',res)
        const source = { uri: res };
        console.log('response', res);
        setfilePath(res);
        setfileData(res.assets[0]);
        setfileUri(res.assets[0].uri)
        setfiletype(res.assets[0].type)
      }
    });
    setimageVisible(!modalVisible)
  }

  const imageGalleryLaunch = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',

      },
    };

    launchImageLibrary(options, (res) => {
      console.log('Response = ', res.uri);


      if (res.didCancel) {
        // console.log('User cancelled image picker');
      } else if (res.error) {
        // console.log('ImagePicker Error: ', res.error);
      } else if (res.customButton) {
        // console.log('User tapped custom button: ', res.customButton);
        // alert(res.customButton);
      } else {
        const source = { uri: res.fileName };
        // console.log('res', res);
        setfilePath(res);
        setfileData(res.assets[0]);
        setfileUri(res.assets[0].uri)
        setfiletype(res.assets[0].type)

      }
    });
    setimageVisible(!modalVisible)
  }
  const handletownship = (value) => {

    props.fetchtownship(value)
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>

      <ScrollView vertical={true} contentContainerStyle={{ flexGrow: 1 }}>
        <SafeAreaView style={styles.container}>

          <Image
            style={{ width: '100%', height: 600 }}
            source={LogoBg} />


          <View style={styles.content} >
            <View style={[styles.row, styles.titleArea]}>
              <Text style={styles.title}>Sign Up</Text>

            </View>

            <Field name="name" iconname="user" label="Name" component={Textinput} placeholder={'Name'} />

            <Field name="password" iconname="lock" label="Password" component={Textinput} placeholder={'Password'} />

            <Field
              visible={dobviaible}
              onConfirm={onConfirm}
              gatvalue={dobdate}
              showdate={dobshowpicker}
              hidedate={dobhidedatepicker}
              name="date_of_birth"
              label="Date Of Birth"
              component={DatePickerInput} />

            <Field

              name="address"
              label="Address"
              placeholder="Enter Address"
              component={Textarea}
            />


            <View style={styles.dropStyle}>
              <Text style={{ fontWeight: 'bold', color: '#8a8888', textAlign: 'left', alignSelf: 'stretch', marginLeft: 18 }}>Please Choose Gender</Text>
              <Field
                name="gender"
                getvalue={selected}
                component={RenderSelect}
                options={all_gender}
                setValue={setSelected}
                titleText="Please select gender"
                type="number"
                oldvalue="Select Gender"
                parse={value => Number(value)}
              />
            </View>

            <View style={styles.dropStyle}>
              <Text style={{ fontWeight: 'bold', color: '#8a8888', textAlign: 'left', alignSelf: 'stretch', marginLeft: 15 }}>Please Choose State</Text>

              <Field
                name="state"
                getvalue={selected}
                component={RenderSelect}
                options={all_states}
                setValue={setSelected}
                onChange={handletownship}
                titleText="Please select State"
                oldvalue="Select State"

              />
            </View>

            <View style={styles.dropStyle}>
              <Text style={{ fontWeight: 'bold', color: '#8a8888', textAlign: 'left', alignSelf: 'stretch', marginLeft: 15 }}>Please Choose Township</Text>

              <Field
                name="township"
                getvalue={selected}
                component={RenderSelect}
                options={all_township}
                setValue={setSelected}
                titleText="Please select Township"
                oldvalue="Select Township"



              />
            </View>



            <Field label="Choose Your Image" modalVisible={modalVisible} modalvisibile={modalvisibile} fileData={fileData} camera={camera} fileUri={fileUri} name="image" imageGalleryLaunch={imageGalleryLaunch} component={RenderImage} />

            <TouchableOpacity style={styles.signButton} onPress={handleSubmit(onSubmit)}>


              <LinearGradient
                colors={["#2980B9", "#6DD5FA"]}
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 0 }}
                style={styles.signGradient}
              >
                <Text style={styles.signText}>Sign Up</Text>
              </LinearGradient>
            </TouchableOpacity>

          </View>

        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>


  );
}
const stateToProps = state => {
  return {
    all_states: state.state.states,
    all_township: state.township.townships,
    all_gender: state.gender.genders,
    created_patient: state.user.patientdata

  };
}
const afterSubmit = (result, dispatch) => dispatch(reset("Signup"));


const signupwrap = reduxForm({
  form: "Signup",
  validate,
  onSubmitSuccess: afterSubmit,

})(Signup)
export default connect(stateToProps, { killtown, fetchstate, fetchtownship, fetchgender, createuser, fetchsignupdata })(signupwrap)
const styles = StyleSheet.create({
  otpView: {
    width: '80%',
    height: 200,
    color: 'black',
  },

  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 2,
    color: 'black',
    borderBottomColor: 'black',
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

  content: {
    width: "100%",
    height: "100%",
    maxWidth: 450,
    paddingHorizontal: 30,
    marginTop: -360,
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
    fontSize: 28,
    fontFamily: "Poppins_700Bold",
  },

  signButton: {
    width: "100%",
    marginVertical: 7,
    paddingHorizontal: 9,
  },


  dropStyle: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    borderRadius: 30,
    marginTop: 15,
    width: '96%',
    marginLeft: 12
  },

  signGradient: {
    height: 45,
    width: '100%',
    borderRadius: 15,
    marginLeft: 7,
    justifyContent: "center",
    marginTop: 30
  },

  signText: {
    color: "#fff",
    alignSelf: "center",
    fontFamily: "Poppins_600SemiBold",
    fontSize: 13,
  },


})




