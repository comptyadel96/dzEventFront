import React, { useState, useEffect } from "react"
import { StyleSheet, Text, View } from "react-native"
import NetInfo from "@react-native-community/netinfo";


export default function Test2() {
  const unsubscribe = NetInfo.addEventListener(state => {
    console.log("Connection type", state.type);
    console.log("Is connected?", state.isConnected);
    console.log("is internet reacheable?",state.isInternetReachable)
  });
  
  // Unsubscribe
  
  useEffect(() => {
    unsubscribe();
  })

  return (
    <View>
     
    </View>
  )
}

const styles = StyleSheet.create({})
