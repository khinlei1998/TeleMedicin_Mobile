import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/core';
import { Text, ScrollView, StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import { Container, Content, Card, CardItem, Thumbnail, Left, Body, Right, Row } from 'native-base';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import { fetchdoctor } from '../../../redux/Doctorreducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PHOTO_URL, nodataIcon } from '../../../components/common';
import { fetchdoc_id } from '../../../redux/Doctorreducer';
import LottieView from "lottie-react-native";
import { useTranslation } from 'react-i18next';

const DoctorProfile = props => {
  const { t, i18n } = useTranslation();

  const navigation = useNavigation();
  const [phone_number, setPhone_Number] = useState();

  useEffect(() => {
    const unscribe = navigation.addListener('focus', () => {
      AsyncStorage.getItem('Phone_no').then(token => {
        setPhone_Number(token);
      });
    });
    return unscribe;
  }, []);
  const { doctorlist_by_dept } = props;

  const btnProfileDetail = data => {
    if (data) {
      props.fetchdoc_id(data.id)
    }
    navigation.navigate(t('View Profile'), {
      paramkey: data,
      doctor_id: data.id,
    });
  };

  const btnbooknow = id => {
    if (phone_number) {
      navigation.navigate(t('Appointment'), { paramkey: id });
    } else {
      navigation.navigate('Login');
    }
  };
  return (
    <Container style={{ backgroundColor: 'white' }}>
      {doctorlist_by_dept.length > 0 ? (
        <Content>
          <ScrollView>
            {doctorlist_by_dept.map((result, index) => {
              const department_array = [];
              const position_array = [];
              const work_experience_array = [];

              for (const dep in result) {
                let dep_array = result.department.split(',');
                dep_array.forEach(element => {
                  department_array.push(element);
                });
                if (department_array.length > 0) break;
              }

              for (const pos in result) {
                let pos_array = result.position.split(',');
                pos_array.forEach(element => {
                  position_array.push(element);
                });
                if (position_array.length > 0) break;
              }

              for (const exo in result) {
                let exp_array = result.work_experience.split(',');
                exp_array.forEach(element => {
                  work_experience_array.push(element);
                });
                if (work_experience_array.length > 0) break;
              }
              return (
                <Card
                  style={{
                    padding: 10,
                    marginLeft: 15,
                    marginRight: 15,
                    marginTop: 10,
                    shadowColor: '#000000',
                    shadowOffset: { width: 0, height: 10 },
                    shadowOpacity: 0.25,
                    elevation: 5,
                    borderRadius: 10,
                  }}
                >
                  <CardItem>
                    <Left>
                      <Thumbnail
                        source={{
                          uri: `${PHOTO_URL}` + result.image,
                        }}
                      />

                      <Body>
                        <Text style={{ fontWeight: 'bold' }}>{result.name}</Text>
                        <Text style={{ fontWeight: 'bold' }}>{result.dep_data.mm_name}</Text>
                        {/* <Text style={{ color: 'gray' }}>{result.work_experience} yrs experience</Text> */}
                        {department_array.map((dep, d) => {
                          return position_array.map((pos, p) => {
                            return work_experience_array.map((exp, e) => {
                              return d == 0 && 0 == p && 0 == e ? (
                                <>
                                  <Row
                                    style={{
                                      marginTop: 7,
                                      marginLeft: 12,
                                      marginBottom: 20,
                                    }}
                                  >
                                    <Text style={{ fontSize: 13 }}>
                                      {/* {dep + 'ဌာန ' + '|' + pos + "ရာထူး" + '|' + exp + "နှစ်"} */}
                                      {dep + '|' + pos + '|' + exp}
                                    </Text>
                                  </Row>
                                </>
                              ) : (
                                <></>
                              );
                            });
                          });
                        })}

                      </Body>
                    </Left>
                  </CardItem>

                  <CardItem>
                    <Left>
                      <TouchableOpacity
                        onPress={() => {
                          btnProfileDetail(result);
                        }}
                        style={styles.signButton}
                      >
                        <LinearGradient
                          colors={['#36afb9', '#36afb9']}
                          start={{ x: 0, y: 1 }}
                          end={{ x: 1, y: 0 }}
                          style={styles.signGradient}
                        >
                          <Text style={styles.signText}>
                            View Profile
                            <Icon
                              name="eye"
                              type="font-awesome"
                              color="#fff"
                              alignSelf="center"
                              style={{ height: 12, marginLeft: 5 }}
                              size={13}
                            />
                          </Text>
                        </LinearGradient>
                      </TouchableOpacity>
                    </Left>

                    <Right>
                      <TouchableOpacity
                        onPress={() => {
                          // navigation.navigate('Appointment');
                          btnbooknow(result.id);
                        }}
                        style={styles.signButton}
                      >
                        <LinearGradient
                          colors={['#67a219', '#76b81f']}
                          start={{ x: 0, y: 1 }}
                          end={{ x: 1, y: 0 }}
                          style={styles.signGradient}
                        >
                          <Text style={styles.signText}>
                            Book Now
                            <Icon
                              name="calendar"
                              type="font-awesome"
                              color="#fff"
                              alignSelf="center"
                              style={{ height: 12, marginLeft: 5 }}
                              size={14}
                            />
                          </Text>
                        </LinearGradient>
                      </TouchableOpacity>
                      {/* <Button title="Book Now" color="#027536" /> */}
                    </Right>
                  </CardItem>
                </Card>
              );
            })}
          </ScrollView>
        </Content>
      ) : (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <LottieView
            source={require("../../../../assets/images/datanotfound.json")}
            style={styles.lottie}
            autoPlay
          />
        </View>
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  signGradient: {
    height: 45,
    borderRadius: 4,
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    elevation: 5,
  },
  itemImage: {
    width: 120,
    height: 120,
    marginLeft: 10,
    marginTop: 14,
  },
  signButton: {
    width: '100%',
    marginVertical: 5,
    paddingHorizontal: 3,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.5,
    elevation: 5,
  },
  signText: {
    color: '#fff',
    alignSelf: 'center',
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 13,
  },
  iconstyle: {
    marginRight: 2,
  },
});
const stateToProps = state => {
  return {
    doctorlist_by_dept: state.doctor_by_depts.doctor_by_dept,
  };
};
const Doctorprofileformwrapp = reduxForm({
  form: 'Doctor_by_deptForm',
})(DoctorProfile);
export default connect(stateToProps, { fetchdoctor, fetchdoc_id })(Doctorprofileformwrapp);
