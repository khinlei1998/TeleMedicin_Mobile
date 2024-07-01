import React, { Component, } from 'react';
import { Container, Content, List, ListItem, Left, Body, Right, Thumbnail, Text } from 'native-base';
import { connect } from "react-redux";
import { reduxForm, } from 'redux-form';
import { fetchchat } from '../../../redux/Chatreducer';
import moment from "moment";
import { fetchpatientbyphoneno } from '../../../redux/Patientreducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View } from 'react-native';
class ChatList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      phone_no: '',

    };
  }
  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener("focus", () => {
      AsyncStorage.getItem("Phone_no").then((token) => {
        if (token) {
          this.props.fetchchat();
          this.props.fetchpatientbyphoneno(token)

        } else {
          this.props.navigation.navigate("Login")
        }
      });

    });

  }

  componentWillUnmount() {
    this.unsubscribe;

  }

  render() {
    const { chat_lists, patient_by_phone_no } = this.props
    const filtered_chat = chat_lists.filter((chat, i) => chat.patient_id == patient_by_phone_no.id)

    var result = filtered_chat.reduce((unique, o) => {
      if (!unique.some(obj => obj.user_id === o.user_id)) {
        unique.push(o);
      }
      return unique;
    }, []);



    return (
      <Container>
        {result.length > 0 ?
          <Content>
            <List>
              {result.map((value) => {
                return (
                  <ListItem avatar onPress={() => {
                    this.props.navigation.navigate('ChatRoomScreen', { params: value.user_id });
                  }}>
                    <Left>
                      <Thumbnail source={require('../../../../assets/images/pages/chatnew.png')} />
                    </Left>
                    <Body>
                      <Text>{value.doctor_data.name}</Text>
                      <Text note>{value.message_body}</Text>
                    </Body>
                    <Right>
                      <Text note>{moment(value.created_at).format('LT')}</Text>
                    </Right>
                  </ListItem>
                )

              })}

            </List>
          </Content>
          :
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text style={{
              fontWeight: 'bold',
              color: 'gray',
            }}>There is no Chatlist yet</Text>
          </View>
        }
      </Container>
    );
  }
}

function maptoprops(state) {
  return {
    chat_lists: state.chat.chatlist,
    patient_by_phone_no: state.patient.patient_by_phoneno,

  }
}

const chatwrap = reduxForm({
  form: "Chatlistform",
})(ChatList)

export default connect(maptoprops, { fetchchat, fetchpatientbyphoneno })(chatwrap)