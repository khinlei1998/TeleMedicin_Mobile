import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { GiftedChat, Send, Bubble, InputToolbar } from "react-native-gifted-chat";
import { IconButton } from "react-native-paper";
import { reduxForm } from 'redux-form';
import { connect } from "react-redux";
import { create_chat } from '../../../redux/Chatreducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchpatientbyphoneno } from '../../../redux/Patientreducer';
import axios from "axios";
import { BASE_URL } from '../../../components/common';
import Spinner from 'react-native-loading-spinner-overlay';

const ChatRoomScreen = (props) => {
  const doc_id = props.route.params.params
  const [messages, setMessages] = useState([]);
  const [spinner, setclosespinner] = useState(false);
  var interval = 0
  useEffect(() => {


    // props.navigation.addListener('focus', () => {
    let initial = [
      {
        _id: 0,
        text: "Q&A Session Created.",
        createdAt: new Date().getTime(),
        system: true,
      },

    ];
    AsyncStorage.getItem("Phone_no").then((token) => {
      if (token) {
        props.fetchpatientbyphoneno(token)
        if (doc_id) {
          fetchMyAPI()
        }
      }

    });
    setclosespinner(true)
    setTimeout(() => {
      setclosespinner(false);

    }, 4000);

    return () => {
      const clear = clearInterval(interval);
      console.log('clear', clear);
    }
    // })

  }, [props.patient_by_phone_no]);




  async function fetchMyAPI() {
    interval = setInterval(async () => {
      axios.get(`${BASE_URL}/patient/get_message_doctor/${doc_id}`,
        {
          responseType: 'json',
          headers: {
            'Content-Type': 'application/json',
            "Authorization": await AsyncStorage.getItem("Auth_Key")
          }
        })
        .then((data) => {
          const all_mes = data.data.data
          const filtered_mess = all_mes.filter((value) => value.patient_id == patient_by_phone_no.id)
          setMessages(
            GiftedChat.append(
              messages,
              filtered_mess.map((doc) => ({
                _id: Math.round(Math.random() * 1000000),
                text: doc.message_body,
                createdAt: doc.created_at,
                user: {
                  _id: doc.message_type == 1 ? 2 : 1,
                  name: doc.message_type == 1 ? "Admin" : "Patient",
                },
              }))
            )
          )


        })
    }, 5000)
  }

  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View style={styles.sendingContainer}>
          <IconButton icon="send-circle" size={32} color="#2d34c2" />
        </View>
      </Send>
    );
  }

  function renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#007bff"
          },
          left: {
            backgroundColor: "#a9f28f"
          }
        }}
      />
    )
  };

  const onSend = (newmessages = []) => {
    console.log('new', newmessages)
    props.create_chat(newmessages, (data) => {
      let Send_message = data.data

      Send_message["_id"] = newmessages[0]._id;
      Send_message["text"] = Send_message["message_body"];
      Send_message["user"] = { _id: 1, name: "patient" };
      Send_message["createdAt"] = Send_message["created_at"];
      setMessages(GiftedChat.append(messages, [Send_message]));
    })
  };

  const { patient_by_phone_no } = props


  return (
    <>
      <GiftedChat
        style={{ backgroundColor: 'white' }}
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{ patient_id: patient_by_phone_no.id, user_id: doc_id, _id: 1, message_type: "2" }}

        alwaysShowSend
        renderSend={renderSend}
        renderBubble={renderBubble}
      />
      <View style={{ position: 'absolute', top: "50%", right: 0, left: 0 }}>
        {spinner ?
          <Spinner
            visible={spinner}
            textContent={'Loading...'}
            textStyle={styles.spinnerTextStyle}
          />
          :
          <Text></Text>
        }
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  sendingContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  chatbackground: {
    backgroundColor: 'black',
    color: 'black',
  }
});

function maptoprops(state) {
  return {
    patient_by_phone_no: state.patient.patient_by_phoneno,


  }
}
const chatdetailwrap = reduxForm({
  form: "Profileditform",
})(ChatRoomScreen)

export default connect(maptoprops, { fetchpatientbyphoneno, create_chat })(chatdetailwrap)