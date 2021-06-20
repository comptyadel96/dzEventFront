import axios from "axios"
import React, { useState } from "react"
import { StyleSheet, View } from "react-native"
import * as Yup from "yup"
import BaseUrl from "../../assets/BaseUrl"
import Colors from "../../assets/Colors"
import AppText from "../../components/AppText"
import UploadProgress from "../../components/UploadProgress"
import AppForm from "./AppForm"
import AppFormField from "./AppFormField"
import AppImagePicker from "./AppImagePicker"
import ButtonSubmit from "./ButtonSubmit"

export default function FirstTimeForm({ navigation }) {
  const [visible, setVisible] = useState(false)
  const [progressUpload, setProgressUpload] = useState(0)

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
      .required("veuillez télécharger aumoins une image svp"),
  })

  return (
    <View style={{ alignItems: "center" }}>
      <AppText style={styles.title}>First Time</AppText>
      <UploadProgress
        visible={visible}
        progress={progressUpload}
        color={Colors.gold}
      />
      <AppForm
        initialValues={{
          titre: "",
          wilaya: "",
          adresse: "",
          firstTimePic: null,
          description: "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          let formdata = new FormData()
          formdata.append("titre", values.titre)
          formdata.append("wilaya", values.wilaya)
          formdata.append("adresse", values.adresse)
          formdata.append("description", values.description)
          formdata.append("firstTimePic", {
            uri: values.firstTimePic,
            type: "image/jpg",
            name: values.firstTimePic,
          })
          try {
            setProgressUpload(0)
            setVisible(true)
            await axios.post(`${BaseUrl}/dzevents/v1/firsttime`, formdata, {
              onUploadProgress: (progress) =>
                setProgressUpload(progress.loaded / progress.total),
            })
            setVisible(false)
            navigation.navigate("WelcomeScreen")
          } catch (e) {
            console.log(e)
            alert("une erreure est survenue veuillez réessayer")
            navigation.navigate("WelcomeScreen")
          }
        }}>
        <AppImagePicker name="firstTimePic" />
        <AppFormField
          name="titre"
          placeholder="Titre"
          icon="new-box"
          iconColor={Colors.dark}
        />
        <AppFormField
          name="wilaya"
          placeholder="Wilaya"
          icon="google-maps"
          iconColor={Colors.dark}
        />
        <AppFormField
          name="adresse"
          placeholder="Adresse"
          icon="map-outline"
          iconColor={Colors.dark}
        />
        <AppFormField
          multiline
          name="description"
          style={styles.description}
          placeholder="plus de details  ?"
          autoCapitalize="none"
          icon="sort-descending"
          iconColor={Colors.dark}
        />
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
  description: {
    minHeight: 120,
    alignSelf: "center",
  },
  submitButton: {
    backgroundColor: Colors.gold,
    width: 250,
    height: 45,
  },
})
