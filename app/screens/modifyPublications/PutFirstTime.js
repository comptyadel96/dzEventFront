import axios from "axios"
import React, { useState } from "react"
import { Alert, StyleSheet, View } from "react-native"
import * as Yup from "yup"
import AppForm from "../../screens/forms/AppForm"
import AppFormField from "../forms/AppFormField"
import AppImagePicker from "./../forms/AppImagePicker"
import ButtonSubmit from "./../forms/ButtonSubmit"
import AppText from "./../../components/AppText"
import BaseUrl from "./../../assets/BaseUrl"
import Colors from "../../assets/Colors"
import LoadingAnim from "../../components/LoadingAnim"

export default function PutFirstTime({ route, navigation }) {
  const { _id, firstTime } = route.params
  const [showLoadingAnim, setShowLoadingAnim] = useState(false)

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
  })

  const updateFirstDetails = async (data) => {
    try {
      setShowLoadingAnim(true)
      await axios.put(`${BaseUrl}/dzevents/v1/firsttime/${_id}`, data)
      setShowLoadingAnim(false)
      Alert.alert(
        "bravo",
        " vous avez modifier votre publication avec succées 😃"
      )
      navigation.navigate("WelcomeScreen")
    } catch (e) {
      console.log(e)
      alert("une erreure est survenue veuillez réessayer dans un moment svp")
      navigation.navigate("WelcomeScreen")
    }
  }

  return (
    <View style={{ alignItems: "center", flex: 1 }}>
      <AppText style={styles.titre}>Modifier ma premiere fois</AppText>
      {/* l'animation quand l'utilisateur change la photo du first event  */}
      {showLoadingAnim && (
        <View style={styles.loadingAnim}>
          <LoadingAnim
            visible={showLoadingAnim}
            source={require("../../assets/animations/loading-first.json")}
          />
        </View>
      )}

      {/* un autre formulaire pour modifer la photo du first event (indépendament des autres informations ) */}
      <AppForm
        initialValues={{ firstTimePic: null }}
        onSubmit={async (value) => {
          const formdata = new FormData()
          formdata.append("firstTimePic", {
            uri: value.firstTimePic,
            type: "image/jpg",
            name: value.firstTimePic,
          })
          try {
            setShowLoadingAnim(true)
            await axios.patch(
              `${BaseUrl}/dzevents/v1/firsttime/${_id}/updatepicture`,
              formdata
            )
            setShowLoadingAnim(false)
            Alert.alert(
              "bravo",
              "vous avez bien modifier la photo de votre firstTime 😎 "
            )
            navigation.navigate("WelcomeScreen")
          } catch (e) {
            console.log(e)
            alert(
              "une erreure est survenue veuillez réessayer ultérieurement s'il vous plait  "
            )
            navigation.goBack()
          }
        }}>
        {!showLoadingAnim && (
          <AppImagePicker name="firstTimePic" isProfilPicture={true} />
        )}
      </AppForm>

      {/* le deuxiéme formulairz pour mettre à jour les autres informations du firstTime  */}
      <AppForm
        initialValues={{
          titre: firstTime.titre,
          wilaya: firstTime.wilaya,
          adresse: firstTime.adresse,
          description: firstTime.description,
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          updateFirstDetails(values)
        }}>
        {!showLoadingAnim && (
          <AppFormField
            name="titre"
            placeholder={firstTime.titre}
            icon="new-box"
          />
        )}

        {!showLoadingAnim && (
          <AppFormField
            name="wilaya"
            placeholder={firstTime.wilaya}
            icon="google-maps"
          />
        )}
        {!showLoadingAnim && (
          <AppFormField
            name="adresse"
            placeholder={firstTime.adresse}
            icon="map-outline"
          />
        )}
        {!showLoadingAnim && (
          <AppFormField
            name="description"
            placeholder={firstTime.description}
            icon="sort-descending"
            multiline
            style={styles.description}
          />
        )}
        {!showLoadingAnim && (
          <ButtonSubmit title="Mettre à jour" style={styles.submitButton} />
        )}
      </AppForm>
    </View>
  )
}

const styles = StyleSheet.create({
  titre: {
    color: Colors.primary,
    fontSize: 20,
  },
  submitButton: {
    width: 200,
    height: 40,
    backgroundColor: Colors.pistach,
  },
  loadingAnim: {
    width: "100%",
    height: "100%",
  },
  description: {
    minHeight: 120,
    alignSelf: "center",
  },
})
