import React, { useContext, useEffect } from 'react';
import { SocketContext } from '../../modules/VideoChat/Context';
import {
  StyleSheet,
  TextInput,
  View,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Text,
} from "react-native";
import {
  RTCPeerConnection,
  RTCIceCandidate,
  RTCSessionDescription,
  RTCView,
  MediaStream,
  MediaStreamTrack,
  mediaDevices,
  registerGlobals
} from 'react-native-webrtc';

import SweetAlert from 'react-native-sweet-alert';

// const showalert = () => {
//   return (
//     SweetAlert.showAlertWithOptions({
//       title: 'Secret ID was Successfully Send to Admin',
//       subTitle: '',
//       confirmButtonTitle: 'OK',
//       confirmButtonColor: '#000',
//       otherButtonTitle: 'Success',
//       otherButtonColor: '#dedede',
//       style: 'success',
//       cancellable: true
//     },
//       callback => console.log('callback'))
//   )
// }
const VideoPlayer = () => {
  const { name, callAccepted, myVideo, userVideo, callEnded, stream, call } = useContext(SocketContext);
  // console.log('uservideo', userVideo);
  // console.log('stream', stream);
  // console.log('myVideo', myVideo);

  useEffect(() => {
    // showalert()

  }, [])
  console.log('userVideo>>>', userVideo);
  return (
    <View>
      <View style={styles.cardstyle}>
        <RTCView
          objectFit='cover'
          streamURL={myVideo}
          style={styles.backgroundVideo} />


      </View>
      {userVideo == '' ? <View style={styles.usernoVideoview}>
        <Text style={styles.tilte}>Waiting Doctor</Text>

      </View> : <RTCView
        streamURL={userVideo}
        style={styles.userVideoview}
      />}

    </View>
  );
};

export default VideoPlayer;

const styles = StyleSheet.create({
  tilte: {
    textAlign: 'center',
    color: "#58656b",
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 310,

  },
  usernoVideoview: {
    width: '100%',
    height: 720,
    backgroundColor: '#303f46',
    marginTop: -230,
  },
  userVideoview: {
    width: '100%',
    height: 720,
    marginTop: -240,
  },
  cardstyle: {
    width: 130,
    height: 201,
    marginLeft: 230,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    borderRadius: 5,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    elevation: 5,
    zIndex: 3,
  },
  backgroundVideo: {
    width: 130,
    height: 200,
    elevation: 5,
    zIndex: 3,
  },
});
