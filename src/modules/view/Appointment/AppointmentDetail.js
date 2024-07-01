import React, { useEffect, useState, useCallback } from 'react';
import { View, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Card, Paragraph } from 'react-native-paper';
import { Text, Row } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import { fetchdoctor_for_video } from '../../../redux/Doctorreducer';
import { connect } from "react-redux";
import { reduxForm } from 'redux-form'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import { openLink, tryDeepLinking } from './util';
import moment from 'moment';


const AppointmentDetail = (props) => {
  const { t, i18n } = useTranslation();
  // let app_detail = '';
  const app_detail = props.route.params.paramKey;
  console.log('app-detail', app_detail);
  const nowdate = moment().format('YYYY-MM-DD');
  const AppointmentIcon = require('../../../../assets/images/category/medical-appointment.png');


  const [url, setUrl] = useState(`https://app.telehealthmyanmar.com/Backend/public/index.php/api/appointment_payment/${app_detail.id}`);

  const [statusBarStyle] = useState('light-content');

  const onOpenLink = useCallback(async () => {
    // alert('hi');
    await openLink(url, statusBarStyle);
  }, [url, statusBarStyle]);

  const btnvideoconsultation = async (id) => {
    props.fetchdoctor_for_video(id)
    try {
      await AsyncStorage.setItem('doctor_id', id.toString());
    } catch (e) {
      console.log(e);
    }

    props.navigation.navigate('VideoChat')
  }
  return (
    <ScrollView style={{ backgroundColor: 'white' }}>
      <Card style={styles.cardstyle}>
        <Card.Content>
          <Card style={styles.imgContainer}>
            <View style={styles.aligncontainer}>
              <Image
                resizeMode="contain"
                source={AppointmentIcon}
                style={styles.itemImage}
              />
              <Text style={{ fontWeight: 'bold' }}>Appointment Detail</Text>
            </View>
          </Card>
          <View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap", marginTop: 20, }}>
            <Text style={styles.nameText}>{t("Doctor's Name")} : </Text>
            <Text style={styles.decText}>{app_detail.doctor_data.name}</Text>
          </View>

          <View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap", marginTop: 20, }}>
            <Text style={styles.nameText}>{t("Doctor's Speciality")} : </Text>
            <Text style={styles.decText}>{app_detail.doctor_data.name}</Text>
          </View>


          {/* <View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap", marginTop: 10, }}>
            <Text style={styles.nameText}>Age : </Text>
            <Text style={styles.decText}>General</Text>
          </View> */}
          <View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap", marginTop: 10, }}>
            <Text style={styles.nameText}>Email : </Text>
            <Text style={styles.decText}>info@telehealthmyanmar.com</Text>
          </View>
          <View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap", marginTop: 10, }}>
            <Text style={styles.nameText}>Phone Number : </Text>
            <Text style={styles.decText}> 1234</Text>
          </View>

          <View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap", marginTop: 20, }}>
            <Text style={styles.nameText}>{t("Doctor's Degree")} : </Text>
            <Text style={styles.decText}>{app_detail.doctor_data.certificate}</Text>
          </View>

          <View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap", marginTop: 20, }}>
            <Text style={styles.nameText}>{t("Work Experience")} : </Text>
            <Text style={styles.decText}>{app_detail.doctor_data.work_experience}yrs</Text>
          </View>
          {/* <View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap", marginTop: 10, }}>
            <Text style={styles.nameText}>Address : </Text>
            <Text style={styles.decText}> {app_detail.doctor_data.address}</Text>
          </View> */}

          {/* Second divider */}
          <View
            style={{
              marginTop: 10,
              borderBottomColor: 'black',
              borderBottomWidth: 1,
            }}
          />
          <Text style={{ marginTop: 10, fontWeight: 'bold', marginBottom: 10, color: 'black', }}>{t("Appointment Date/Time")}</Text>
          <Row>

            <Text
              style={{ color: '#333d45', marginLeft: 10, marginTop: 5 }}>
              {app_detail.startDate}
            </Text>
            <View style={styles.verticleLine}></View>
            <Text
              style={{ color: '#333d45', marginLeft: 3, marginTop: 5 }}>
              {`${app_detail.startTime}-${app_detail.endTime
                }`}
            </Text>
          </Row>

          {/* 3rd divider */}
          {
            app_detail.appointment_confirm == 4 ?
              <>
                <View
                  style={{
                    marginTop: 10,
                    borderBottomColor: 'black',
                    borderBottomWidth: 1,
                  }}
                />


                <Text style={{ marginTop: 10, marginBottom: 10, fontWeight: 'bold', color: 'black', }}> {t("Consultation")}</Text>
                {
                  app_detail.service_id == 1 ?
                    <TouchableOpacity
                      onPress={() => btnvideoconsultation(app_detail.doctor_id)}
                    >
                      <LinearGradient
                        colors={["#f8f9fe", "#f8f9fe"]}
                        start={{ x: 0, y: 1 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.videoGradient}
                      >
                        <Text style={styles.signText}>	Video Consultation </Text>
                      </LinearGradient>
                    </TouchableOpacity>

                    :
                    <TouchableOpacity
                      onPress={() => props.navigation.navigate('ChatRoomScreen', { params: app_detail.doctor_id })}
                    >
                      <LinearGradient
                        colors={["#f8f9fe", "#f8f9fe"]}
                        start={{ x: 0, y: 1 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.videoGradient}
                      >
                        <Text style={styles.signText}>Chat Consultation >></Text>
                      </LinearGradient>
                    </TouchableOpacity>


                }
              </>
              :
              <></>

          }

          {/* 4th divider */}
          <View
            style={{
              marginTop: 10,
              borderBottomColor: 'black',
              borderBottomWidth: 1,
            }}
          />


          <Text style={{ marginTop: 10, fontWeight: 'bold', marginBottom: 10, color: 'black', }}>{t('Notes')}</Text>
          <Paragraph>
            {app_detail.notes == 'undefined' ? '-' : app_detail.notes}
          </Paragraph>

          <View
            style={{
              marginTop: 10,
              borderBottomColor: 'black',
              borderBottomWidth: 1,
            }}
          />
          <Text style={{ marginTop: 10, fontWeight: 'bold', marginBottom: 10, color: 'black', }}>{t('Consultation Fees')}</Text>
          <Text >{app_detail.doctor_data.consultation_fee} MMK</Text>




          <View
            style={{
              marginTop: 10,
              borderBottomColor: 'black',
              borderBottomWidth: 1,
            }}
          />

          {/* <Text style={{ marginTop: 10, marginBottom: 10, fontWeight: 'bold', color: 'black', }}>{t("Appointment Status")}</Text> */}
          {/* {app_detail.appointment_confirm == 1 ?
            <Text style={{ marginLeft: 10, borderRadius: 3, marginTop: 10, textAlignVertical: 'center', textAlign: 'center', backgroundColor: '#dba64b', color: 'white', width: 150, height: 30 }}>Pending</Text>
            : app_detail.appointment_confirm == 2 ?
              <Text style={{ marginLeft: 10, borderRadius: 3, marginTop: 10, textAlignVertical: 'center', textAlign: 'center', backgroundColor: '#76b81f', color: 'white', width: 150, height: 30 }}>Confirmed</Text>
              :
              <Text style={{ marginLeft: 10, borderRadius: 3, marginTop: 10, textAlign: 'center', backgroundColor: '#ad232a', color: 'white', width: 150 }}>Cancel</Text>


          } */}
          {/* <View
            style={{
              marginTop: 10,
              borderBottomColor: 'black',
              borderBottomWidth: 1,
            }}
          /> */}
          <TouchableOpacity
            // onPress={() => props.navigation.navigate('PaymentForm', { paramKey: app_detail.id })}
            onPress={() => onOpenLink()}
            // disabled={app_detail.startDate == nowdate ? false : true}
            disabled={app_detail.startDate == nowdate && app_detail.appointment_confirm == 4 ? true : false}


          >


            <LinearGradient
              // colors={app_detail.startDate == '2022-04-01' ? ["#d3dae6", "#afb9c9"] : 'black'}
              //["#4a8dcb", "#028fdd"] : ["#d3dae6", "#afb9c9"]
              // colors='black'

              // colors={["#4a8dcb", "#028fdd"]}
              // colors={app_detail.startDate == nowdate ? ["#4a8dcb", "#028fdd"] : ["#d3dae6", "#afb9c9"]}
              // open->["#4a8dcb", "#028fdd"]
              // close=>["#d3dae6", "#afb9c9"]
              // 2022-08-30
              colors={app_detail.startDate == nowdate && app_detail.appointment_confirm != 4 ? ["#4a8dcb", "#028fdd"] : ["#d3dae6", "#afb9c9"]}

              start={{ x: 0, y: 1 }}
              end={{ x: 1, y: 0 }}
              style={styles.signGradient}
            >
              <Text style={styles.paymentText}>{t("Continue To Payment")}</Text>
            </LinearGradient>

          </TouchableOpacity>


        </Card.Content>
      </Card>
    </ScrollView>
  );
}
const AppointmentDetailwrap = reduxForm({
  form: "AppointmentDetailForm",


})(AppointmentDetail)
export default connect(null, { fetchdoctor_for_video })(AppointmentDetailwrap)
const styles = StyleSheet.create({
  selected: {
    height: 45,
    width: '100%',
    borderRadius: 15,
    marginLeft: 7,
    justifyContent: "center",
    marginTop: 30
  },
  signButton: {
    width: "100%",
    marginVertical: 7,
    paddingHorizontal: 9,
  },

  signGradient: {
    height: 45,
    width: '100%',
    borderRadius: 15,
    marginLeft: 7,
    justifyContent: "center",
    marginTop: 30
  },

  videoGradient: {
    height: 45,
    width: 150,
    marginLeft: 7,
    borderRadius: 10,
    justifyContent: "center",
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.25,
    elevation: 6

  },

  signText: {
    color: "#2296f3",
    fontWeight: 'bold',
    alignSelf: "center",
    fontFamily: "Poppins_600SemiBold",
    fontSize: 13,
    alignItems: 'center'
  },
  paymentText: {
    color: "white",
    fontWeight: 'bold',
    alignSelf: "center",
    fontFamily: "Poppins_600SemiBold",
    fontSize: 13,
    alignItems: 'center'
  },
  verticleLine: {
    height: '50%',
    width: 1,
    backgroundColor: '#909090',
    marginLeft: 9,
    top: 10
  },
  test: {
    position: 'absolute',
    right: 50,
    top: 0,

  },
  aligncontainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgContainer: {
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    borderRadius: 20,
    shadowColor: '#000000',
    borderLeftColor: '#000000',
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.25,
    elevation: 6,
    marginTop: -60,
  },
  cardstyle: {
    textAlign: 'center',
    marginTop: 50,
    marginVertical: 10,
    alignSelf: 'baseline',
    marginLeft: 10,
    width: '95%',
    borderRadius: 10,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.25,
    elevation: 6,
  },
  itemImage: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    width: 65,
    height: 65,
    // borderWidth: 4,
    borderColor: "white",
  },
  nameText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'gray',
  },
  decText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
  },
  lottie: {
    width: 100,
    height: 100
  },
  videostyle: {
    width: 10,
    height: 10
  }
})