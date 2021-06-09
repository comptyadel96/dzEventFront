import React from "react"
import { StyleSheet } from "react-native"
import AppText from "../../components/AppText"

export default function FormMessageError({ errors,visible }) {
  if (!errors||!visible) return null
  return <AppText style={styles.error}>{errors} </AppText>
}

const styles = StyleSheet.create({
    error:{
        color:'crimson',
        textAlign:'center',
       
    }
})
