import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
        console.log('Authorization status:', authStatus);
        dvicetoken()

    }
}

const dvicetoken = async () => {
    const localtoken = await AsyncStorage.getItem('device_token');
    console.log('old device token', localtoken);

    if (!localtoken) {

        try {
            const fcmtoken = await messaging().getToken();
            if (fcmtoken) {
                console.log('new generated token', fcmtoken);
                await AsyncStorage.setItem('device_token', fcmtoken);
            }

        } catch (error) {
            console.log('final error', error);

        }
    }
}

export const backgroundtoken = () => {
    messaging().setBackgroundMessageHandler(async remoteMessage => {
        console.log('Message handled in the background!', remoteMessage);
    });
}
// export const notificationlistner = () => {
//     messaging().onNotificationOpenedApp(remoteMessage => {
//         console.log(
//             'Notification caused app to open from background state:',
//             remoteMessage.notification,
//         );
//     });

//     messaging().onMessage(async remoteMessage => {
//         console.log('notification back', remoteMessage);
//     })

//     messaging()
//         .getInitialNotification()
//         .then(remoteMessage => {
//             if (remoteMessage) {
//                 console.log(
//                     'Notification caused app to open from quit state:',
//                     remoteMessage.notification,
//                 );
//             }

//         });



// }




