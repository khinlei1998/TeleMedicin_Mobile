import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'

export default function UserguideSplash(props) {
    const logo = require('../../../assets/images/pages/undraw_medicine_b1ol.png');

    return (
        <View style={{ flex: 1, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' }}>

            <Image source={logo} style={{ width: 208, height: 197 }} />
            <View style={{ marginLeft: 17, marginTop: 15 }}>
                <Text style={{ textAlign: 'center', color: 'black', fontSize: 15, fontWeight: 'bold' }} >အသုံးပြုရန်အညွှန်းကို မိမိအကောင့်ကိုနှိပ်၍ ကြည့်နိုင်ပါသည်။ </Text>

            </View>



            <TouchableOpacity onPress={() => props.navigation.navigate('Homes')}
                style={{ backgroundColor: '#5da7ec', width: '80%', height: 50, justifyContent: 'center', marginTop: 50, borderRadius: 20 }}>
                <Text style={{ color: '#fff', textAlign: 'center', fontFamily: 'Poppins-Light', }} >
                    Get Started
                </Text>
            </TouchableOpacity>
        </View >
    )
}