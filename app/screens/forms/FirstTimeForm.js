import axios from "axios"
import React, { useState, useEffect } from "react"
import { StyleSheet, View } from "react-native"
import * as Yup from "yup"
import BaseUrl from "../../assets/BaseUrl"
import Colors from "../../assets/Colors"
import AppText from "../../components/AppText"
import AppForm from "./AppForm"
import AppFormField from "./AppFormField"
import AppImagePicker from "./AppImagePicker"
import ButtonSubmit from "./ButtonSubmit"

export default function FirstTimeForm() {
  const validationSchema = Yup.object().shape({
    titre: Yup.string()
      .min(6, "le titre doit contenir aumoins 6 lettres")
      .max(1024)
      .required("vous devez donner un titre "),
    wilaya: Yup.string()
      .max(1024)
      .required("veuillez indiquer la wilaya s'il vous plait "),
    adresse: Yup.string().max(1024),
    description: Yup.string().max(1024),
    firstTimePic: Yup.string(),
  })

  return (
    <View style={{ alignItems: "center" }}>
      <AppText style={styles.title}>First Time</AppText>
      <AppForm
        initialValues={{
          titre: "",
          wilaya: "",
          adresse: "",
          firstTimePic: null,
        }}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          let formdata = new FormData()
          formdata.append("titre", values.titre)
          formdata.append("wilaya", values.wilaya)
          formdata.append("adresse", values.adresse)
          formdata.append("firstTimePic", {
            uri: values.firstTimePic,
            type: "image/jpg",
            name: values.firstTimePic,
          })
          try {
            await axios.post(`${BaseUrl}/dzevents/v1/firsttime`, formdata,{
              onUploadProgress:(progress)=>console.log(progress.loaded/progress.total)
            })
          } catch (e) {
            console.log(e)
          }
        }}>
        <AppImagePicker name="firstTimePic" />
        <AppFormField name="titre" placeholder="Titre" icon="new-box" />
        <AppFormField name="wilaya" placeholder="Wilaya" icon="google-maps" />
        <AppFormField name="adresse" placeholder="Adresse" icon="map-outline" />
        <ButtonSubmit title="Publier" style={styles.submitButton} />
      </AppForm>
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    alignSelf: "center",
    color: Colors.gold,
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 15,
  },
  submitButton: {
    backgroundColor: Colors.gold,
    width: 250,
    height: 45,
  },
})
