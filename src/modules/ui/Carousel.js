import React, { Component } from 'react';
import { Text, View, SafeAreaView, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { SliderBox } from "react-native-image-slider-box";

export default class Blog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      images: [
        require('../../../assets/images/Carousal/p1.png'),
        require('../../../assets/images/Carousal/p2.jpeg'),
        require('../../../assets/images/Carousal/p3.jpeg'),
      ]
    };
  }



  render() {
    return (
      <SliderBox
        autoplay={true}
        images={this.state.images}
        sliderBoxHeight={200}
        circleLoop
        onCurrentImagePressed={index => console.warn(`image ${index} pressed`)}
      />
    );
  }
}