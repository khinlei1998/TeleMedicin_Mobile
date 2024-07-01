import React, { useCallback, useState, useEffect } from 'react';
import { Text, View, Dimensions, TouchableOpacity, StatusBar, StyleSheet } from 'react-native';
import { GiftedChat, Send, Bubble, InputToolbar } from "react-native-gifted-chat";
import { IconButton } from "react-native-paper";
import { useNavigation } from '@react-navigation/core';
import { fetchpatientbyphoneno } from '../../../redux/Patientreducer';
import { reduxForm } from 'redux-form';
import { connect } from "react-redux";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create_support_chat } from '../../../redux/Chatreducer';
import axios from "axios";
import { BASE_URL } from '../../../components/common';
import Spinner from 'react-native-loading-spinner-overlay';

const Customersupportchat = (props) => {
  const [spinner, setclosespinner] = useState(false);

  const navigation = useNavigation();
  const [messages, setMessages] = useState([
    {
      _id: 0,
      text: "Q&A Session Created.",
      createdAt: new Date().getTime(),
      system: true,
    },

  ]);
  const { patient_by_phone_no } = props
  const patient_id = patient_by_phone_no.id
  var interval = 0

  useEffect(() => {
    props.navigation.addListener('focus', () => {
      fetchMyAPI()
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
        }

      });
      setclosespinner(true)
      setTimeout(() => {
        setclosespinner(false);
      }, 4000);
    })
    return () => {
      const clear = clearInterval(interval);
      console.log('clear', clear);
    }

  }, []);
  const onSend = (newmessages = []) => {
    props.create_support_chat(newmessages, (data) => {
      let Send_message = data.data

      Send_message["_id"] = newmessages[0]._id;
      Send_message["text"] = Send_message["message_body"];
      Send_message["user"] = { _id: 1, name: "patient" };
      Send_message["createdAt"] = Send_message["created_at"];
      setMessages(GiftedChat.append(messages, [Send_message]));
    })
  };
  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View style={styles.sendingContainer}>
          <IconButton icon="send-circle" size={32} color="#76b81f" />
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
            backgroundColor: "#76b81f"
          }
        }}
      />
    )
  };

  function renderInputToolbar(props) {
    //Add the extra styles via containerStyle
    return <InputToolbar {...props} containerStyle={{ borderTopWidth: 1.5, borderTopColor: '#333' }} />
  }

  async function fetchMyAPI() {
    interval = setInterval(async () => {
      axios.get(`${BASE_URL}/patient/get_patientchat/${patient_id}`,
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
  return (
    <>
      <GiftedChat
        style={{ backgroundColor: 'white' }}
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{ patient_id: patient_by_phone_no.id, user_id: 1, _id: 1, message_type: "2" }}

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
const Customersupportchatwrap = reduxForm({
  form: "Customersupportchatform",
})(Customersupportchat)

export default connect(maptoprops, { fetchpatientbyphoneno, create_support_chat })(Customersupportchatwrap)