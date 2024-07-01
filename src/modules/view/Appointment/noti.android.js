import PushNotification from "react-native-push-notification";
class Notification {
    configure = () => {
      PushNotification.configure({
        onRegister: function (token) {
          // console.log("TOKEN:", token);
        },
  
        onNotification: function (notification) {
          // console.log("NOTIFICATION:", notification);
  
          notification.finish(PushNotificationIOS.FetchResult.NoData);
        },
  
        onAction: function (notification) {
          // console.log("ACTION:", notification.action);
          // console.log("NOTIFICATION:", notification);
        },
  
        onRegistrationError: function (err) {
          console.error(err.message, err);
        },
  
        permissions: {
          alert: true,
          badge: true,
          sound: true,
        },
  
        popInitialNotification: true,
  
        requestPermissions: true,
        requestPermissions: Platform.OS === "ios",
      });
    };
    createchannel = (channel) => {
      PushNotification.createChannel(
        {
          channelId: channel, // (required)
          channelName: "My channel", // (required)
          channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
          playSound: false, // (optional) default: true
          soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
          vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
        },
        (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
      );
    };
    sendnotification = (channel, title, message) => {
      PushNotification.localNotification({
        channelId: channel, //re
        title: title, // (optional)
        message: message,
      });
    };
    sendnotificationschedule = (channel, title, messag) => {
      PushNotification.localNotificationSchedule({
        channelId: channel, //re
        message: messag, // (required)
        date: new Date(Date.now() + 3 * 1000), // in 5 secs
        title: title,
      });
    };
  }
  
  export default Notification = new Notification();