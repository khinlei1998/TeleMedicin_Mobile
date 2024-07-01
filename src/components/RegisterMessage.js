import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";

const RegisterMessage = () => {
  return (
    <View style={styles.registerContainer}>
      <Text style={styles.registerText}>Don't have an account?</Text>
      <TouchableOpacity>
        <Text style={styles.registerButton}> Register</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    registerContainer: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      paddingTop: 20,
      paddingBottom: 20,
      color: "#3b3b3b",
    },
  
    registerText: {
      fontWeight: "bold",
      fontSize: 14,
      color: "#3b3b3b",
    },

    btnColor:{
      color: "#3b3b3b",
    },
  
    registerButton: {
      fontSize: 14,
      fontWeight: "bold",
      color:'#ef4f70'
    },
  });  

export default RegisterMessage;



