import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/core';
import { Text, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Container, Content, Card, CardItem, Thumbnail, Left, Body, Right, Row } from 'native-base';
import { reduxForm } from 'redux-form';
import { connect } from "react-redux";
import { Icon } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import { fetchdoctor, get_state_townshup_dept } from '../../../redux/Doctorreducer';
import { PHOTO_URL } from '../../../components/common';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchdoc_id } from '../../../redux/Doctorreducer';
const DoctorProfile = (props) => {
  const navigation = useNavigation();
  const [phone_number, setPhone_Number] = useState()

  useEffect(() => {
    AsyncStorage.getItem("Phone_no").then((token) => {
      setPhone_Number(token)
    });

  }, [])
  const { get_doc_by_state } = props

  const btnProfileDetail = (data) => {
    if (data) {
      props.fetchdoc_id(data.id)

    }
    navigation.navigate(t('View Profile'), { paramkey: data });
  }

  const btnbooknow = (id) => {
    if (phone_number) {
      navigation.navigate('Appointment', { paramkey: id });
    } else {
      navigation.navigate('Login');
    }
  }
  return (
    <>
      {get_doc_by_state.length > 0 ?
        <Container style={{ backgroundColor: 'white' }}>
          <Content>
            <ScrollView>
              {get_doc_by_state.map((result, index) => {
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
                  <>

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
                      }}>
                      <CardItem >
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
                            {/* <Text style={{ color: 'gray' }}>10000 MMk in 25min</Text> */}
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

                              btnProfileDetail(result)
                            }}
                            style={styles.signButton}>
                            <LinearGradient
                              colors={["#36afb9", "#36afb9"]}
                              start={{ x: 0, y: 1 }}
                              end={{ x: 1, y: 0 }}
                              style={styles.signGradient}
                            >
                              <Text style={styles.signText}>
                                View Profile
                                <Icon
                                  name='eye'
                                  type='font-awesome'
                                  color='#fff'
                                  alignSelf='center'
                                  style={{ height: 12, marginLeft: 5 }}
                                  size={13} />

                              </Text>
                            </LinearGradient>
                          </TouchableOpacity>
                        </Left>

                        <Right>
                          <TouchableOpacity
                            onPress={() => {
                              // navigation.navigate('Appointment');
                              btnbooknow(result.id)
                            }}
                            style={styles.signButton}>
                            <LinearGradient
                              colors={["#67a219", "#76b81f"]}
                              start={{ x: 0, y: 1 }}
                              end={{ x: 1, y: 0 }}
                              style={styles.signGradient}
                            >
                              <Text style={styles.signText}>
                                Book Now
                                <Icon
                                  name='calendar'
                                  type='font-awesome'
                                  color='#fff'
                                  alignSelf='center'
                                  style={{ height: 12, marginLeft: 5 }}
                                  size={14} />

                              </Text>
                            </LinearGradient>
                          </TouchableOpacity>
                          {/* <Button title="Book Now" color="#027536" /> */}
                        </Right>
                      </CardItem>
                    </Card>


                  </>
                )

              }
              )}

            </ScrollView>
          </Content>
        </Container>
        :
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text style={{ color: "#919191" }}>အချက်အလက်များမရှိသေးပါ</Text>
        </View>
      }

    </>

  );
}

const styles = StyleSheet.create({
  signGradient: {
    height: 45,
    borderRadius: 4,
    justifyContent: "center",
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    elevation: 5,

  },
  signButton: {
    width: '100%',
    marginVertical: 5,
    paddingHorizontal: 3,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.50,
    elevation: 5,
  },
  signText: {
    color: "#fff",
    alignSelf: "center",
    fontFamily: "Poppins_600SemiBold",
    fontSize: 13,
  },
  iconstyle: {
    marginRight: 2
  },

});
const stateToProps = state => {
  return {
    doctorlist_by_dept: state.doctor_by_depts.doctor_by_dept,
    get_doc_by_state: state.doctor_by_depts.doc_by_state_town
  };
}
const Doctorprofileformwrapp = reduxForm({
  form: "Doctor_by_deptForm",

})(DoctorProfile)
export default connect(stateToProps, { fetchdoctor, get_state_townshup_dept, fetchdoc_id })(Doctorprofileformwrapp)
