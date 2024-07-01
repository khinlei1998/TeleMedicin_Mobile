import React, { useState, useEffect, useCallback } from "react";
import { View, Pressable, Image, ScrollView, TouchableOpacity, Modal, Linking, } from 'react-native';
import {
  Avatar,
  Title,
  Caption,
  Text,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Share from 'react-native-share';
import { useTranslation } from 'react-i18next';
import { connect, useDispatch } from "react-redux";
import { fetchlanguage } from "../../redux/ChangeLanguage";
import AsyncStorage from '@react-native-async-storage/async-storage';
import SweetAlert from 'react-native-sweet-alert';
import Textinput from "../ui/TextInput";
import RenderSelect from "../ui/DropDownPicker";
import { fetchgender } from "../../redux/genderreducer";
import RenderImage from "../ui/RenderImage";
import LinearGradient from 'react-native-linear-gradient';
import { fetchpatientbyphoneno, killuser, fetchappointmentbyphoneno } from "../../redux/Patientreducer";
import { useNavigation } from '@react-navigation/core';
import { Field, reduxForm, reset } from 'redux-form';
import { PHOTO_URL } from "../../components/common";
import { fetchappointment } from "../../redux/Appointmentreducer";
import firebase from '@react-native-firebase/app';
import Textarea from "../ui/Textarea";
import { fetch_feedback } from "../../redux/Feedbackreducer";
import { styles } from "./profileview_css";
import validate from "./validate";
import { RatingUi } from "../ui/Rating";
const cancel2 = require('../../../assets/images/category/next.png');
const ProfileScreen = (props) => {
  const dispatch = useDispatch();

  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [feedbackmodalVisible, setFeedbackModalVisible] = useState(false);
  const [logoutmodalVisible, setVisible] = useState(false)
  const [selected, setSelected] = useState();
  const [imagemodalVisible, setimageVisible] = useState(false);
  const [fileData, setfileData] = useState();
  const [fileUri, setfileUri] = useState();
  const [editprofileVisible, seteditprofileVisible] = useState(false)
  const [phone, setphoneno] = useState()
  const [feedback, setFeedback] = useState()
  const { all_gender, patient_by_phone_no, handleSubmit, app_by_phone } = props
  const [profileshow, setprofileshow] = useState(false)
  const fburl = "fb://page/107578778274582";
  const viberurl = "viber://contact?number=959965767923"
  const utubeurl = "https://www.youtube.com/channel/UClNGqdcMc9n618-VfwTlIxg"
  const defaultuser = require('../../../assets/images/category/user.png')

  useEffect(() => {
    AsyncStorage.getItem("Phone_no").then((token) => {
      if (token) {
        setprofileshow(true)
      } else {
        setphoneno('')
      }
    })

    AsyncStorage.getItem("lng").then((token) => {
      i18n.changeLanguage(token)
    });
    navigation.addListener('focus', () => {

      AsyncStorage.getItem("Phone_no").then((token) => {
        setphoneno(token)
        if (token) {
          setphoneno(token)
          setprofileshow(true)
          props.fetchpatientbyphoneno(token)
          props.fetchappointment()
          props.fetchappointmentbyphoneno(token)
        }
      })
    }),
      props.fetchgender()
  }, []);

  const OpenURLButton = ({ url }) => {
    const handlePress = useCallback(async () => {
      const supported = await Linking.canOpenURL(url);

      if (supported) {
        await Linking.openURL(url);
      } else {
        console.log("Don't know how to open this URL")
      }
    }, [url]);
    return (
      <TouchableOpacity onPress={() => handlePress()} >
        <Image style={{ width: 27, height: 27, margin: 5, }} source={require('../../../assets/images/category/facebook-logo.png')} />
      </TouchableOpacity>
    )
  };

  const clickwallet = () => {
    SweetAlert.showAlertWithOptions({
      title: "This Feature is Not Available",
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

  const OpenutubeButton = ({ url }) => {
    const handlePress = useCallback(async () => {
      const supported = await Linking.canOpenURL(url);

      if (supported) {
        await Linking.openURL(url);
      } else {
        console.log("Don't know how to open this URL")
      }
    }, [url]);
    return (
      <TouchableOpacity onPress={() => handlePress()} >
        <Image style={{ width: 27, height: 27, margin: 5, }} source={require('../../../assets/images/category/youtube.png')} />
      </TouchableOpacity>
    )
  };
  const imageGalleryLaunch = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',

      },
    };

    launchImageLibrary(options, (res) => {
      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      } else if (res.customButton) {
        console.log('User tapped custom button: ', res.customButton);
        alert(res.customButton);
      } else {
        const source = { uri: res.fileName };
        console.log('res', res);
        setfilePath(res);
        setfileData(res.assets[0].fileName);
        setfileUri(res.assets[0].uri)

      }
    });
    setimageVisible(!modalVisible)
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
        const source = { uri: res };
        setfilePath(res);
        setfileData(res.assets[0].fileName);
        setfileUri(res.assets[0].uri)
      }
    });
    setimageVisible(!modalVisible)
  }

  const myCustomShare = async () => {
    const shareOptions = {
      message: 'TeleMedicine Myanmar Application',
      url: 'https://playstor.com/appid=?theathmm',
    }

    try {
      const ShareResponse = await Share.open(shareOptions);
    } catch (error) {
      console.log('Error => ', error);
    }
  };


  //language
  const { t, i18n } = useTranslation();


  const btnlogout = async () => {
    setVisible(!logoutmodalVisible)
    setprofileshow(false)
    props.killuser()

    await AsyncStorage.removeItem('Phone_no');
    await AsyncStorage.removeItem('Auth_Key');
    // await AsyncStorage.removeItem('device_token');
    firebase.auth().signOut();
    props.navigation.navigate(t('Home'));

  }

  // image upload
  const modalvisibile = () => {

    setimageVisible(true)
  }

  const btnfeedback = (values) => {
    const feedbacklist = Object.assign({}, values, {
      user_id: patient_by_phone_no.id,
    })
    props.fetch_feedback(feedbacklist, (type) => {
      if (type == 'feedbacksuccess') {
        SweetAlert.showAlertWithOptions({
          title: ' Successfully Saved',
          subTitle: '',
          confirmButtonTitle: 'OK',
          confirmButtonColor: '#000',
          otherButtonTitle: 'Cancel',
          otherButtonColor: '#dedede',
          style: 'success',
          cancellable: true
        }),
          dispatch(reset('Profileditform'));
        setFeedbackModalVisible(false)
        props.navigation.navigate('Home');

      } else {

        SweetAlert.showAlertWithOptions({
          title: 'Wrong',
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
  const clickAppointment = () => {
    if (phone) {
      props.navigation.navigate(t('Appointment List'))
    } else {
      props.navigation.navigate('Login')
    }
  }

  const btncustomersupport = () => {
    if (phone) {
      props.navigation.navigate('Customer Support Chat')
    } else {
      props.navigation.navigate('Login')
    }
  }

  return (

    <ScrollView style={styles.container}>
      {/* edit profile modal */}
      <Modal
        transparent={false}
        coverScreen={false}
        backdropColor={'green'}

        visible={editprofileVisible}

      >
        <View style={styles.centeredView}>
          <View style={{
            width: '100%', backgroundColor: "white", shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
          }}>


            <View style={{ position: 'absolute', right: 0 }}>
              <TouchableOpacity onPress={() => seteditprofileVisible(!editprofileVisible)}>
                <Image style={{ width: 40, height: 40, }} source={require('../../../assets/images/pages/cancel.png')} />

              </TouchableOpacity>
            </View>


            <View style={{
              marginTop: 20,
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <Avatar.Image
                source={{
                  uri: 'https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper.png',
                }}
                size={80}

              />
            </View>

            <Field name="name" type="numeric" iconname="phone" label="Phone Number" component={Textinput} placeholder={'Phone Number'} />

            <Field name="phone_number" type="numeric" iconname="phone" label="Phone Number" component={Textinput} placeholder={'Phone Number'} />

            <Text style={{ fontWeight: 'bold', color: '#8a8888', textAlign: 'left', alignSelf: 'stretch', marginLeft: 15 }}>Please Choose Gender</Text>

            <Field
              name="gender"
              getvalue={selected}
              component={RenderSelect}
              options={all_gender}
              setValue={setSelected}
              titleText="Please select gender"
              type="number"
              parse={value => Number(value)}
            />


            <Field label="Choose Your Image" modalVisible={imagemodalVisible} modalvisibile={modalvisibile} fileData={fileData} camera={camera} fileUri={fileUri} name="image" imageGalleryLaunch={imageGalleryLaunch} component={RenderImage} />

            <TouchableOpacity style={styles.signButton}  >
              <LinearGradient
                colors={["#67a219", "#76b81f"]}
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 0 }}
                style={styles.signGradient}
              >
                <Text style={styles.signText}>Update</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* logout modal */}
      <Modal
        animationType="slide"
        transparent={true}
        coverScreen={true}
        visible={logoutmodalVisible}
        onRequestClose={() => {
          setVisible(!logoutmodalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={{ fontSize: 15, textAlign: 'center', fontWeight: 'bold', fontSize: 20, color: '#777777' }}>Are you sure want to logout?</Text>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 20,
            }}>
              <TouchableOpacity onPress={() => { btnlogout() }}>
                <LinearGradient
                  colors={["#dc3545", "#c9525d"]}
                  start={{ x: 0, y: 1 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.signGradient}
                >
                  <Text style={styles.signText}>OK</Text>
                </LinearGradient>

              </TouchableOpacity>
              <TouchableOpacity onPress={() => setVisible(!logoutmodalVisible)}>
                <LinearGradient
                  colors={["#96c557", "#89bb47"]}
                  start={{ x: 0, y: 1 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.signGradient2}
                >
                  <Text style={styles.signText}>Cancel</Text>
                </LinearGradient>

              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      {/* About Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        coverScreen={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.titletext}>TeleHealth Myanmar Application</Text>
            <Text style={styles.modalText}>TeleHealth Myanmar is a start-up non-profit health organization established in 2021. Members of Telehealth Myanmar are volunteers from Medical, IT, Business, and other professions in Myanmar and Overseas. TeleHealth Myanmar promotes health equity in Myanmar.
              TeleHealth Myanmar is a product of the BACI’s Center for Research, Policy and Innovation (CRPI) - summer 2021. Since its launch, it has already provided free virtual consultation to over 12,000+ patients during the COVID-19 crisis as well as published and actively shared, with the public, health knowledge through an online platform. TeleHealth Myanmar is strengthening its system of health service delivery while supporting local resident health workforce in remote areas where health services are not easily accessible.
              .</Text>

            <Text style={styles.info}>Version 1.0</Text>
            <Text style={styles.info}>Make with love by AGGA</Text>

            <View style={{
              flex: 1, justifyContent: 'center',
              alignItems: 'center',
            }}>
              <View style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
              }}>
                <OpenURLButton url={fburl}>Open Supported URL</OpenURLButton>
                <OpenutubeButton url={utubeurl}>Open Supported URL</OpenutubeButton>
              </View>
            </View>

            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >

              <Text style={styles.textStyle}>Close</Text>
            </Pressable>

          </View>
        </View>
      </Modal>

      {/* FeedbackModal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={feedbackmodalVisible}
        onRequestClose={() => {
          alert('jj ')

        }}
        onBackdropPress={() => console.log('hrr')}
      >
        <View style={styles.centeredView}>
          <View style={styles.feedbackmodalView}>
            <View style={styles.feedbackimg}>
              <Image style={{ width: 50, height: 50 }} source={require('../../../assets/images/category/feedback2.png')} />
            </View>

            <Text style={{ fontSize: 20, marginTop: 30 }}>Send Us Your Feedback!</Text>

            <Field name="rate" component={RatingUi} titlerating="ဝန်ဆောင်မူကိုအဆင်ပြေပါသလား?" />

            <Field name="description" component={Textarea} placeholder="Remark" />

            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 20,
            }}>
              <Pressable
                style={[styles.button, styles.feedbacksubmitClose]}
                onPress={handleSubmit(btnfeedback)}
              >

                <Text style={styles.textStyle}>Submit</Text>
              </Pressable>


              <Pressable
                style={[styles.button, styles.feedbackcancelbutton]}
                onPress={() => setFeedbackModalVisible(!feedbackmodalVisible)}
              >

                <Text style={styles.textStyle}>Cancel</Text>
              </Pressable>
            </View>

          </View>
        </View>
      </Modal >

      {
        profileshow === false ?

          <></>


          :
          <>
            <View style={styles.userInfoSection}>
              <View style={{ flexDirection: 'row', marginTop: 15 }}>
                <Avatar.Image
                  source={{
                    uri: patient_by_phone_no.image == null ? `https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper.png` : `${PHOTO_URL}` + patient_by_phone_no.image,

                  }}
                  size={80}
                />
                <View style={{ marginLeft: 20, }}>
                  <Title style={[styles.title, {
                    marginTop: 15,
                    marginBottom: 5,
                  }]}>{patient_by_phone_no ? patient_by_phone_no.name : 'No data'}</Title>
                </View>
              </View>

              <View style={{ marginLeft: 70, marginTop: -30 }}>
                <TouchableOpacity onPress={() => { props.navigation.navigate('Edit Profile', { paramkey: patient_by_phone_no }) }}>
                  <View style={styles.menuItem}>
                    <Image style={{ width: 25, height: 25 }} source={require('../../../assets/images/category/edit1.png')} />
                    <Text style={{ fontWeight: 'bold', color: '#777777' }}>Edit Profile</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.userInfoSection}>
              <View style={styles.row}>
                <Icon name="map-marker-radius" color="#777777" size={20} />
                <Text style={{ color: "#777777", marginLeft: 20 }}>{patient_by_phone_no ? patient_by_phone_no.address == '' ? patient_by_phone_no.address : 'No Data' : 'No data'}</Text>

              </View>

              <View style={styles.row}>
                <Icon name="phone" color="#777777" size={20} />
                <Text style={{ color: "#777777", marginLeft: 20 }}>{patient_by_phone_no ? patient_by_phone_no.phone_number : 'No Data'}</Text>
              </View>

            </View>
          </>
      }
      <View style={styles.infoBoxWrapper}>
        <TouchableOpacity style={[styles.infoBox, {
          borderRightColor: '#dddddd',
          borderRightWidth: 1
        }]} onPress={() => clickwallet()}>


          <View >
            <Image style={{ width: 40, height: 40 }} source={require('../../../assets/images/category/wallet.png')} />
            <Title>0.00 MMK</Title>
            <Caption>Wallet</Caption>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.infoBox} onPress={() => clickAppointment()}>
          <View>

            <Image style={{ width: 40, height: 40 }} source={require('../../../assets/images/category/medical.png')} />
            <Title>{app_by_phone ? app_by_phone.length : 0}</Title>
            <Caption>{t("Appointments")}</Caption>

          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.menuWrapper}>
        <TouchableOpacity onPress={() => navigation.navigate("Language")}>
          <View style={styles.menuItem} >
            <Image style={{ width: 35, height: 35 }} source={require('../../../assets/images/category/translate.png')} />
            <Text style={styles.menuItemText}>{t('Language')}</Text>

            <Image
              // resizeMode="contain"
              source={cancel2}
              style={styles.itemImage}
            />
          </View>

        </TouchableOpacity>
        <TouchableOpacity onPress={myCustomShare}>
          <View style={styles.menuItem}>
            <Image style={{ width: 35, height: 35 }} source={require('../../../assets/images/category/share.png')} />
            <Text style={styles.menuItemText}>{t('Tell Your Friends')}</Text>
          </View>
        </TouchableOpacity>
        {profileshow === false ?
          <>
          </>
          :

          <TouchableOpacity onPress={() => { setFeedbackModalVisible(true) }}>
            <View style={styles.menuItem}>
              <Image style={{ width: 40, height: 40 }} source={require('../../../assets/images/category/comment.png')} />
              <Text style={styles.menuItemText}>{t('Feedback')}</Text>
            </View>
          </TouchableOpacity>
        }

        {profileshow === false ?
          <>
          </>
          :

          <TouchableOpacity onPress={() => props.navigation.navigate('paymenttran')} >
            <View style={styles.menuItem}>
              <Image style={{ width: 40, height: 40 }} source={require('../../../assets/images/category/comment.png')} />
              <Text style={styles.menuItemText}>{t('Payment Transaction')}</Text>
            </View>
          </TouchableOpacity>
        }
        <TouchableOpacity onPress={() => { props.navigation.navigate('Guide') }}>
          <View style={styles.menuItem}>
            <Image style={{ width: 40, height: 40 }} source={require('../../../assets/images/category/user-guide.png')} />
            <Text style={styles.menuItemText}>{t('App Guide')}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { setModalVisible(true) }}>
          <View style={styles.menuItem}>
            <Image style={{ width: 40, height: 40 }} source={require('../../../assets/images/category/information1.png')} />
            <Text style={styles.menuItemText}>{t('About')}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => btncustomersupport()}>
          <View style={styles.menuItem}>
            <Image style={{ width: 40, height: 40 }} source={require('../../../assets/images/category/customer-support.png')} />
            <Text style={styles.menuItemText}>{t('Support')}</Text>
          </View>
        </TouchableOpacity>
        {profileshow === false ?
          <>
          </>
          :
          <TouchableOpacity onPress={() => { setVisible(true) }}>
            <View style={styles.menuItem}>
              <Image style={{ width: 40, height: 40 }} source={require('../../../assets/images/category/logout.png')} />
              <Text style={styles.menuItemText}>{t('Logout')}</Text>
            </View>
          </TouchableOpacity>
        }

      </View>
    </ScrollView >
  );
};
function maptoprops(state) {
  return {
    all_gender: state.gender.genders,
    patient_by_phone_no: state.patient.patient_by_phoneno,
    signed_user: state.user.user,
    all_appointments: state.appointment.appointment_by_phoneno,
    all_languages: state.language.all_languages,
    app_by_phone: state.patient.app_by_phoneno

  }
}
const profilewrap = reduxForm({
  form: "Profileditform",
  validate
})(ProfileScreen)

export default connect(maptoprops, { fetchgender, fetchpatientbyphoneno, killuser, fetchappointment, fetchlanguage, fetchappointmentbyphoneno, fetch_feedback })(profilewrap)

