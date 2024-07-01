import React from 'react';
import { Text, StyleSheet, ScrollView, View, SafeAreaView } from "react-native";
import VideoPlayer from '../../components/VideoChat/VideoPlayer';
import Sidebar from '../../components/VideoChat/Sidebar';
import Notifications from '../../components/VideoChat/Notifications';




const App = () => {


  return (
    <ScrollView style={{ backgroundColor: 'white' }}>
        <Notifications />
          {/* <Text style={{textAlign:'center',fontSize: 20,}}>Counseling Session</Text> */}
        <VideoPlayer />
        <Sidebar>
        </Sidebar>
    </ScrollView>
  );
};

export default App;
