import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
  Dimensions,
} from 'react-native';
import App from './App';
import { ContextProvider } from './Context';

const { width } = Dimensions.get('screen');

const thumbMeasure = (width - 48 - 32) / 3;

class VideoChatScreen extends Component {

  render() {
    return (
      <ContextProvider>
        <App />
      </ContextProvider>
    );
  }
}

export default VideoChatScreen;

const styles = StyleSheet.create({
  components: {
    width: width,
  },
  title: {
    paddingVertical: 3,
    paddingHorizontal: 3 * 2,
  },
  group: {
    paddingTop: 3 * 3.75,
  },
  shadow: {
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.2,
    elevation: 2,
  },
  button: {
    marginBottom: 3,
    width: width - 3 * 2,
  },
  optionsText: {
    fontSize: 3 * 0.75,
    color: '#4A4A4A',
    fontWeight: 'normal',
    fontStyle: 'normal',
    letterSpacing: -0.29,
  },
  optionsButton: {
    width: 'auto',
    height: 34,
    paddingHorizontal: 3,
    paddingVertical: 10,
  },
  imageBlock: {
    overflow: 'hidden',
    borderRadius: 4,
  },
  rows: {
    height: 3 * 2,
  },
  social: {
    width: 3 * 3.5,
    height: 3 * 3.5,
    borderRadius: 3 * 1.75,
    justifyContent: 'center',
  },
  category: {
    backgroundColor: 'white',
    marginVertical: 3 / 2,
    borderWidth: 0,
  },
  categoryTitle: {
    height: '100%',
    paddingHorizontal: 3,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  albumThumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: 'center',
    width: thumbMeasure,
    height: thumbMeasure,
  },
});
