import axios from "axios"
import React, { useState } from "react"
import { StyleSheet, View } from "react-native"
import * as Yup from "yup"
import AppForm from "../../screens/forms/AppForm"
import AppFormField from "../forms/AppFormField"
import AppImagePicker from "./../forms/AppImagePicker"
import ButtonSubmit from "./../forms/ButtonSubmit"
import AppText from "./../../components/AppText"
import BaseUrl from "./../../assets/BaseUrl"
import Colors from "../../assets/Colors"

export default function PutFirstTime({ route, navigation }) {
  const { _id, firstTime } = route.params

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
    firstTimePic: Yup.string()
      .nullable()
      .required("vous devez aumoins télécharger une photo"),
  })

  return (
    <View style={{ alignItems: "center" }}>
      <AppText style={styles.titre}>Modifier ma premiere fois</AppText>
      <AppForm
        initialValues={{
          titre: firstTime.titre,
          wilaya: firstTime.wilaya,
          adresse: firstTime.adresse,
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
            await axios.put(`${BaseUrl}/dzevents/v1/firsttime/${_id}`, formdata)
            alert("success !")
            navigation.navigate("WelcomeScreen")
          } catch (e) {
            console.log(e)
            alert(
              "une erreure est survenue veuillez réessayer dans un moment svp"
            )
            navigation.navigate("WelcomeScreen")
          }
        }}>
        <AppImagePicker name="firstTimePic" />
        <AppFormField
          name="titre"
          placeholder={firstTime.titre}
          icon="new-box"
        />
        <AppFormField
          name="wilaya"
          placeholder={firstTime.wilaya}
          icon="google-maps"
        />
        <AppFormField
          name="adresse"
          placeholder={firstTime.adresse}
          icon="map-outline"
        />
        <ButtonSubmit title="Mettre à jour" style={styles.submitButton} />
      </AppForm>
    </View>
  )
}

const styles = StyleSheet.create({
  titre:{
    color:Colors.primary,
    fontSize:20
  },
  submitButton: {
    width: 200,
    height: 40,
    backgroundColor:Colors.pistach
  },
})
