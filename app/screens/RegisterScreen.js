import React from "react"
import { Image, ImageBackground, StyleSheet, Text, View } from "react-native"
import AppButton from "../components/AppButton"
import AppText from "../components/AppText"

export default function RegisterScreen() {
  return (
    <ImageBackground
      source={require("../assets/welcome.jpg")}
      style={styles.background}>  
      <Text style={styles.text}> dz events</Text>
      <View style={styles.buttonsContainer}>
        <AppButton title="s'inscrire" color='hotpink' />
        <AppButton title="se connecter" color='dodgerblue' />
        <AppButton title="invité(ne pas creer de compte)" color='black' />
      </View>
      <Text style={{color:'white',fontSize:20}}>leila tous droit réserver(c) </Text>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent:"flex-end",
    alignItems:'center'
  },
  buttonsContainer:{
     position:"absolute",
     bottom:40,
     padding:15
  },
  text:{
    fontSize:58,
    fontWeight:'bold',
    color:'silver',
    textTransform:'capitalize',
    position:'absolute',
    top:190
  }
})
