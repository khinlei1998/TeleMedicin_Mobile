import React,{useState,useEffect} from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import { reduxForm, } from 'redux-form';
import { connect } from "react-redux";
import { Container, Content, Card, CardItem, Thumbnail, Left, Body, Right, } from 'native-base';
import { PHOTO_URL , } from '../../../components/common';
import { useNavigation } from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Doctorlistbyclinic = (props) => {

  const [phone_number, setPhone_Number] = useState()

  useEffect(() => {
    const unscribe = navigation.addListener('focus', () => {
      AsyncStorage.getItem("Phone_no").then((token) => {
        setPhone_Number(token)
      });
    })
    return unscribe;
  }, [])
  const navigation = useNavigation();
  const id = props.route.params.paramkey
  const btnProfileDetail = (data) => {
    navigation.navigate('Profiledetail', { paramkey: data });
  }

  const btnbooknow = (id) => {
    if (phone_number) {
      navigation.navigate('Appointment', { paramkey: id });
    } else {
      navigation.navigate('Login');
    }
  }
  const { doctotlists } = props


  return (
    <Container style={{ backgroundColor: 'white' }}>

      <Content>
        <ScrollView>
          {doctotlists.map((result, index) => {
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
                  </Right>
                </CardItem>
              </Card>

            )


          })}

        </ScrollView>
      </Content>
    </Container>
  );
}

const stateToProps = state => {
  return {
    doctotlists: state.clinic.alldocotor_by_state
  };
}
const Doctorlistbyclinicform = reduxForm({
  form: "Alldoctorform",


})(Doctorlistbyclinic)
export default connect(stateToProps,)(Doctorlistbyclinicform)


const styles = StyleSheet.create({
  signText: {
    color: "#fff",
    alignSelf: "center",
    fontFamily: "Poppins_600SemiBold",
    fontSize: 13,
  },
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
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  text: {
    fontSize: 20,
    color: '#101010',
    marginTop: 60,
    fontWeight: '700'
  },
  listItem: {
    marginTop: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    flexDirection: 'row'
  },
  coverImage: {
    width: 100,
    height: 100,
    borderRadius: 8
  },
  metaInfo: {
    marginLeft: 10
  },
  title: {
    fontSize: 18,
    width: 200,
    padding: 10
  }
})