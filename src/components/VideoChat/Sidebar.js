import React, { useState, useContext } from 'react';
import { Container, Content, Card, CardItem, Body, Button } from "native-base";
import { Text } from "react-native";
const { width } = Dimensions.get("screen");
import {
  StyleSheet,
  TextInput,
  View,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  ImageBackground,
  TouchableOpacity,
  Clipboard,
  ScrollView,
  Dimensions,

} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

import { SocketContext } from '../../modules/VideoChat/Context';


const Sidebar = ({ children }) => {
  const { me, callAccepted, answerCall, name, setName, callEnded, cameraOff, leaveCall, callUser, codeSend, updateVideo } = useContext(SocketContext);
  const [idToCall, setIdToCall] = useState('');
  const [isCameraVisible, setCameraVisible] = useState(true);



  const copyToClipboard = () => {
    Clipboard.setString(me);
  }

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <KeyboardAvoidingView enabled>
          {/* <View style={styles.SectionStyle}>
                <TextInput style={styles.inputStyle} underlineColorAndroid="#f000"  placeholder="Enter Name" placeholderTextColor="#8b9cb5"
                autoCapitalize="sentences" label="Name" value={name} onChangeText={(UserName) => {setName(UserName)}} fullWidth />
              </View> */}
          {/*<View style={styles.SectionStyle}>
                <TextInput style={styles.inputStyle} underlineColorAndroid="#f000"  placeholder="Enter ID To Call" placeholderTextColor="#8b9cb5"
                autoCapitalize="sentences" label="ID to call" value={idToCall} onChangeText={(IdNumber) =>setIdToCall(IdNumber)} fullWidth />
              </View>*/}
          <View style={{ flex: 1, flexDirection: 'row', borderRadius: 20, alignItems: 'center', justifyContent: 'center', width: '99%', borderColor: 'black', backgroundColor: '#f6f6f6', blurRadius: '1' }}>
            {/* <Button block style={{ marginTop: 17, marginRight: 40, width: 60, bottom: 10, right: 10, height: 60, borderRadius: 30, backgroundColor: '#76b81f', }} variant="contained" onPress={codeSend}>
              <Text color="white"><Icon name="send" size={15} color="white" /></Text>
            </Button> */}
            <Button block style={{ marginTop: 17, marginRight: 60, width: 60, bottom: 10, right: 10, height: 60, borderRadius: 30, backgroundColor: '#028fdd', }} variant="contained" onPress={cameraOff}>
              <Text color="white"><Icon name="camera" size={15} color="white" /></Text>
            </Button>
            <Button block style={{ marginTop: 17, width: 60, bottom: 10, right: 10, height: 60, borderRadius: 30, backgroundColor: 'red', }} variant="contained" onPress={leaveCall}>
              <Text color="white"><Icon name="phone" size={15} color="white" /></Text>
            </Button>
          </View>
          {/* <View style={{ flex: 1, flexDirection: 'row' }}>
              {callAccepted && !callEnded ? (
                <Button block danger
                  style={[styles.btnsubmit],{width:320,borderRadius: 20,marginTop:10,
                  marginRight: 20,
                  marginLeft: 30,}}
                  onPress={leaveCall}>
                  <Text color="white"><Icon name="phone" size={15} color="white"/> End Call</Text>
                </Button>
              ) : (
                <Button block success style={[styles.btnsubmit],{width:320,borderRadius: 20,marginTop:10,
                marginRight: 20,
                marginLeft: 30,}} variant="contained" color="primary" fullWidth onPress={() => codeSend()}>
                    <Text color="white"><Icon name="send" size={15} color="white"/> Send Your ID</Text>
                </Button>
              )}
            </View> */}
          {children}
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};

export default Sidebar;
const width_proportion = "80%";
const styles = StyleSheet.create({
  SectionStyle: {
    flexDirection: "row",
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  dropStyle: {
    borderRadius: 30,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: "#7DE24E",
    borderWidth: 0,
    color: "#FFFFFF",
    borderColor: "#7DE24E",
    height: 40,
    alignItems: "center",
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonTextStyle: {
    color: "#FFFFFF",
    paddingVertical: 10,
    fontSize: 16,
  },
  inputStyle: {
    flex: 1,
    color: "black",
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: "#dadae8",
  },
  errorTextStyle: {
    color: "red",
    textAlign: "center",
    fontSize: 14,
  },
  successTextStyle: {
    color: "black",
    textAlign: "left",
    fontSize: 18,
    padding: 30,
  },
  group: {
    paddingTop: 3 * 3.75,
  },
  btncameraoff: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#ee6e73',
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  options: {
    position: "relative",
    padding: 3,
    marginHorizontal: 3,
    marginTop: 13,
    borderTopLeftRadius: 13,
    borderTopRightRadius: 13,
    backgroundColor: 'white',
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    zIndex: 2,
    width: width - 3 * 2,
    paddingVertical: 3 * 2,
  },
  orgcard: {
    flex: 1,
    backgroundColor: "red",
    flexDirection: "row",
    justifyContent: "space-around",
    // width:50,
    width: width_proportion,
    alignItems: "center",
    justifyContent: "center",
  },
  // Org

  row: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  button: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
    backgroundColor: "oldlace",
    alignSelf: "flex-start",
    marginHorizontal: "1%",
    marginBottom: 6,
    minWidth: "48%",
    minHeight: "15%",

    textAlign: "center",
  },
  selected: {
    backgroundColor: "coral",
    borderWidth: 0,
    color: "#fff",
  },
  buttonLabel: {
    fontSize: 12,
    fontWeight: "500",
    color: "coral",
    textAlign: "left",
    marginLeft: 20,
    color: "black",

    paddingVertical: 20,
  },
  btnsubmit: {
    marginTop: 20,
    marginRight: 30,
    marginLeft: 40,
    borderRadius: 30,
  },
});
