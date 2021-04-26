import React from "react"
import { SafeAreaView, StyleSheet, Platform, StatusBar } from "react-native"
import Colors from '../assets/Colors'

export default function AppScreen({ children,style }) {
  return <SafeAreaView style={[styles.screen,style]}>{children}</SafeAreaView>
}

const styles = StyleSheet.create({
  screen: {
    flex:1,
    backgroundColor: Colors.lightgrey,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
})
