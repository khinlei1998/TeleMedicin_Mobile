import React, {useEffect} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ImageBackground,
  StatusBar,
  Image,
  Button,
  ScrollView,
  Dimensions
} from 'react-native';
import { Card , Icon } from 'react-native-elements';

import { fonts, colors } from '../../styles';
import { Text } from '../../components/StyledText';
import { AntDesign,Entypo } from '@expo/vector-icons';

const SPACING_FOR_CARD_INSET = Dimensions.get('window').width * 0.1 - 10
const CARD_WIDTH = Dimensions.get('window').width * 0.8

const chatIcon = require('../../../assets/images/pages/chatnew.png');
const calendarIcon = require('../../../assets/images/pages/calendarnew.png');
const videocallIcon = require('../../../assets/images/pages/video-call.png');
const labIcon = require('../../../assets/images/pages/lab.png');
const treatmentIcon = require('../../../assets/images/pages/first-aid-kit.png');
const drugIcon = require('../../../assets/images/pages/drugs.png');
const customerIcon = require('../../../assets/images/pages/customer-service.png');

const users = [
 {
    name: 'brynn',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg'
 }
]

export default function TopupScreen(props) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.row}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Charts')}
            style={styles.item}
          >
            <Image
              resizeMode="contain"
              source={{uri:'https://www.kbzpay.com/wp-content/uploads/sites/9/2020/04/blue-L.png'}}
              style={styles.itemImage}
            />
            <Text style={styles.kbzitemText}>KBZ Pay</Text>
          </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('Gallery')}
          style={styles.item}
        >
          <Image
            resizeMode="contain"
            source={{uri:'data:image/png;base64,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'}}
            style={styles.itemImage}
          />
          <Text style={styles.opitemText}>One Pay</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('Profile')}
          style={styles.item}
        >
          <Image
            resizeMode="contain"
            source={{uri:'https://play-lh.googleusercontent.com/_mHHv8vs7kKh3eusAOV-hFFsGGPLWNsmSiKLCVwvN8oisVUbA92cfgadtift2Sfdb4o=s360-rw'}}
            style={styles.itemImage}
          />
          <Text style={styles.kbzitemText}>KBZ Bank</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  servicebackstyle: {
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  container: {
    backgroundColor: colors.white,
    flex: 1,
    height: '100%',
  },
  row: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginTop: 10,
  },
  bgImage: {
    marginHorizontal: -10,
    resizeMode: 'cover',
    height: '100%'
  },
  section: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionLarge: {
    flex: 2,
    justifyContent: 'space-around',
  },
  sectionHeader: {
    marginBottom: 8,
  },
  priceContainer: {
    alignItems: 'center',
  },
  description: {
    padding: 15,
    lineHeight: 25,
  },

  titleDescription: {
    color: '#19e7f7',
    textAlign: 'center',
    fontFamily: fonts.primaryRegular,
    fontSize: 15,
  },
  title: {
    marginTop: 30,
  },
  price: {
    marginBottom: 5,
  },
  priceLink: {
    borderBottomWidth: 1,
    borderBottomColor: colors.primary,
  },
  borderbutton: {
    width: '30%',
    height: 90,
    marginRight: 3,
    marginLeft: 3,
    marginTop: 10,
    paddingTop: 20,
    paddingBottom: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
  },
  iconalign:{
    textAlign: 'center',
  },
  btnText: {
    fontSize: 18,
    color: '#FAFAFA',
    marginLeft: 10,
    marginTop: 2,
    textAlign: 'center',
  },
  item: {
    flex: 1,
    height: 120,
    paddingVertical: 20,
    marginBottom:30,
    marginLeft:5,
    marginRight:5,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 25,
    borderLeftColor:'black',
    backgroundColor: 'white',
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.35,
    elevation: 5,
  },
  itemImage: {
    height: 55,
    width:50,
  },
  cardStyle: {
    width: 110,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'yellow',
    margin: 5,
    borderRadius: 15,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.25,
    elevation: 5,
  },
  newcardStyle: {
    width: 110,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    marginLeft:20,
    marginBottom:20,
    borderRadius: 15,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.25,
    elevation: 5,
  },
  newcontainer:{
    flex: 1,
    paddingTop: 22,
    backgroundColor:'white',
    marginTop:22
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectionList: {
    marginTop: 22,
  },
  sectionHeader: {
    backgroundColor: '#64B5F6',
    fontSize: 20,
    padding: 5,
    color: '#fff',
    fontWeight: 'bold',
  },
  image: {
    width: 45,
    height: 45,
    borderRadius: 20,
    margin: 20,
  },
  buttonImageIconStyle: {
    paddingTop:2,
    height: 60,
    width: 60,
    resizeMode: 'cover',
  },
  kbzitemText:{
    fontWeight: 'bold',
    fontSize: 20,
    color:'#0054a6',
    textAlign:'center'
  },
  opitemText:{
    fontWeight: 'bold',
    fontSize: 20,
    color:'#51b586',
    textAlign:'center'
  }
});
