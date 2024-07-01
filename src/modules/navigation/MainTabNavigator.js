import React, { useEffect, useState } from 'react';
import { Text, View, Image, StyleSheet, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { colors } from '../../styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/core';
import { useTranslation } from 'react-i18next';
import HomeScreen from '../home/HomeViewContainer';
import AllDoctorProfile from '../view/Heart/AllDoctorProfile';
import ProfileScreen from '../Profile/ProfileViewContainer';
import CalendarScreen from '../calendar/CalendarViewContainer';
import ChatList from '../view/Chat/ChatList';

const iconHome = require('../../../assets/butnavicon/home1.png');
const iconCalendar = require('../../../assets/butnavicon/calendar1.png');
const iconGrids = require('../../../assets/butnavicon/doctor1.png');
const iconPages = require('../../../assets/butnavicon/chat1.png');
const iconComponents = require('../../../assets/butnavicon/user1.png');
const Tab = createBottomTabNavigator();



export default function BottomTabs() {
  const { t, i18n } = useTranslation();
  const navigation = useNavigation();
  const [phone, setPhone_Number] = useState(false)
  useEffect(() => {
    navigation.addListener('focus', () => {
      AsyncStorage.getItem("Phone_no").then((token) => {
        setPhone_Number(token)
      });
    })


  }, []);

  const tabNavigationData = [

    {
      name: t('Home'),
      component: HomeScreen,
      icon: iconHome,

    },
    {
      name: t('Doctor'),
      component: AllDoctorProfile,
      icon: iconGrids,
    },

    {
      name: t('Account'),
      component: ProfileScreen,
      icon: iconComponents,
    },
  ];


  const logedtabNavigationData = [
    {
      name: t('Home'),
      component: HomeScreen,
      icon: iconHome,

    },

    {
      name: t('Calendar'),
      component: CalendarScreen,
      icon: iconCalendar,
    },
    {
      name: t('Doctor'),
      component: AllDoctorProfile,
      icon: iconGrids,
    },
    // {
    //   name: t('Chat'),
    //   component: ChatList,
    //   icon: iconPages,
    // },
    {
      name: t('Account'),
      component: ProfileScreen,
      icon: iconComponents,
    },


  ];

  // const Left = ({ onPress }) => (
  //   <TouchableHighlight onPress={}>
  //     <Image
  //       source={require('../../../assets/images/pages/laboratory.png')}
  //     />
  //   </TouchableHighlight>
  // );

  const headerRigthComponentMenu = () => {
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

  return (
    <Tab.Navigator tabBarOptions={{ style: { height: Platform.OS === 'ios' ? 90 : 50 } }}>
      {phone ? logedtabNavigationData.map((item, idx) => (
        <Tab.Screen
          key={`tab_item${idx + 1}`}
          name={item.name}
          component={item.component}

          options={{
            // headerRight: headerRigthComponentMenu,
            // header: ({  }) => ({
            //   left: <Left  />,
            // }),

            tabBarIcon: ({ focused }) => (
              <View style={styles.tabBarItemContainer}>
                <Image
                  resizeMode="contain"
                  source={item.icon}
                  style={[styles.tabBarIcon, focused && styles.tabBarIconFocused]}
                />
              </View>
            ),
            tabBarLabel: ({ focused }) => <Text style={{ flex: 1, textAlign: 'center', fontSize: 10, color: focused ? colors.primary : colors.gray }}>{item.name}</Text>,
          }}
        />
      )) : tabNavigationData.map((item, idx) => (
        <Tab.Screen
          key={`tab_item${idx + 1}`}
          name={item.name}
          component={item.component}

          options={{
            headerRight: headerRigthComponentMenu,
            // header: ({  }) => ({
            //   left: <Left  />,
            // }),

            tabBarIcon: ({ focused }) => (
              <View style={styles.tabBarItemContainer}>
                <Image
                  resizeMode="contain"
                  source={item.icon}
                  style={[styles.tabBarIcon, focused && styles.tabBarIconFocused]}
                />
              </View>
            ),
            tabBarLabel: ({ focused }) => <Text style={{ textAlign: 'center', fontSize: 10, color: focused ? colors.primary : colors.gray }}>{item.name}</Text>,
          }}
        />
      ))
      }
    </Tab.Navigator>
  );

};

const styles = StyleSheet.create({
  tabBarItemContainer: {
    // flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    borderBottomWidth: 2,
    borderBottomColor: colors.white,
    // // paddingHorizontal: 10,
    bottom: Platform.OS === 'ios' ? -5 : 0,
  },
  tabBarIcon: {
    // 23
    // alignItems: 'center',
    // justifyContent: "center",
    width: 20,
    height: 20,
  },
  tabBarIconFocused: {
    tintColor: '#5da7ec',
  },
});
