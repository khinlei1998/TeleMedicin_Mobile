import React, {
  createContext,
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
} from 'react';
import { io } from 'socket.io-client';
import axios from 'axios';
import Peer from 'simple-peer';
import { BASE_URL, DEFAULT_CONFIG } from '../../components/common';
import { NativeModules } from 'react-native';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import SweetAlert from 'react-native-sweet-alert';

const SocketContext = React.createContext();
import {
  RTCPeerConnection,
  RTCIceCandidate,
  RTCSessionDescription,
  RTCView,
  MediaStream,
  MediaStreamTrack,
  mediaDevices,
  registerGlobals,
} from 'react-native-webrtc';
import AsyncStorage from '@react-native-async-storage/async-storage';
registerGlobals();
// const socket = io('https://warm-wildwood-81069.herokuapp.com');

var wrtc = require('react-native-webrtc');

const ContextProvider = ({ children }) => {
  var funcount = 1;
  //torefresh
  const [refreshing, setRefreshing] = useState(false);
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [stream, setStream] = useState();
  const [name, setName] = useState('');
  const [call, setCall] = useState({});
  const [me, setMe] = useState('');
  const [mysocket, setSocket] = useState('');

  const [userId, setUserId] = useState('');
  const [orgId, setOrgId] = useState('');

  const [cameraState, setcameraState] = useState(1);
  const [Serviceorgid, setServiceorgid] = useState('');
  const [ServiceTownshipid, setTserviceTownshipid] = useState('');
  const [patientinfo, setPatientinfo] = useState('3')
  const [doctor_id, setDoctorId] = useState('')
  let isFront = true;
  let sendcode = '';

  const [myVideo, setMyVideo] = useState();
  const [userVideo, setUserVideo] = useState();


  const [myVdoStatus, setMyVdoStatus] = useState(true);
  const [userVdoStatus, setUserVdoStatus] = useState(true);
  const connectionRef = React.useRef();
  // const myVideo = React.useRef();
  // const userVideo = React.useRef();


  useEffect(() => {

    AsyncStorage.getItem('doctor_id').then(token => {
      if (token) {
        setDoctorId(token)

      }
    })

    getpatientlist();
    getPermission();
    console.log('Permission Call Ended Status', callEnded);
  }, []);

  const getpatientlist = () => {
    AsyncStorage.getItem('Phone_no').then(async token => {
      if (token) {
        axios
          .get(`${BASE_URL}/patient/patient_by_phone/${token}`, {
            responseType: 'json',
            headers: {
              'Content-Type': 'application/json',
              Authorization: await AsyncStorage.getItem('Auth_Key'),
            },
          })
          .then(({ data }) => {
            //console.log('pat return', data)
            setPatientinfo(data.data)
            //callback();
          })
          .then(error => console.log('error', error));
      }
    });
  };

  const getPermission = () => {

    funcount = funcount + 1;
    console.log('funcount', funcount);
    setCallEnded(false);
    setCallAccepted(false);
    navigator.mediaDevices
      .getUserMedia({
        audio: true,
        video: {
          width: 1280,
          height: 720,
          frameRate: 30,
          facingMode: isFront ? 'user' : 'environment',
        },
        // video: true
      })
      .then(currentStream => {
        // if (currentStream) {
        //   currentStream.getAudioTracks()[0].enabled = true;
        // }
        console.log('currentstrean', currentStream);
        console.log("Stream is working now", currentStream.toURL());
        setStream(currentStream);
        setMyVideo(currentStream.toURL());
        // myVideo.current.srcObject = currentStream.toURL;
        //getSocketConnection();
      })
      .catch(e => {
        console.log(e);
      });
    // const socket = io('https://websocket.aggademo.me/');


    // mediaDevices.enumerateDevices().then(sourceInfos => {
    //   console.log('sourceInfos', sourceInfos);
    //   // let videoSourceId;
    //   // for (let i = 0; i < sourceInfos.length; i++) {
    //   //   const sourceInfo = sourceInfos[i];
    //   //   if(sourceInfo.kind == "videoinput" && sourceInfo.facing == (isFront ? "front" : "back")) {
    //   //     videoSourceId = sourceInfo.deviceId;
    //   //   }
    //   // }
    //   mediaDevices.getUserMedia({
    //     audio: true,
    //     video: {
    //       mandatory: {
    //         minWidth: 500,
    //         minHeight: 300,
    //         minFrameRate: 30
    //       },
    //       // facingMode: (isFront ? "user" : "environment"),
    //       // optional: (videoSourceId ? [{ sourceId: videoSourceId }] : [])
    //     }
    //   })
    //     .then(currentStream => {
    //       setStream(currentStream);
    //       setMyVideo(currentStream.toURL());
    //     })
    //     .catch(error => {
    //       // Log error
    //     });
    // });

    const socket = io('https://chat.telehealthmyanmar.com')
    setSocket(socket);
    socket.on('me', (id) => {
      setMe(id);
      console.log("SecretCode", id);
      codeSend(id);
    });
    // socket.on('me', setMe(Math.random()));

    // 


    socket.on('callUser', ({ from, name: callerName, signal }) => {
      //console.log('User is calling');
      setCall({ isReceivingCall: true, from, name: callerName, signal });
    });

    socket.on("updateUserMedia", ({ type, currentMediaStatus }) => {
      if (currentMediaStatus !== null || currentMediaStatus !== []) {
        switch (type) {
          case "video":
            setUserVdoStatus(currentMediaStatus);
            break;
          // case "mic":
          //   setUserMicStatus(currentMediaStatus);
          //   break;
          default:
            // setUserMicStatus(currentMediaStatus[0]);
            setUserVdoStatus(currentMediaStatus[0]);
            break;
        }
      }
    });

    AsyncStorage.getItem('user_id').then(token => {
      setUserId(token);
    });

    AsyncStorage.getItem('org_id').then(token => {
      setOrgId(token);
    });

    AsyncStorage.getItem('servicestate').then(token => {
      setServiceorgid(token);
    });

    AsyncStorage.getItem('servicetownship').then(token => {
      setTserviceTownshipid(token);
    });

    console.log('phone in getPermission=>', me);
    return me;
  };

  const answerCall = () => {
    setCallAccepted(true);
    const peer = new Peer({
      initiator: false,
      offerOptions: {},
      answerOptions: {},
      wrtc: wrtc,
      trickle: false,
      stream: stream,
    });
    //console.log('peer',);

    peer.on('signal', data => {
      console.log('onsignal', data);
      mysocket.emit('answerCall', { signal: data, to: call.from, myMediaStatus: [myVdoStatus], });
    });



    peer.on('stream', currentStream => {
      //console.log('currentStream',currentStream.toURL());
      setUserVideo(currentStream.toURL());
      // userVideo.current.srcObject = currentStream.toURL;

    });

    peer.signal(call.signal);

    connectionRef.current = peer;
  };

  const callUser = id => {
    const peer = new Peer({
      initiator: true,
      offerOptions: {},
      answerOptions: {},
      wrtc: wrtc,
      trickle: false,
      stream: stream,
    });

    peer.on('signal', data => {
      //console.log('callusersignal',id,me,name);
      mysocket.emit('callUser', {
        userToCall: id,
        signalData: data,
        from: me,
        name,
      });
    });

    peer.on('stream', currentStream => {
      console.log('currentStream', currentStream);
      setUserVideo(currentStream.toURL());
      // userVideo.current.srcObject = currentStream;
    });

    mysocket.on('callAccepted', signal => {
      setCallAccepted(true);
      peer.signal(signal);
      mysocket.emit("updateMyMedia", {
        type: "both",
        currentMediaStatus: [myVdoStatus],
      });
    });

    connectionRef.current = peer;
  };

  const leaveCall = () => {
    // alert('hello')

    if (connectionRef.current == undefined) {
      alert('not hangup')
    } else {
      setCallEnded(true);
      connectionRef.current.destroy();
    }

  };


  const cameraOff = () => {
    // if (cameraState == 1) {
    //   //close

    //   setcameraState(2);
    //   setStream('');
    //   setMyVideo('');
    //   //camera open or not

    // } else if (cameraState == 2) {
    //   setcameraState(1);
    //   navigator.mediaDevices
    //     .getUserMedia({
    //       audio: true,
    //       // video: {
    //       //   width: 1280,
    //       //   height: 720,
    //       //   frameRate: 30,
    //       //   facingMode: isFront ? 'user' : 'environment',
    //       // },
    //       video: true
    //     })
    //     .then(currentStream => {
    //       console.log('current Strean to add open', currentStream.toURL());
    //       // console.log("Stream is working now", currentStream.toURL());
    //       setStream(currentStream);

    //       setMyVideo(currentStream.toURL());
    //     });
    // }



    setMyVdoStatus((currentStatus) => {
      mysocket.emit("updateMyMedia", {
        type: "video",
        currentMediaStatus: !currentStatus,
      });
      stream.getVideoTracks()[0].enabled = !currentStatus;
      return !currentStatus;
    });


  };

  function codeSend(tosendcode) {

    AsyncStorage.getItem('Phone_no').then(async token => {
      if (token) {
        axios
          .get(`${BASE_URL}/patient/patient_by_phone/${token}`, {
            responseType: 'json',
            headers: {
              'Content-Type': 'application/json',
              Authorization: await AsyncStorage.getItem('Auth_Key'),
            },
          })
          .then(async ({ data }) => {
            const patient = data.data
            // setPatientinfo(data.data)
            if (patient) {
              AsyncStorage.getItem('doctor_id').then(async token => {
                if (token) {
                  let newmessages = [];
                  let data = {};
                  // console.log('Code=>', me);
                  data['text'] = tosendcode;
                  // data['text'] = Math.random();
                  data['user'] = {};

                  data['user']['user_id'] = token;
                  data['user']['patient_id'] = patient.id;
                  data['user']['org_state'] = Serviceorgid;
                  data['user']['org_township'] = ServiceTownshipid;
                  data['user']['message_type'] = 2;
                  newmessages.push(data);
                  axios.post(`${BASE_URL}/patient/chat`, newmessages,
                    {
                      responseType: 'json',
                      headers: {
                        'Content-Type': 'application/json',
                        "Authorization": await AsyncStorage.getItem("Auth_Key")
                      }
                    })
                    .then(({ data }) => {
                      if (data.status === 'success') {
                        SweetAlert.showAlertWithOptions({
                          title: 'Secret ID was Successfully Send to Admin',
                          subTitle: '',
                          confirmButtonTitle: 'OK',
                          confirmButtonColor: '#000',
                          otherButtonTitle: 'Success',
                          otherButtonColor: '#dedede',
                          style: 'success',
                          cancellable: true
                        },
                          callback => console.log('callback'));
                      }
                    })
                    .then(error => console.log('error', error));
                } else {
                }
              });
            }
            //callback();
          })
          .then(error => console.log('error', error));
      }
    });

  };
  // console.log('phone in outside=>', me);
  // console.log('callend in outside=>', callEnded);
  // sendcode = me ;
  // codeSend(sendcode);

  return (
    <SocketContext.Provider
      value={{
        call,
        callAccepted,
        myVideo,
        userVideo,
        stream,
        name,
        setName,
        callEnded,
        me,
        callUser,
        leaveCall,
        answerCall,
        // codeSend,
        cameraOff,
        myVdoStatus,
        setMyVdoStatus,
        userVdoStatus,
        setUserVdoStatus,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { ContextProvider, SocketContext };
