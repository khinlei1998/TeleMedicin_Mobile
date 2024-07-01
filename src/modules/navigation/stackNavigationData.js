import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import OtpScreen from '../view/Opt/';


import TabNavigator from './MainTabNavigator';
import GalleryScreen from '../gallery/GalleryViewContainer';
import DoctorsScreen from '../doctors/DoctorsView';
import ProfileSreen from '../Profile/ProfileView';
import TopupScreen from '../Topup/TopupView'
import AvailableInFullVersion from '../../modules/availableInFullVersion/AvailableInFullVersionViewContainer';
import DoctorProfile from '../view/Heart/DoctorProfile';
import ProfileDetail from '../view/Heart/ProfileDetail';
import Signup from '../view/SignUp/Signup';
import PagesScreen from '../pages/PagesView';
import Login from '../view/Login/Login';
import ChatRoomScreen from '../view/Chat/ChatDetail';
import VideoChatScreen from '../VideoChat/index';
import AppointmentForm from '../view/Appointment/AppointmentForm';
import AppointmentDetail from '../view/Appointment/AppointmentDetail';
import LabresultlistScreen from '../Lab/Lablresultlist';
import LabresultDeatailScreen from '../Lab/LabresultDetail';
import Forgot_Password from '../view/Login/Forgot_password';
import GuideScreen from '../applicationguide/AppGuide';
import Blog from '../view/Health_Blog';
import Blog_detail from '../view/Health_Blog/Blog_Detail';
import Promotion from '../view/Promotion_and_service';
import AllDoctorProfile from '../view/Heart/AllDoctorProfile';
import EditProfile from '../Profile/EditProfileView';
import Doctorbystate from '../view/Heart/Doctorbystate';
import ClinicByState from '../view/Clinic/ClinicByState';
import ClinicDetail from '../view/Clinic/ClinicDetail';
import PaymentScreen from '../view/Payment';
import Doctorlistbyclinic from '../view/Clinic/ClinicByDoctor';
import Treatmentdetail from '../view/Treatment/Treatmentdetail';
import LabImageUpload from '../Lab/LabImageUpload';
// import HelloWorldApp from '../Lab/Tabletest';
import ChatList from '../view/Chat/ChatList';
import { colors, fonts } from '../../styles';
import Apptest from '../view/test';
import Prmotion_detail from '../view/Promotion_and_service/Promotiondetail';
import Customersupportchat from '../view/Support/customer_support_chat';
import Language from '../Profile/LanguageView';
import PaymentForm from '../view/Appointment/PaymentForm';
import Forgetotp from '../view/Opt/Forget_otp'
import Newpassword from '../view/Opt/Newpassword';
import TreatmentList from '../view/Treatment';
import DoctorSearchByDept from '../doctors/DoctorSearchByDept';
import Appointment_list from '../Profile/Appointment_list';
import ClinicList from '../view/Clinic/ClinicList';
import { useTranslation } from 'react-i18next';

const headerLeftComponent = (props) => {

  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{
        paddingHorizontal: 16,
        paddingVertical: 12,
      }}
    >
      <Image
        source={require('../../../assets/images/icons/arrow-back.png')}
        resizeMode="contain"
        style={{
          height: 20,
        }}
      />
    </TouchableOpacity>
  )
}

const headerBackground = require('../../../assets/images/topbg2.jpg');
// const { t, i18n } = useTranslation();

const StackNavigationData = [
  {
    // name: 'TeleHealth Myanmar',
    name: 'Health',
    component: TabNavigator,
    headerLeft: null,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    },
  },
  {
    name: 'Doctor List By Department',
    component: DoctorSearchByDept,
    headerLeft: headerLeftComponent,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    }
  },

  {
    name: 'Charts',
    component: AvailableInFullVersion,
    headerLeft: headerLeftComponent,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    },
  },

  {
    name: 'Appointment List',
    component: Appointment_list,
    headerLeft: headerLeftComponent,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    },
  },


  {
    name: 'Doctorbystate',
    component: Doctorbystate,
    headerLeft: headerLeftComponent,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    }
  },
  {
    name: 'Treatment Lists',
    component: TreatmentList,
    headerLeft: headerLeftComponent,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    }
  },

  {
    name: 'Treatment Detail',
    component: Treatmentdetail,
    headerLeft: headerLeftComponent,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    }
  },

  {
    name: 'Clinic List',
    component: ClinicList,
    headerLeft: headerLeftComponent,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    }
  },

  {
    name: 'GP & Speciality',
    component: DoctorsScreen,
    headerLeft: headerLeftComponent,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    },
  },
  {

    name: 'Enter OTP',

    component: OtpScreen,

    headerLeft: headerLeftComponent,

    headerBackground: { source: headerBackground },

    headerTitleStyle: {

      fontFamily: fonts.primaryRegular,

      color: colors.white,

      fontSize: 18,

    },

  },
  {
    name: 'Topup',
    component: TopupScreen,
    headerLeft: headerLeftComponent,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    },
  },
  {
    name: 'Blog',
    component: AvailableInFullVersion,
    headerLeft: headerLeftComponent,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    },
  },
  {
    name: 'Gallery',
    component: GalleryScreen,
    headerLeft: headerLeftComponent,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    },
  },
  {
    name: 'Profile',
    component: AvailableInFullVersion,
    headerLeft: headerLeftComponent,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    },
  },
  {
    name: 'Article',
    component: AvailableInFullVersion,
    headerLeft: headerLeftComponent,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    },
  },
  // {
  //   name: 'table',
  //   component: HelloWorldApp,
  //   headerLeft: headerLeftComponent,
  //   headerBackground: { source: headerBackground },
  //   headerTitleStyle: {
  //     fontFamily: fonts.primaryRegular,
  //     color: colors.white,
  //     fontSize: 18,
  //   },
  // },
  {
    name: 'Chat',
    component: AvailableInFullVersion,
    headerLeft: headerLeftComponent,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    },
  },
  {
    name: 'Messages',
    component: AvailableInFullVersion,
    headerLeft: headerLeftComponent,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    },
  },
  {
    name: 'Doctorprofile',
    component: DoctorProfile,
    headerLeft: headerLeftComponent,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    },
  },

  {
    name: 'Clinic By State and Township',
    component: ClinicByState,
    headerLeft: headerLeftComponent,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    },
  },

  {
    name: 'Lab Image Upload',
    component: LabImageUpload,
    headerLeft: headerLeftComponent,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    },
  },

  {
    name: 'Auth',
    component: AvailableInFullVersion,
    headerLeft: headerLeftComponent,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    },
  },
  {
    name: 'Profiledetail',
    component: ProfileDetail,
    headerLeft: headerLeftComponent,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    },
  },


  {
    name: 'ChatList',
    component: ChatList,
    headerLeft: headerLeftComponent,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    },
  },
  {
    name: 'Signup',
    component: Signup,
    headerLeft: headerLeftComponent,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    },
  },
  {
    name: 'PaymentForm',
    component: PaymentForm,
    headerLeft: headerLeftComponent,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    },
  },

  {
    name: 'Login',
    component: Login,
    headerLeft: headerLeftComponent,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    },
  },
  {
    name: 'Pages',
    component: PagesScreen,
    headerLeft: headerLeftComponent,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    },
  },
  {
    name: 'Lab Results',
    component: LabresultlistScreen,
    headerLeft: headerLeftComponent,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    },
  },
  {
    name: 'New Password Form',
    component: Newpassword,
    headerLeft: headerLeftComponent,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    },
  },


  {
    name: 'Payment Screen',
    component: PaymentScreen,
    headerLeft: headerLeftComponent,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    },
  },
  {
    name: 'ChatRoomScreen',
    component: ChatRoomScreen,
    headerLeft: headerLeftComponent,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    },
  },

  {
    name: 'Language',
    component: Language,
    headerLeft: headerLeftComponent,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    },
  },
  {
    name: 'VideoChat',
    component: VideoChatScreen,
    headerLeft: headerLeftComponent,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    },
  },


  {
    name: 'Appointment',
    component: AppointmentForm,
    headerLeft: headerLeftComponent,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    },
  },

  {
    name: 'Clinic Detail',
    component: ClinicDetail,
    headerLeft: headerLeftComponent,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    },
  },

  {
    name: 'Appointment Detail',
    component: AppointmentDetail,
    headerLeft: headerLeftComponent,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    },
  },

  {
    name: 'Lab Result Information',
    component: LabresultDeatailScreen,
    headerLeft: headerLeftComponent,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    },
  },
  {
    name: 'Guide',
    component: GuideScreen,
    headerLeft: headerLeftComponent,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    },
  },

  {
    name: 'Forgot Password',
    component: Forgot_Password,
    headerLeft: headerLeftComponent,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    },
  },

  {
    name: 'Forgot Otp',
    component: Forgetotp,
    headerLeft: headerLeftComponent,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    },
  },

  {
    name: 'test',
    component: Apptest,
    headerLeft: headerLeftComponent,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    },
  },
  {
    name: 'Health Blog',
    component: Blog,
    headerLeft: headerLeftComponent,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    },
  },
  {
    name: 'Blog Detail',
    component: Blog_detail,
    headerLeft: headerLeftComponent,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    },
  },
  {
    name: 'Promotion & Service',
    component: Promotion,
    headerLeft: headerLeftComponent,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    },
  },

  {
    name: 'Doctor list by clinic',
    component: Doctorlistbyclinic,
    headerLeft: headerLeftComponent,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    },
  },

  {
    name: 'Promotion Detail',
    component: Prmotion_detail,
    headerLeft: headerLeftComponent,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    },
  },

  {
    name: 'All Doctor Profile',
    component: AllDoctorProfile,
    headerLeft: headerLeftComponent,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    },
  },

  {
    name: 'Customer Support Chat',
    component: Customersupportchat,
    headerLeft: headerLeftComponent,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    },
  },

  {
    name: 'Edit Profile',
    component: EditProfile,
    headerLeft: headerLeftComponent,
    headerBackground: { source: headerBackground },
    headerTitleStyle: {
      fontFamily: fonts.primaryRegular,
      color: colors.white,
      fontSize: 18,
    },
  },


]

export default StackNavigationData;
const styles = StyleSheet.create({
  headerlogo: {
    height: 80,
    width: 80,
  }
})