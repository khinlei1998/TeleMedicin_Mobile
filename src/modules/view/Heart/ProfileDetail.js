import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Content, Card, Text, Left, Row } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
const degreeIcon = require('../../../../assets/images/pages/degrees.png');
const infoIcon = require('../../../../assets/images/pages/info.png');
const cvIcon = require('../../../../assets/images/pages/cv.png');
const squareIcon = require('../../../../assets/images/pages/square.png');
const langaugeIcon = require('../../../../assets/images/pages/translate.png');
const moneyIcon = require('../../../../assets/images/pages/money.png');
const addressIcon = require('../../../../assets/images/pages/address.png');
const experienceIcon = require('../../../../assets/images/pages/experience.png');
const stethoscope = require('../../../../assets/images/pages/stethoscope.png');
import { ScrollView } from 'react-native-gesture-handler';
import { PHOTO_URL } from '../../../components/common';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchdoc_id } from '../../../redux/Doctorreducer';
const ProfileDetail = props => {
  const [phone_number, setPhone_Number] = useState();
  const { doc_info, language } = props;
  useEffect(() => {
    // const doc_id = props.route.params.doctor_id;
    // console.log('doc_id',doc_id)
    // if (doc_id) {
    //   props.fetchdoc_id(doc_id);
    // }
    props.navigation.addListener('focus', () => {
      AsyncStorage.getItem('Phone_no').then(token => {
        setPhone_Number(token);
      });
    });
  }, []);

  const btnapp = () => {
    if (phone_number) {
      props.navigation.navigate('Appointment', { paramkey: doc.id });
    } else {
      props.navigation.navigate('Login');
    }
  };

  const doc = props.route.params.paramkey;
  //  if(doc){
  //   props.fetchdoc_id(doc.id)
  //  }
  // const doctor_info = props.route.params.doctor_info;
  // const language = props.route.params.language;

  const department_array = [];
  const position_array = [];
  const work_experience_array = [];

  for (const dep in doc) {
    let dep_array = doc.department.split(',');
    dep_array.forEach(element => {
      department_array.push(element);
    });
    if (department_array.length > 0) break;
  }

  for (const pos in doc) {
    let pos_array = doc.position.split(',');
    pos_array.forEach(element => {
      position_array.push(element);
    });
    if (position_array.length > 0) break;
  }

  for (const exo in doc) {
    let exp_array = doc.work_experience.split(',');
    exp_array.forEach(element => {
      work_experience_array.push(element);
    });
    if (work_experience_array.length > 0) break;
  }
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}></View>
      <Image
        style={styles.avatar}
        source={{ uri: `${PHOTO_URL}` + doc.image }}
      />
      <View style={styles.firstbody}>
        <View style={styles.firstbodyContent}>
          <Left>
            <Text style={styles.name}>{doc.name}</Text>
            <Text style={styles.info}>{doc.dep_data.mm_name}</Text>
            {/* <Text style={styles.description}>{doc.work_experience} yrs experience</Text> */}
          </Left>
        </View>
      </View>
      <View style={{ height: '100%' }}>
        <Content padder style={{ height: '100%' }}>
          <Card
            style={{
              shadowColor: '#000000',
              shadowOffset: { width: 0, height: 10 },
              shadowOpacity: 0.25,
              elevation: 5,
              borderRadius: 10,
              marginTop: 10,
              height: '100%'
            }}
          >
            <Row>
              <Image
                resizeMode="contain"
                source={stethoscope}
                style={styles.itemImage}
              />
              <Text
                style={{
                  color: '#5da7ec',
                  marginLeft: 3,
                  fontWeight: 'bold',
                  marginTop: 14,
                }}
              >
                Speciality
              </Text>
            </Row>

            <Row style={{ marginTop: 7, marginLeft: 12, marginBottom: 20 }}>

              <Text style={{ fontSize: 13 }}>
                {doc.dep_data.mm_name}
              </Text>
            </Row>
            <View
              style={{
                flex: 1,
                width: '95%',
                alignSelf: 'center',
                borderBottomColor: '#83859a',
                borderBottomWidth: 0.2,
                fontWeight: 300,
              }}
            />
            <Row>
              <Image
                resizeMode="contain"
                source={degreeIcon}
                style={styles.itemImage}
              />
              <Text
                style={{
                  color: '#5da7ec',
                  marginLeft: 3,
                  fontWeight: 'bold',
                  marginTop: 14,
                }}
              >
                Degree
              </Text>
            </Row>

            <Row style={{ marginTop: 7, marginLeft: 12, marginBottom: 20 }}>
              {/* <Image
    resizeMode="contain"
    source={squareIcon}
    style={styles.squareImage} /> */}
              <Text style={{ fontSize: 13 }}>{doc.certificate}</Text>
            </Row>
            <View
              style={{
                flex: 1,
                width: '95%',
                alignSelf: 'center',
                borderBottomColor: '#83859a',
                borderBottomWidth: 0.2,
                fontWeight: 300,
              }}
            />
            {/* <Row>
                  <Image
                    resizeMode="contain"
                    source={cvIcon}
                    style={styles.itemImage}
                  />
                </Row>

                <Row style={{ marginTop: 7, marginLeft: 12, marginBottom: 20 }}>
                  <Image
                                    resizeMode="contain"
                                    source={squareIcon}
                                    style={styles.squareImage} />
                  <Text style={{ fontSize: 13 }}>
                    Graduated from University of Medicine 1,Yangon in 1999
                  </Text>
                </Row> */}


            <Row>
              <Image
                resizeMode="contain"
                source={langaugeIcon}
                style={styles.itemImage}
              />
              <Text
                style={{
                  color: '#5da7ec',
                  marginLeft: 3,
                  fontWeight: 'bold',
                  marginTop: 14,
                }}
              >
                Language
              </Text>
            </Row>

            <Row style={{ marginTop: 7, marginLeft: 12, marginBottom: 20 }}>
              {/* <Image
    resizeMode="contain"
    source={squareIcon}
    style={styles.squareImage} /> */}
              {/* <Text style={{ fontSize: 13 }}>{doc.language}</Text> */}
              {language ? language.map((value, key) => {
                return <Text style={{ fontSize: 13 }}>{(key ? ', ' : '') + value.label}</Text>;
              }) : <></>}
            </Row>
            <View
              style={{
                flex: 1,
                width: '95%',
                alignSelf: 'center',
                borderBottomColor: '#83859a',
                borderBottomWidth: 0.2,
                fontWeight: 300,
              }}
            />
            {/* <Row>
              <Image
                resizeMode="contain"
                source={addressIcon}
                style={styles.itemImage}
              />
              <Text
                style={{
                  color: '#5da7ec',
                  marginLeft: 3,
                  fontWeight: 'bold',
                  marginTop: 14,
                }}
              >
                Address
              </Text>
            </Row> */}

            {/* <Row style={{ marginTop: 7, marginLeft: 12, marginBottom: 20 }}> */}
            {/* <Image
    resizeMode="contain"
    source={squareIcon}
    style={styles.squareImage} /> */}
            {/* <Text style={{ fontSize: 13 }}>{doc.address}</Text>
            </Row> */}

            <View
              style={{
                flex: 1,
                width: '95%',
                alignSelf: 'center',
                borderBottomColor: '#83859a',
                borderBottomWidth: 0.2,
                fontWeight: 300,
              }}
            />

            <Row>
              <Image
                resizeMode="contain"
                source={experienceIcon}
                style={styles.itemImage}
              />
              <Text
                style={{
                  color: '#5da7ec',
                  marginLeft: 3,
                  fontWeight: 'bold',
                  marginTop: 14,
                }}
              >
                Work Experience
              </Text>
            </Row>

            {department_array.map((dep, d) => {
              return position_array.map((pos, p) => {
                return work_experience_array.map((exp, e) => {
                  return d == p && d == e && p == e ? (
                    <>
                      <Row
                        style={{
                          marginTop: 7,
                          marginLeft: 12,
                          marginBottom: 20,
                        }}
                      >
                        <Text style={{ fontSize: 13 }}>
                          {dep + 'ဌာန ' + ' / ' + pos + "ရာထူး" + ' / ' + exp + "နှစ်"}
                          {/* {dep + ' / ' + pos + ' / ' + exp} */}

                        </Text>
                      </Row>
                    </>
                  ) : (
                    <></>
                  );
                });
              });
            })}

            {/* <Row style={{ marginTop: 7, marginLeft: 12, marginBottom: 20 }}>
                                <Text style={{ fontSize: 13 }}>{doc.address}</Text>

                            </Row> */}

            <View
              style={{
                flex: 1,
                width: '95%',
                alignSelf: 'center',
                borderBottomColor: '#83859a',
                borderBottomWidth: 0.2,
                fontWeight: 300,
              }}
            />

            <Row>
              <Image
                resizeMode="contain"
                source={moneyIcon}
                style={styles.itemImage}
              />
              <Text
                style={{
                  color: '#5da7ec',
                  marginLeft: 3,
                  fontWeight: 'bold',
                  marginTop: 14,
                }}
              >
                Consulation Fee
              </Text>
            </Row>
            <Row
              style={{
                marginTop: 7,
                marginLeft: 12,
                marginBottom: 20,
              }}
            >
              <Text style={{ fontSize: 13 }}>
                {doc.consultation_fee} MMK
              </Text>
            </Row>

            <View
              style={{
                flex: 1,
                width: '95%',
                alignSelf: 'center',
                borderBottomColor: '#83859a',
                borderBottomWidth: 0.2,
                fontWeight: 300,
              }}
            />

            {/* <Row style={{ marginTop: 18, marginLeft: 12, marginBottom: 20 }}>
                                <Image
                                    resizeMode="contain"
                                    source={moneyIcon}
                                    style={styles.itemImage} />
                                <Text
                                    style={{ color: '#5da7ec', marginLeft: 3, fontWeight: 'bold', marginTop: 12 }}>
                                    Consulation Fee
                                </Text>

                            </Row> */}
            <Row>
              <TouchableOpacity
                onPress={() => {
                  btnapp();
                  // props.navigation.navigate('Appointment',{paramkey:doc.id})
                }}
                style={styles.signButton}
              >
                <LinearGradient
                  colors={['#67a219', '#76b81f']}
                  start={{ x: 0, y: 1 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.signGradient}
                >
                  <Text style={styles.signText}>Book Appointment</Text>
                </LinearGradient>
              </TouchableOpacity>
            </Row>
          </Card>
        </Content>
      </View>
    </ScrollView>
    // <Text>kk</Text>
  );
};

const statetoprops = state => {
  return {
    doc_info: state.doctor_by_depts.doc_id.data,
    language: state.doctor_by_depts.doc_id.language,
  };
};

const profiledetailformwrapp = reduxForm({
  form: 'Profiledetailform',
})(ProfileDetail);
export default connect(statetoprops, { fetchdoc_id })(profiledetailformwrapp);

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  header: {
    backgroundColor: '#5da7ec',
    height: 50,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: 'white',
    marginBottom: 10,
    marginLeft: 6,
    position: 'absolute',
  },
  firstbody: {
    marginTop: 5,
  },
  firstbodyContent: {
    flex: 1,
  },
  name: {
    fontSize: 15,
    color: 'black',
    fontWeight: 'bold',
    marginLeft: 16,
  },
  info: {
    fontSize: 13,
    color: 'black',
    marginTop: 10,
    marginLeft: 16,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 13,
    color: 'black',
    marginTop: 10,
  },
  buttonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: '#00BFFF',
  },
  itemImage: {
    width: 23,
    height: 23,
    marginLeft: 10,
    marginTop: 14,
  },
  squareImage: {
    width: 10,
    height: 10,
    marginTop: 6,
    marginRight: 3,
    marginLeft: 25,
  },
  cvImage: {
    width: 20,
    height: 20,
  },
  signGradient: {
    height: 45,
    borderRadius: 4,
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    elevation: 5,
    marginBottom: 20,
    marginTop: 20
  },
  signButton: {
    marginTop: 10,
    marginLeft: 10,
    width: '50%',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.5,
    elevation: 5,
    right: 0,
  },
  signText: {
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 13,
  },
});
