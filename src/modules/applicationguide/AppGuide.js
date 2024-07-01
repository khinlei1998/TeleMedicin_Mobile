import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, StatusBar, Icon } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';


const data = [
  {
    key: 1,
    title: 'Appointment Create Guide',
    text: '1.ခံစားရသောလက္ခဏာအားမဖြစ်မနေထည့်ရပါမည်။\n2.လူနာကိုယ်စားတင်မည်ဆိုလျှင်လူနာ၏နာမည်၊မွေးသက္ကရာဇ်နှင့်လိင်\nအားအဖြစ်မနေထည့်ပါ။',
    image: require('../../../assets/images/guide/1.jpg'),
    backgroundColor: '#59b2ab',
  },
  {
    key: 2,
    title: 'Appointment Create Guide',
    text: '1.ဆရာဝန်နှင်ပြသရန်အချိန်\nအားမဖြစ်မနေရွေးပါ။',
    image: require('../../../assets/images/guide/2.jpg'),
    backgroundColor: '#59b2ab',
  },
  {
    key: 3,
    title: 'Appointment Create Guide',
    text: '2.အပေါ်ဆုံးတစ်ခုအားမဖြစ်မနေရွေးပေးပါ',
    image: require('../../../assets/images/guide/app2.jpeg'),
    backgroundColor: '#febe29',
  },
  // {
  //   key: 3,
  //   title: 'Appointment Create Guide',
  //   text: '1.ရောဂါလက္ခဏနဲ့ဆေးမှတ်တမ်းမရှိပါကမထည့်လျှင်ရပါသည်',
  //   image: require('../../../assets/images/guide/app8.jpeg'),
  //   backgroundColor: '#22bcb5',
  // },

  {
    key: 4,
    title: 'Sign Up Guide',
    text: '1.အပေါ်နှစ်ခုအားမဖြစ်မနေထည့်ရပါမည်\n2.မိမိဖြည့်သွင်းထားသောလျှို့ဝှက်နံပတ်အား\nမမေ့ရပါ',
    image: require('../../../assets/images/guide/app10.jpeg'),
    backgroundColor: '#22bcb5',
  },
  {
    key: 5,
    title: 'Sign Up Guide',
    text: '1.ဤအချက်အလက်ထည့်သွင်းရန်နေရာအားမဖြည့်လျှင်ရပါသည်။',
    image: require('../../../assets/images/guide/app11.jpeg'),
    backgroundColor: '#22bcb5',
  },
  {
    key: 6,
    title: 'Sign Up Guide',
    text: '1.မြို့နယ်နှင့်လူနာဓာတ်ပုံအားမထည့်လျှင်လဲရပါသည်',
    image: require('../../../assets/images/guide/app12.jpeg'),
    backgroundColor: '#22bcb5',
  },
  {
    key: 7,
    title: 'Login Guide',
    text: '1.Registerလုပ်ထားသောဖုန်းနံပတ်နဲ့လျှို့ဝှက်နံပတ်အားထည့်ပါ',
    image: require('../../../assets/images/guide/app13.jpg'),
    backgroundColor: '#22bcb5',
  }
];


const GuideScreen = (props) => {



  const [showRealApp, setShowRealApp] = useState(false);

  const renderItem = ({ item }) => {
    // alert(item.title);
    return (
      <View style={styles.slide}>
        <Text style={styles.title}>{item.title}</Text>
        <Image source={item.image} style={styles.image} />
        <Text style={styles.text}>{item.text}</Text>
      </View>
    );
  }


  const onDone = () => {
    // User finished the introduction. Show real app through
    // navigation or simply by controlling state
    //this.setState({ showRealApp: true });
  }

  return (
    <View style={{ flex: 1, backgroundColor: 'white', }}>
      <AppIntroSlider
        activeDotStyle={{ width: 25, backgroundColor: 'green' }}
        dotStyle={{ width: 20, backgroundColor: '#F2F1F6' }}
        renderItem={renderItem} data={data} onDone={onDone} />
    </View>
  )

}

export default GuideScreen;

const styles = StyleSheet.create({
  slide: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    // flex: 1,
    marginTop: 40


  },
  image: {
    width: 320,
    height: 380,
    // marginVertical: 32,
  },
  text: {
    // color: 'rgba(255, 255, 255, 0.8)',
    color: '#5da7ec',
    textAlign: 'center',
    marginTop: 15
  },
  title: {
    fontSize: 22,
    color: '#5da7ec',
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold'
  },
  buttonCircle: {
    width: 40,
    height: 40,
    // backgroundColor: 'rgba(0, 0, 0, .2)',
    backgroundColor: '#5da7ec',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    color: '#5da7ec'
  },
  dotStyle: {
    backgroundColor: 'rgba(0, 0, 0, .2)'
  }
});