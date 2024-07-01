import React, { useContext, useState } from 'react';
import { View, StyleSheet, Dimensions, Text, Image, Alert, Modal } from "react-native";
import {
  Container,
  Content,
  Card,
  CardItem,
  Body,
  Button
} from "native-base";
import { SocketContext } from '../../modules/VideoChat/Context';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  Avatar,
  Title

} from 'react-native-paper';

const { width } = Dimensions.get("screen");



// const showflash = () => {
//   return (
// < FlashMessage
//   position="top"
//   hideOnPress={true}
//   autoHide={false}
// />
// <View style={{backgroundColor: 'white', alignItems: 'center', justifyContent: 'center',marginTop:90 }}>
//   <View style={{ flexDirection: 'row', marginTop: 15 }}>
//     <Avatar.Image
//       source={{
//         uri: 'https://www.pngarts.com/files/5/User-Avatar-PNG-Free-Download.png',
//       }}
//       size={80}
//     />
//     <View style={{ marginLeft: 20, }}>
//       {/* <Title style={[styles.title, {
//         marginTop: 15,
//         marginBottom: 5,
//       }]}>yy</Title> */}
//       <Text>ll</Text>
//     </View>
//   </View>

// </View>

//   )




// }
const Notifications = () => {
  const { answerCall, call, callAccepted } = React.useContext(SocketContext);
  const [showalert, setshowalert] = useState(false)


  return (
    <>

      {call.isReceivingCall && !callAccepted && (
        // <View style={{flex:1}}>
        //   <View style={{ flexDirection: 'row', marginTop: 15 }}>
        //     <Avatar.Image
        //       source={{
        //         uri: 'https://www.pngarts.com/files/5/User-Avatar-PNG-Free-Download.png',
        //       }}
        //       size={80}
        //     />
        //     <View style={{ marginLeft: 20, }}>
        //       <Title style={[styles.title, {
        //         marginTop: 15,
        //         marginBottom: 5,
        //       }]}>yy</Title>
        //     </View>
        //   </View>          
        // </View>


        // <View style={{ flex: 1, flexDirection: 'row' ,height:70}}>
        //   <Text style={{fontSize:20,marginTop:10,marginLeft:20,marginRight:20}}>{call.name} is calling  :</Text>
        //   <Button block success style={[styles.btnsubmit],{width:120,borderRadius: 20,marginTop:10,marginRight: 10,
        //     marginLeft: 20,}}
        //     onPress={answerCall}>
        //     <Text style={{color:'white'}}><Icon name="phone" size={15} color="white"/> Answer Call</Text>
        //   </Button>
        // </View>
        <Modal
          animationType="slide"
          transparent={true}
          coverScreen={true}
          visible={true}
          onRequestClose={() => {
            // Alert.alert("Modal has been closed.");
            setVisible(!showalert);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={{ flexDirection: 'row', marginTop: 15 }}>
                <Avatar.Image
                  source={{
                    uri: 'https://www.pngarts.com/files/5/User-Avatar-PNG-Free-Download.png',
                  }}
                  size={70}
                />
                <View style={{ marginLeft: 20, }}>
                  <Title style={[styles.title, {
                    // marginTop: 10,
                    marginBottom: 5,
                  }]}>{call.name} is calling..</Title>
                </View>



              </View>
              <View style={{ flex: 1, position: 'absolute', right: 0, bottom: 0, marginBottom: 10}}>
                <Button block success style={[styles.btnsubmit], {
                  width: 120, borderRadius: 20, marginTop: 10, marginRight: 10,
                  marginLeft: 10,
                }}
                  onPress={answerCall}>
                  <Text style={{ color: 'white' }}><Icon name="phone" size={15} color="white" /> Answer Call</Text>
                </Button>
              </View>

            </View>
          </View>
        </Modal>
      )}
    </>
  );
};

export default Notifications;

const width_proportion = "80%";
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
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
    marginTop: 10,
    marginRight: 30,
    marginLeft: 20,
    alignSelf:'flex-start',
    borderRadius: 30,
  },
  defaultlogo: {
    width: 50,
    height: 50
  }
});
