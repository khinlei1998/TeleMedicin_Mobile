import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator, Header } from '@react-navigation/stack';
import { Image, StyleSheet, View, TouchableOpacity } from 'react-native';
import StackNavigationData from './stackNavigationData';
import {
  HeaderSearchBar,
  HeaderClassicSearchBar
} from "react-native-header-search-bar";
//from stacknavigation
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
import Previewpdf from '../Lab/Previewpdf';
import Showpdf from '../Lab/Showpdf';
import LabImagePreview from '../Lab/LabImagePreview';
import PaymentTransaction from '../Profile/PaymentTransaction';
const Stack = createStackNavigator();

export default function NavigatorView(props) {
  const { t, i18n } = useTranslation();
  const headerBackground = require('../../../assets/images/topbg2.jpg');

  // if (authState.isLoggedIn || authState.hasSkippedLogin) {
  //     return <AppNavigator />;
  // }
  // return <AuthScreen />;
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

  const StackNavigationData = [
    {
      name: 'TeleHealth Myanmar',
      // name: 'Health',
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
      name: t('Available Doctors'),
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
      name: 'pdfreader',
      component: Showpdf,
      headerLeft: headerLeftComponent,
      headerBackground: { source: headerBackground },
      headerTitleStyle: {
        fontFamily: fonts.primaryRegular,
        color: colors.white,
        fontSize: 18,
      }
    },

    {
      name: 'paymenttran',
      title: 'Payment Transaction Lists',
      component: PaymentTransaction,
      headerLeft: headerLeftComponent,
      headerBackground: { source: headerBackground },
      headerTitleStyle: {
        fontFamily: fonts.primaryRegular,
        color: colors.white,
        fontSize: 18,
      },
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
      name: t('Appointment List'),
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
      name: 'LabResultImage',
      component: LabImagePreview,
      headerLeft: headerLeftComponent,
      headerBackground: { source: headerBackground },
      headerTitleStyle: {
        fontFamily: fonts.primaryRegular,
        color: colors.white,
        fontSize: 18,
      }
    },
    {
      name: t('Medical Reports'),
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
      name: t('docs'),
      component: Previewpdf,
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
      name: t('Search Clinics'),
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
      name: t('GP & Speciality'),
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
      name: t('View Profile'),
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
      name: t('Laboratory Reports'),
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
      name: t('Appointment'),
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
      name: t('Blogs & Contents'),
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

  const headerLeftComponentMenu = () => {
    return (
      // <></>
      <Image
        style={styles.absoluteFill}
        source={require('../../../assets/images/category/logo.jpg')}
      />
    )
  }

  const headerRigthComponentMenu = () => {
    return (
      <>
        <View>
          {/* <Button title="Open drawer" onPress={() => props.navigation.toggleDrawer()} /> */}
          <TouchableOpacity
            onPress={() => props.navigation.toggleDrawer()}

          >
            <Image
              source={require('../../../assets/images/pages/filter2.png')}
              resizeMode="contain"
              style={{
                height: 28,
                width: 34,
                marginRight: 10
              }}
            />
          </TouchableOpacity>

        </View>

      </>
    )
  }
  return (
    <Stack.Navigator>
      {StackNavigationData.map((item, idx) => (
        <Stack.Screen
          key={`stack_item-${idx + 1}`}
          name={item.name}

          component={item.component}
          options={{
            title: item.title,
            headerLeft: item.headerLeft || headerLeftComponentMenu,
            headerTintColor: '#5da7ec',
            // headerRight: item.name == 'TeleHealth Myanmar' ? headerRigthComponentMenu : null,
            // headerRight: false,
            headerBackground: () => (
              <Image style={styles.headerImage} source={item.headerBackground.source} />
            ),
            headerTitleStyle: item.headerTitleStyle,
          }}
        />
      ))}
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: 100 + '%',
    height: Header.height,
  },
  absoluteFill: {
    width: 50,
    height: 50,
    marginLeft: 15,
    borderRadius: 50
  }
});
