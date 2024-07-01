import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity,Image } from 'react-native';
import { reduxForm } from 'redux-form';
import { connect } from "react-redux";
import { Icon } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import { Container, Content, Card, CardItem, Thumbnail, Left, Body, Right, } from 'native-base';
import { PHOTO_URL,nodataIcon } from '../../../components/common';
import { useNavigation } from '@react-navigation/core';
import { fetchdoctor_by_clinic } from '../../../redux/Clinicreducer';
const ClinicByState = (props) => {
  const navigation = useNavigation();
  const { clinic_list } = props

  const btnProfileDetail = (data) => {

    navigation.navigate('Clinic Detail', { paramkey: data });
  }

  const btndoctorlist = (id) => {
    navigation.navigate('Doctor list by clinic', { paramkey: id });
    props.fetchdoctor_by_clinic(id)

  }

  return (
    <>
      {clinic_list.length > 0 ?
        <Container style={{ backgroundColor: 'white' }}>
          <Content>
            <ScrollView>
              {clinic_list.map((result, index) => {
                return (
                  <>
                    <Card style={{
                      padding: 10,
                      marginLeft: 15,
                      marginRight: 15,
                      marginTop: 10,
                      shadowColor: '#000000',
                      shadowOffset: { width: 0, height: 10 },
                      shadowOpacity: 0.25,
                      elevation: 5,
                      borderRadius: 10,
                    }} key={index}>
                      <CardItem>
                        <Left>
                          <Thumbnail
                            source={{
                              uri: `${PHOTO_URL}` + result.image,
                            }}
                          />

                          <Body>
                            <Text style={{ fontWeight: 'bold' }}>{result.clinic_name}</Text>
                            <Text style={{ fontWeight: 'bold' }}>{result.email}</Text>
                            <Text style={{ fontWeight: 'bold' }}>{result.phone_number}</Text>
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
                              btndoctorlist(result.id)
                            }}
                            style={styles.signButton}>
                            <LinearGradient
                              colors={["#67a219", "#76b81f"]}
                              start={{ x: 0, y: 1 }}
                              end={{ x: 1, y: 0 }}
                              style={styles.signGradient}
                            >
                              <Text style={styles.signText}>
                                Doctor List
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
                        </Right>
                      </CardItem>

                    </Card>
                  </>
                )
              })}


            </ScrollView>
          </Content>
        </Container>
        :
        <Container>
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Image
                    resizeMode="contain"
                    source={nodataIcon}
                    style={styles.itemImage} />
                <Text style={{ color: "#83859a",fontFamily:'ZawDecode',fontWeight:'bold',marginTop:10 }}>အချက်အလက်များမရှိသေးပါ</Text>
            </View>
        </Container>
      }
    </>

  );
}
const stateToProps = state => {
  return {
    clinic_list: state.clinic.clinic_by_state
  };
}
const ClinicByStatewrapp = reduxForm({
  form: "ClinicbystateForm",

})(ClinicByState)
export default connect(stateToProps, { fetchdoctor_by_clinic })(ClinicByStatewrapp)

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
  itemImage: {
    width: 120,
    height: 120,
    marginLeft: 10,
    marginTop: 14
},

});