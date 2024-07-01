import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import {
  createDrawerNavigator,
  DrawerItem,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import NavigatorView from './RootNavigation';
import { fetchstate } from '../../redux/Statereducer';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { connect } from "react-redux";
import { fetchtownship } from '../../redux/Townshipreducer';
import { fetchdept } from '../../redux/Department';
import Deptrenderselect from '../ui/DepartmentDropdown';
import { get_state_townshup_dept } from '../../redux/Doctorreducer';
// import AnimatedSplash from "react-native-animated-splash-screen";
import RenderSelect from '../ui/DropDownPicker';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import validate from './Validate';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { fetchclinic_by_state } from '../../redux/Clinicreducer';
import AllDoctorProfile from '../view/Heart/AllDoctorProfile';
import { requestUserPermission, notificationlistner } from '../../utils/firebaseNotification';
import UserguideSplash from '../home/UserguideSplash';
const iconHome = require('../../../assets/images/drawer/home.png');
const iconCalendar = require('../../../assets/images/drawer/calendar.png');
const iconGrids = require('../../../assets/images/drawer/grids.png');
const iconPages = require('../../../assets/images/drawer/pages.png');
const iconComponents = require('../../../assets/images/drawer/components.png');
const iconSettings = require('../../../assets/images/drawer/settings.png');
const iconBlog = require('../../../assets/images/drawer/blog.png')
const cancel2 = require('../../../assets/images/pages/back-arrow.png');



const drawerData = [
  {
    name: 'Home',
    icon: iconHome,
  },
  {
    name: 'Calendar',
    icon: iconCalendar,
  },
  {
    name: 'Grids',
    icon: iconGrids,
  },
  {
    name: 'Pages',
    icon: iconPages,
  },
  {
    name: 'Components',
    icon: iconComponents,
  },
  {
    name: 'Signup',
    icon: iconComponents,
  },
  {
    name: 'Login',
    icon: iconComponents,
  },
  {
    name: 'Otp',
    icon: iconComponents,
  },
  {
    name: 'Appointment',
    icon: iconComponents,
  },
  {
    name: 'AppointmentDetail',
    icon: iconComponents,
  },
  {
    name: 'Forgot Password',
    icon: iconComponents,
  },

  {
    name: 'test',
    icon: iconComponents,
  },



];

const Drawer = createDrawerNavigator();
const Tab = createMaterialTopTabNavigator();

const CustomDrawerContent = (props) => {

  // const { Doctorbystate } = props.navigation.navigate
  // const rr=props.navigation.navigate("Doctorbystate")
  const [selected, setSelected] = useState();
  const [text, onChangeText] = React.useState("Useless Text");

  const searchdoctor = (data) => {
    props.parentCallback(props.navigation.navigate("Doctorbystate"))

  }

  const searchclinic = () => {
    props.getclinicdata(props.navigation.navigate("Clinic By State and Township"))
  }
  return (
    <View style={{
      flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: 'white', flexDirection: "row"
    }}>
      <Text style={{
        justifyContent: "center", alignItems: "center", fontWeight: 'bold',
        color: 'gray',
      }} >Back To Home Page</Text>
      <TouchableOpacity onPress={() => props.navigation.closeDrawer()}>
        <Image
          resizeMode="contain"
          source={cancel2}
          style={styles.itemImage}
        />
      </TouchableOpacity>
    </View >
    // <DrawerContentScrollView {...props} style={{ padding: 0, backgroundColor: 'white' }}>




    //   {/* <View style={styles.avatarContainer}>

    //     <View style={{
    //       flex: 1, flexDirection: "row",
    //       justifyContent: 'space-between',
    //     }}>
    //       <Text style={styles.userName}>Search Clinic and Doctors</Text>
    //       <TouchableOpacity onPress={() => props.navigation.closeDrawer()}>
    //         <Image
    //           // resizeMode="contain"
    //           source={cancel2}
    //           style={styles.itemImage}
    //         />
    //       </TouchableOpacity>
    //     </View>
    //   </View> */}
    //   {/* <View style={styles.divider} /> */}

    //   {/* Add tab */}

    //   {/* <Tab.Navigator>
    //     <Tab.Screen name="All Doctor Profile"  component={AllDoctorProfile}/>
    //   </Tab.Navigator> */}

    //   {/* <View style={styles.dropStyle}>
    //     <Text style={styles.selectTextName}>Select State <Text style={{ color: 'red' }}>(Required)</Text></Text>

    //     <Field
    //       name="state"
    //       getvalue={selected}
    //       component={RenderSelect}
    //       options={props.all_states}
    //       setValue={setSelected}
    //       onChange={(value) => props.getstate(value)}
    //       titleText="Select State"
    //       oldvalue="Select State"

    //     />
    //   </View>

    //   <View style={styles.dropStyle}>
    //     <Text style={styles.selectTextName}>Select Township<Text style={{ color: 'red' }}>(Required)</Text></Text>
    //     <Field
    //       name="township"
    //       getvalue={selected}
    //       component={RenderSelect}
    //       options={props.all_township}
    //       setValue={setSelected}
    //       // onChange={handletownship} 
    //       titleText=" Select Township"
    //       oldvalue="Select Township"

    //     />
    //   </View>


    //   <View style={styles.dropStyle}>
    //     <Text style={styles.selectTextName}>Select Departmet</Text>
    //     <Field
    //       name="speciality"
    //       getvalue={selected}
    //       component={Deptrenderselect}
    //       options={props.all_depts}
    //       setValue={setSelected}
    //       // onChange={handletownship} 
    //       titleText="Select Department"
    //       oldvalue="Select Department"

    //     />
    //   </View> */}


    //   {/* <TouchableOpacity style={styles.signButton} onPress={() => searchdoctor()} >
    //     <LinearGradient
    //       colors={["#4a8dcb", "#028fdd"]}
    //       start={{ x: 0, y: 1 }}
    //       end={{ x: 1, y: 0 }}
    //       style={styles.DsignGradient}
    //     >
    //       <Text style={styles.signText}>Search Doctor</Text>
    //     </LinearGradient>
    //   </TouchableOpacity> */}

    //   {/* <TouchableOpacity style={styles.signButton} onPress={() => searchclinic()} >
    //     <LinearGradient
    //       colors={["#4a8dcb", "#028fdd"]}
    //       start={{ x: 0, y: 1 }}
    //       end={{ x: 1, y: 0 }}
    //       style={styles.CsignGradient}
    //     >
    //       <Text style={styles.signText}>Search Clinic</Text>
    //     </LinearGradient>
    //   </TouchableOpacity> */}
    //   <DrawerItem
    //     label={() => (
    //       <View style={styles.menuLabelFlex}>
    //         {/* <Image
    //           style={{ width: 20, height: 20 }}
    //           source={iconSettings}
    //         />
    //         <Text style={styles.menuTitle}>Settings</Text> */}


    //       </View>
    //     )}
    //     onPress={() => props.navigation.navigate('Calendar')}
    //   />
    // </DrawerContentScrollView>
  );
}

const App = (props) => {
  const { all_states, all_township, all_depts, handleSubmit, get_state, get_township } = props

  useEffect(() => {
    // requestUserPermission()
    // notificationlistner()

  }, [])


  //const [isLoaded, setLoaded] = useState(false);

  //  useEffect(async() => {
  //   await loadAsync()
  //   setLoaded(true);
  // });

  const handletownship = (value) => {

    props.fetchtownship(value)
    //  SweetAlert.showAlertWithOptions({
    //   title: 'Success',
    //   subTitle: '',
    //   confirmButtonTitle: 'OK',
    //   confirmButtonColor: '#000',
    //   otherButtonTitle: 'Cancel',
    //   otherButtonColor: '#dedede',
    //   style: 'success',
    //   cancellable: true
    // },
    //   callback => console.log('callback'));
    //  navigate('Doctorbystate');
  }

  useEffect(() => {
    props.fetchstate()

  }, [])

  const onSubmit = (data) => {
    // const navigation = useNavigation()
    //  alert(`here is the value ${JSON.stringify(data)}`)
    // if (data !== null) {
    props.get_state_townshup_dept(data)
    // props.navigation.navigate("Doctorbystate")
    //  navigation.navigate("Doctorbystate")

    // }

  }

  const submitclinic = (data) => {
    // alert(`here is the value ${JSON.stringify(get_state,get_township)}`)
    props.fetchclinic_by_state(get_state, get_township)

  }
  return (
    <Drawer.Navigator
      drawerPosition="right"
      drawerHideStatusBarOnOpen='true'
      drawerStyle={{
        backgroundColor: '#3C38B1',
      }}
      drawerContent={(props) =>
        <CustomDrawerContent
          {...props} all_states={all_states} all_depts={all_depts}
          all_township={all_township} getstate={handletownship}
          parentCallback={handleSubmit(onSubmit)} getclinicdata={handleSubmit(submitclinic)} />}
    >
      <Drawer.Screen name="Userguidesplash" component={UserguideSplash} />
      <Drawer.Screen name="Homes" component={NavigatorView} />
    </Drawer.Navigator>

  );
}
const selector = formValueSelector('navigatorform');

const stateToProps = state => {
  return {
    all_states: state.state.states,
    all_township: state.township.townships,
    all_depts: state.dept.depts,
    get_state: selector(state, 'state'),
    get_township: selector(state, 'township')

  };
}
const navigatorwrap = reduxForm({
  form: "navigatorform",
  // validate

})(App)
export default connect(stateToProps, { fetchstate, fetchtownship, fetchdept, get_state_townshup_dept, fetchclinic_by_state })(navigatorwrap)

const styles = StyleSheet.create({

  row: {
    flexDirection: "column",
    // marginLeft: 5,
  },
  DsignGradient: {

    height: 45,
    width: '100%',
    borderRadius: 10,
    marginLeft: 7,
    justifyContent: "center",
    marginTop: 20,
    alignContent: 'center',
    textAlign: 'center',
  },
  CsignGradient: {
    height: 45,
    width: '100%',
    borderRadius: 10,
    marginLeft: 7,
    justifyContent: "center",
    marginTop: 10,
    alignContent: 'center',
    textAlign: 'center',
  },


  signButton: {
    width: '92%',
    marginLeft: 5
  },
  signText: {
    color: "#fff",
    alignSelf: "center",
    fontFamily: "Poppins_600SemiBold",
    fontSize: 13,
  },

  selectTextName: {
    color: "#5da7ec",
    alignSelf: 'flex-start',
    marginLeft: 5,
    marginBottom: 5,
    // alignSelf: "center",
    fontFamily: "Poppins_600SemiBold",
    fontSize: 15,
    fontWeight: 'bold'
  },

  itemImage: {
    height: 27,
    width: 27,
    marginLeft: 5
  },

  dropStyle: {

    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    width: '90%',
    marginTop: 30,
    color: 'white',
    marginLeft: 14
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  menuTitle: {
    marginLeft: 10,
    color: '#fff'
  },
  menuLabelFlex: {
    display: 'flex',
    flexDirection: 'row'
  },
  userName: {
    alignSelf: 'flex-start',
    color: '#5da7ec',
    fontSize: 17,
    fontWeight: 'bold',
    marginLeft: 0
  },
  divider: {
    borderBottomColor: '#5da7ec',
    opacity: 1,
    borderBottomWidth: 1,
    margin: 15,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  avatarContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    margin: 20,
    marginBottom: 10
  },
});
