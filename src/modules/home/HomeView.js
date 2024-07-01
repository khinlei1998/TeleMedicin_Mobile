import React, { useEffect, useState } from 'react';
import {
  View,
  TouchableOpacity,
  StatusBar,
  Image,
  ScrollView,
  Dimensions,
  Pressable,
  Modal,
  Alert

} from 'react-native';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { reduxForm } from 'redux-form';
import { connect } from "react-redux";
import { useNavigation } from '@react-navigation/core';
import { fonts } from '../../styles';
import { Text } from '../../components/StyledText';
import { CardNine, CardNine2 } from '../../components/Cards';
import { IMAGE_URL, PHOTO_URL } from '../../components/common';
import FlashMessage, { showMessage } from "react-native-flash-message";
import DropdownAlert from 'react-native-dropdownalert';
import Carousel from "react-native-carousel-control";
import { fetchdept } from '../../redux/Department';
import { fetchdoector_by_dept } from '../../redux/Doctorreducer';
import { fetchappointment } from '../../redux/Appointmentreducer';
import { fetchchat } from '../../redux/Chatreducer';
import { useIsFocused } from '@react-navigation/core';
import { fetchinvestigationlsit } from '../../redux/Labreducer';
import { createuser } from '../../redux/Signupreducer';
import { styles } from './Homeview_css';
import Blog from '../ui/Carousel';
// import NetInfo from "@react-native-community/netinfo"; 
import { useNetInfo, NetInfo } from '@react-native-community/netinfo'
// import WifiIcon from '../../../assets/icon/Connection';
import WifiIcon from '../../../assets/icon/Connection';
const SPACING_FOR_CARD_INSET = Dimensions.get('window').width * 0.1 - 10
const CARD_WIDTH = Dimensions.get('window').width * 0.8
const labIcon = require('../../../assets/buttonicon/lab.png');
const treatmentIcon = require('../../../assets/images/category/responsive.png');
const doctorIcon = require('../../../assets/images/category/doctor.png');
const clinicIcon = require('../../../assets/images/category/hospital.png');
const blogIcon = require('../../../assets/images/category/newspaper.png');
const promotionIcon = require('../../../assets/images/category/gift.png');
const viewIcon = require('../../../assets/images/category/application.png');
const nosignal = require('../../../assets/images/category/no-signal.png');

const HomeScreen = (props) => {
  const netInfo = useNetInfo()
  const [userguide, setUserguideshow] = useState(false)
  const isFocused = useIsFocused();
  const [phone_no, setphoneno] = useState()
  const navigation = useNavigation();
  const { t, i18n } = useTranslation();

  const useruserguide = () => {
    return (
      <Text style={{ color: 'black', backgroundColor: "" }}>alert</Text>
    )
  }


  useEffect(() => {

    navigation.addListener('focus', () => {
      AsyncStorage.getItem("Phone_no").then((token) => {
        setphoneno(token)


        if (!token) {
          // showalert()
          // showflash();

        } else {
          // showguide()
          // showguideflash();
          // setloginshow(true)
          // showalert()


          props.fetchappointment()

        }
      })
    }),
      props.fetchinvestigationlsit()
    props.fetchdept()
    StatusBar.setBarStyle('light-content', true)
    StatusBar.setBackgroundColor("#5da7ec")
    AsyncStorage.getItem("lng").then((token) => {
      i18n.changeLanguage(token)
    });

  }, []);


  const actionprofiledetail = (id) => {
    navigation.navigate('Doctorprofile')
    props.fetchdoector_by_dept(id)
  }

  const clicklab = () => {
    if (phone_no) {
      props.navigation.navigate(t('Laboratory Reports'))

    } else {
      props.navigation.navigate('Login')

    }
  }

  const clicktreatment = () => {
    if (phone_no) {
      props.navigation.navigate(t('Medical Reports'))
    } else {
      props.navigation.navigate('Login')

    }
  }

  const { all_depts } = props
  const sliceddept = all_depts.slice(0, 3)

  return (
    <>
      <Blog />


      <DropdownAlert
        tapToCloseEnabled={true}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.container}>
        {!phone_no ?
          <View style={{
            width: '99%',
            height: 80,
            alignSelf: 'center',
            backgroundColor: '#5da7ec',
            shadowOpacity: 10,
            marginTop: 2,
            borderRadius: 3,
          }}>
            <Text style={{ color: 'white', marginTop: 5, alignItems: 'center', justifyContent: 'center', marginLeft: 15 }}>{t('To make an appointment, you must first login')}</Text>
            <Pressable style={styles.button} onPress={() => navigation.navigate('Login')} >
              <Text style={styles.text}>{t('Login Here')}</Text>
            </Pressable>
          </View>
          :
          <></>

        }



        <Text h1 bold style={styles.featuretext}>
          {t('Available Features')}
        </Text>

        <View style={{
          flex: 1, flexDirection: 'row',
          marginTop: 10
        }}>


          <View style={styles.featurescard}>
            <TouchableOpacity style={{ alignItems: 'center', marginTop: 5 }}
              onPress={() => clicklab()} >
              <View style={styles.subCardView}>
                <Image
                  resizeMode="contain"
                  source={labIcon}
                  style={styles.itemImage}
                />
              </View>

            </TouchableOpacity>
            <View style={styles.labcard}>
              <Text style={{ fontSize: 12, textAlign: 'center', }}>{t('Laboratory Reports')}</Text>

            </View>

          </View>

          {/* 2nd div */}
          <View style={styles.featurescard}>
            <TouchableOpacity style={{ alignItems: 'center', marginTop: 5 }}
              onPress={() => clicktreatment()} >
              <View style={styles.subCardView}>
                <Image
                  resizeMode="contain"
                  source={treatmentIcon}
                  style={styles.itemImage}
                />
              </View>
            </TouchableOpacity>
            <View style={{ flex: 1, flexDirection: 'row', marginTop: 4, marginBottom: 5 }}>
              <Text style={{ fontSize: 12, textAlign: 'center', }}>{t('Medical Reports')}</Text>

            </View>

          </View>

          <View style={{ justifyContent: "space-between", width: 12 }}>

          </View>
        </View>

        {/* 2nd row */}
        <View style={{
          flex: 1, flexDirection: 'row',
          marginTop: 10
        }}>


          <View style={{
            width: '45%', justifyContent: 'center',
            alignItems: 'center', backgroundColor: 'white', shadowColor: '#000000',
            shadowOffset: { width: 0, height: 10 },
            shadowOpacity: 10,
            elevation: 10,
            marginHorizontal: 8,
            marginLeft: 9,
            marginBottom: 5,
            borderRadius: 15,

          }}>
            <TouchableOpacity style={{ alignItems: 'center', marginTop: 5 }}
              onPress={() => navigation.navigate(t('Available Doctors'))} >
              <View style={styles.subCardView}>
                <Image
                  resizeMode="contain"
                  source={doctorIcon}
                  style={styles.itemImage}
                />
              </View>

              <View style={{ flex: 1, flexDirection: 'row', marginTop: 4, marginBottom: 5 }}>
                <Text style={{ fontSize: 12, textAlign: 'center', }}>{t('Available Doctors')}</Text>

              </View>
            </TouchableOpacity>

          </View>

          {/* 2nd div */}
          <View style={{
            width: '45%', justifyContent: 'center',
            alignItems: 'center', backgroundColor: 'white', shadowColor: '#000000',
            shadowOffset: { width: 0, height: 10 },
            shadowOpacity: 10,
            elevation: 10,
            marginHorizontal: 8,
            marginLeft: 9,
            // marginTop: 1,
            marginBottom: 5,
            borderRadius: 15,
            // height: 100

          }}>
            <TouchableOpacity style={{ alignItems: 'center', marginTop: 5 }}
              onPress={() => navigation.navigate(t('Search Clinics'))} >
              <View style={styles.subCardView}>
                <Image
                  resizeMode="contain"
                  source={clinicIcon}
                  style={styles.itemImage}
                />
              </View>
            </TouchableOpacity>
            <View style={{ flex: 1, flexDirection: 'row', marginTop: 4, marginBottom: 5 }}>
              <Text style={{ fontSize: 12, textAlign: 'center', }}>{t('Search Clinics')}</Text>

            </View>

          </View>
          <View style={{ justifyContent: "space-between", width: 12 }}>

          </View>
        </View>



        <View style={styles.content}>
          <Text h1 bold style={{ marginTop: 16, marginLeft: 15, fontFamily: fonts.primaryRegular, fontSize: 16, color: 'black' }}>
            {t('Blogs & Contents')}
          </Text>
        </View>
        <View>
          {/* <Carousel>
            <CardNine
              style={{ backgroundColor: 'black' }}
              title={"Health Blog & News"}
              subTitle={
                "သတင်းဆောင်းပါးများ ဖတ်ရှုရန်"
              }
              price={''}
              onClicked={() => {
                props.navigation.navigate('Health Blog');
              }}
            />
            <CardNine2
              title={"Promotion and Services"}
              subTitle={
                "promotion နှင့် service များလေ့လာရန်"
              }
              image={{
                uri:
                  "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"
              }}
              price={''}
              onClicked={() => {
                props.navigation.navigate('Promotion & Service')
              }}

            />
            <View style={{ justifyContent: "space-between", width: 10 }}>

            </View>
          </Carousel> */}

          <View style={{
            flex: 1, flexDirection: 'row', marginLeft: 7, marginRight: 7,
            shadowOffset: { width: 0, height: 10 },
            shadowOpacity: 8,
            elevation: 8,
            backgroundColor: 'white',
            borderRadius: 20,
            marginTop: 10
          }}>
            <View style={{ width: '50%', paddingVertical: 4, }}>
              {/* newspaper.png */}
              <View style={{
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'center',
                marginTop: 15
              }}>
                <Image
                  resizeMode="contain"
                  source={blogIcon}
                  style={{ height: '70%' }}
                />
              </View>
            </View>

            <View style={{ width: '50%', paddingVertical: 4, }}>
              <Text h1 bold style={{ marginTop: 16, fontFamily: fonts.primaryRegular, fontSize: 16, color: 'black' }}>
                {t('Blogs & Contents')}
              </Text>
              <Text style={{ marginTop: 10, fontSize: 13 }}>{t('To Read News & Contents')}</Text>

              <Pressable style={{
                flex: 1, width: '60%', marginTop: 10, paddingVertical: 5, justifyContent: 'center',

              }} onPress={() => props.navigation.navigate(t('Blogs & Contents'))} >
                <Text style={{
                  fontSize: 12,
                  // lineHeight: 21,
                  fontWeight: 'bold',
                  letterSpacing: 0.25,
                  color: 'white',
                  paddingHorizontal: 4,
                  paddingVertical: 5,
                  backgroundColor: '#5da7ec',
                  borderRadius: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                  // height: 30,
                  // marginTop: 20
                }}>{t('View All')}</Text>
              </Pressable>
            </View>

          </View>

          {/* promotion & serivce */}

          <View style={{
            flex: 1, flexDirection: 'row', marginLeft: 7, marginRight: 7,
            shadowOffset: { width: 0, height: 10 },
            shadowOpacity: 8,
            elevation: 8,
            backgroundColor: 'white',
            borderRadius: 20,
            marginTop: 10
          }}>
            <View style={{ width: '50%', paddingVertical: 4, }}>
              {/* newspaper.png */}
              <View style={{
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'center',
                marginTop: 15
              }}>
                <Image
                  resizeMode="contain"
                  source={promotionIcon}
                  style={{ height: '70%' }}
                />
              </View>
            </View>

            <View style={{ width: '50%', paddingVertical: 4, }}>
              <Text h1 bold style={{ marginTop: 16, fontFamily: fonts.primaryRegular, fontSize: 16, color: 'black' }}>
                {t('Promotion & Service')}
              </Text>
              <Text style={{ marginTop: 10, fontSize: 13 }}>{t('To Read Promotion & Services')}</Text>

              <Pressable style={{
                flex: 1, width: '60%', marginTop: 10, paddingVertical: 5, justifyContent: 'center',

              }} onPress={() => props.navigation.navigate('Promotion & Service')} >
                <Text style={{
                  fontSize: 12,
                  // lineHeight: 21,
                  fontWeight: 'bold',
                  letterSpacing: 0.25,
                  color: 'white',
                  paddingHorizontal: 4,
                  paddingVertical: 5,
                  backgroundColor: '#5da7ec',
                  borderRadius: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                  // height: 30,
                  // marginTop: 20
                }}>{t("View All")}</Text>
              </Pressable>
            </View>

          </View>
        </View>

        {/* Gp& Specility */}
        <View style={{
          flex: 1,
          width: '100%',
          flexDirection: 'row',
          // paddingBottom: 20,
          backgroundColor: 'white',
        }}>
          <View >
            <Text h1 bold style={{ marginTop: 20, marginLeft: 15, fontFamily: fonts.primaryRegular, fontSize: 16, color: 'black', }}>
              {t('GP & Speciality')}
            </Text>
          </View>
          {/* <View style={{ width: '30%' }}>
            <TouchableOpacity >
              <Text h1 bold style={{ marginTop: 20, fontFamily: fonts.primaryRegular, fontSize: 14, }}
                onPress={() => navigation.navigate('GP & Speciality')} >
                {t("View All")}
              </Text>
            </TouchableOpacity>

          </View> */}


        </View>
        <ScrollView
          // style={styles.newcontainer}
          style={{
            flex: 1,
            width: '100%',
            paddingTop: 10,
            paddingBottom: 20,
            backgroundColor: 'white',
            marginTop: 20
          }}
          showsHorizontalScrollIndicator={false}
          horizontal // Change the direction to horizontal
          pagingEnabled // Enable paging
          decelerationRate={0} // Disable deceleration
          snapToInterval={CARD_WIDTH + 10} // Calculate the size for a card including marginLeft and marginRight
          snapToAlignment='center' // Snap to the center
          contentInset={{ // iOS ONLY
            top: 0,
            left: SPACING_FOR_CARD_INSET, // Left spacing for the very first card
            bottom: 0,
            right: SPACING_FOR_CARD_INSET // Right spacing for the very last card
          }} >

          {sliceddept.map((result, index) => {
            return (
              <View style={styles.newcardStyle} >
                <TouchableOpacity style={{ alignItems: 'center', marginTop: 5 }}
                  onPress={() => actionprofiledetail(result.id)} >
                  <View style={styles.subCardView}>
                    <Image
                      source={{
                        // uri: `${PHOTO_URL}+upload/department/+${result.logo}`,
                        uri: PHOTO_URL + result.logo,
                      }}
                      style={styles.buttonDepartmentIconStyle} />
                  </View>

                  {/* <Text style={{fontSize:15}}  >{result.mm_name}</Text> */}

                  <View style={{ flex: 1, flexDirection: 'row', marginTop: 20 }}>
                    <Text style={{ fontSize: 12, textAlign: 'center', }}>{t(result.eng_name)}</Text>

                  </View>
                </TouchableOpacity>

              </View>
            )

          })}

          <View style={styles.newcardStyle} >
            <TouchableOpacity style={{ alignItems: 'center', marginTop: 5 }}
              onPress={() => navigation.navigate(t('GP & Speciality'))} >
              <View style={styles.subCardView}>
                <Image
                  source={viewIcon}
                  style={styles.buttonDepartmentIconStyle} />
              </View>

              {/* <Text style={{fontSize:15}}  >{result.mm_name}</Text> */}

              <View style={{ flex: 1, flexDirection: 'row', marginTop: 20 }}>
                <Text style={{ fontSize: 12, textAlign: 'center', textDecorationLine: 'underline' }}>{t('View All')}</Text>

              </View>
            </TouchableOpacity>

          </View>

          <View style={{ justifyContent: "space-between", width: 12 }}>

          </View>
        </ScrollView>
      </ScrollView >
    </>
  );
}
const stateToProps = state => {
  return {
    all_depts: state.dept.depts,
    all_appointment: state.appointment.appointment_by_phoneno,

  };
}

const Homeformwrapp = reduxForm({
  form: "HomeForm",

})(HomeScreen)
export default connect(stateToProps, { fetchappointment, fetchdept, fetchdoector_by_dept, fetchchat, fetchinvestigationlsit, createuser })(Homeformwrapp)
