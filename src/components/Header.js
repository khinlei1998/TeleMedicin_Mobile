import React from "react";
import { View, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { StyleSheet } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

const Header = () => {
  const { goBack } = useNavigation();

  return (
    <SafeAreaView style={{ position: "absolute", zIndex: 99 }}>
      <View style={styles.container}>
        <TouchableOpacity onPress={goBack} style={{ flexDirection: "row" }}>
          <MaterialIcons name="keyboard-arrow-left" size={35} style={styles.textContainer}/>
          <View style={styles.textContainer}>
            <Text style={styles.text}>Back</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: {
      marginTop: 15,
      marginLeft: 8,
      alignSelf: "flex-start",
    },
  
    textContainer: {
      justifyContent: "center",
    },
    arrcolor: {
        color: 'black'
    },
    text: {
      fontSize: 15,
      marginTop: -0.5,
      marginLeft: -5,
    },
    
  });

export default Header;

