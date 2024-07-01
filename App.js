import { Provider } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet, StatusBar, Platform, Button, Text, Image } from 'react-native';
import { PersistGate } from 'redux-persist/integration/react';
import { NavigationContainer } from '@react-navigation/native';
import { colors } from './src/styles';
import { store, persistor } from './src/redux/store';
import AppView from './src/modules/AppViewContainer';
// import AnimatedSplash from "react-native-animated-splash-screen";
import AnimatedLoader from "react-native-animated-loader";
import { requestUserPermission, backgroundtoken } from './src/utils/firebaseNotification';
import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidImportance } from '@notifee/react-native';
import { useNetInfo, NetInfo } from '@react-native-community/netinfo'

export default function App() {
  const nosignal = require('./assets/images/category/no-signal.png');

  const netInfo = useNetInfo()
  const [gateLifted, setGateLifted] = useState(false);
  const [notitest, setNotitest] = useState({ title: '', body: '' })
  const [connectionstatus, setConnectionstatus] = useState()
  const onBeforeLift = () => {
    // Take an action before the gate lifts
    setTimeout(() => {
      setGateLifted(true);
    }, 3000);
  }

  const [notification, setNotification] = useState({
    title: undefined,
    body: undefined,
    image: undefined,
  });




  useEffect(() => {
    StatusBar.setBarStyle('light-content', true)
    StatusBar.setBackgroundColor("#5da7ec")
    requestUserPermission()
    backgroundtoken()


    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('remoteMessage', JSON.stringify(remoteMessage));
      DisplayNotification(remoteMessage);
      setNotitest({
        title: remoteMessage.notification.title,
        body: remoteMessage.notification.body
      });
      // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification.title,
      );
      setNotitest({
        title: remoteMessage.notification.title,
        body: remoteMessage.notification.body
      });
    });

    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification.title,
          );
          setNotitest({
            title: remoteMessage.notification.title,
            body: remoteMessage.notification.body
          });
        }

      });

    return () => {
      unsubscribe;
    }
  }, [])

  async function DisplayNotification(remoteMessage) {
    // Create a channel
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      // badge: true,
      importance: AndroidImportance.HIGH,
    });

    // Display a notification
    await notifee.displayNotification({
      title: remoteMessage.notification.title,
      body: remoteMessage.notification.body,
      android: {
        channelId,
        smallIcon: 'ic_launcher',
        importance: AndroidImportance.HIGH, // optional, defaults to 'ic_launcher'.
      },
    });
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <PersistGate
          onBeforeLift={onBeforeLift}
          // loading={
          //   // eslint-disable-next-line react/jsx-wrap-multilines
          //   // <View style={styles.container}>
          //   //   <ActivityIndicator color={colors.red} />
          //   // </View>
          //   <View style={styles.container}>
          //     <AnimatedSplash
          //           translucent={true}
          //           isLoaded={true}
          //           logoImage={require("./assets/images/icons/applogo.png")}
          //           backgroundColor={"#ffffff"}
          //           logoHeight={350}
          //           logoWidth={350}
          //     >  
          //     </AnimatedSplash>
          //   </View>
          // }
          persistor={persistor}
        >
          {gateLifted ?
            <>
              {!netInfo.isConnected &&
                <View style={{ width: '100%', height: '100%', backgroundColor: 'white', justifyContent: 'center', alignItems: "center" }}>
                  <View style={{ alignItems: 'center' }}>
                    {/* <WifiIcon width={200} height={100} /> */}
                    <Image source={nosignal} style={{ width: 70, height: 70 }} />
                  </View>
                  <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 17 }}>Connection Error</Text>
                  <Text style={{ color: 'black', alignItems: 'center', justifyContent: 'center', }}>Please Check Your Network  and try again.</Text>

                </View>
              }
              <AppView /></>

            // <>
            //   <Text>Firebase Noti</Text>
            //   <Text>{`title:${notification.title}`}</Text>
            // </>
            // <>
            //   <Button title="Send Notification" onPress={sendNotification} />
            //   <Button
            //     title="Send Multi Device Notification"
            //     onPress={sendMultiNotification}
            //   />
            // </>
            :
            // <AnimatedSplash
            //           translucent={true}
            //           isLoaded={true}
            //           logoImage={require("./assets/images/icons/applogo.png")}
            //           backgroundColor={"#ffffff"}
            //           logoHeight={350}
            //           logoWidth={350}
            //     > 
            //     </AnimatedSplash>
            <View>
              <AnimatedLoader
                visible={true}
                overlayColor="rgba(255,255,255,0.75)"
                source={require("./assets/healthloader.json")}
                // source={require("./assets/logo.json")}
                animationStyle={styles.lottie}
                speed={0.2}
              ></AnimatedLoader>
            </View>
          }

        </PersistGate>
      </NavigationContainer>
    </Provider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  lottie: {
    width: 250,
    height: 250,
    backgroundColor: 'white'
  }
});
//Test
