import HomeScreen from '../home/HomeViewContainer';
import CalendarScreen from '../calendar/CalendarViewContainer';
import GridsScreen from '../grids/GridsViewContainer';
import PagesScreen from '../pages/PagesViewContainer';
import ComponentsScreen from '../components/ComponentsViewContainer';
import DoctorProfile from '../view/Heart/DoctorProfile';
import ProfileDetail from '../view/Heart/ProfileDetail';
import ProfileScreen from '../Profile/ProfileViewContainer';
import ChatList from '../view/Chat/ChatList';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AllDoctorProfile from '../view/Heart/AllDoctorProfile';
import { useTranslation } from 'react-i18next';
const iconHome = require('../../../assets/butnavicon/home1.png');
const iconCalendar = require('../../../assets/butnavicon/calendar1.png');
const iconGrids = require('../../../assets/butnavicon/doctor1.png');
const iconPages = require('../../../assets/butnavicon/chat1.png');
const iconComponents = require('../../../assets/butnavicon/user1.png');
// const { t, i18n } = useTranslation();
import { useNavigation } from '@react-navigation/core';

const headerRigthComponentMenu = () => {

  // const [phone, setPhone_Number] = useState()
  // const navigation = useNavigation();
  // useEffect(() => {
  //   navigation.addListener('focus', () => {
  //     AsyncStorage.getItem("Phone_no").then((token) => {
  //       setPhone_Number(token)
  //     });
  //   })
  // }, []);
  return (
    <>
      <View>
        {/* <Button title="Open drawer" onPress={() => props.navigation.toggleDrawer()} /> */}
        <TouchableOpacity
          onPress={() => props.navigation.toggleDrawer()}

        >
          <Image
            source={require('../../../assets/images/pages/filter.png')}
            resizeMode="contain"
            style={{
              height: 26,
              width: 30,
              marginRight: 10
            }}
          />
        </TouchableOpacity>

      </View>

    </>
  )
}

// export const logedtabNavigationData = [
//   {
//     name: 'Home',
//     component: HomeScreen,
//     icon: iconHome,

//   },

//   {
//     name: 'Calendar',
//     component: CalendarScreen,
//     icon: iconCalendar,
//   },
//   {
//     name: 'Doctor',
//     component: AllDoctorProfile,
//     icon: iconGrids,
//   },
//   {
//     name: 'Chat',
//     component: ChatList,
//     icon: iconPages,
//   },
//   {
//     name: 'Account',
//     component: ProfileScreen,
//     icon: iconComponents,
//   },


// ];

// export const tabNavigationData = [

//   {
//     name: 'Home',
//     component: HomeScreen,
//     icon: iconHome,

//   },
//   {
//     name: 'Doctor',
//     component: AllDoctorProfile,
//     icon: iconGrids,
//   },

//   {
//     name: 'Account',
//     component: ProfileScreen,
//     icon: iconComponents,
//   },
// ]


