import React, { useState } from "react"
import { StyleSheet, View } from "react-native"
import AppForm from "./AppForm"
import AppFormField from "./AppFormField"
import ButtonSubmit from "./ButtonSubmit"
import * as Yup from "yup"
import AppText from "../../components/AppText"
import EventImages from "./EventImages"
import axios from "axios"
import BaseUrl from "../../assets/BaseUrl"
import Colors from "../../assets/Colors"
import { Fontisto } from "@expo/vector-icons"
import UploadProgress from "../../components/UploadProgress"
const validationSchema = Yup.object().shape({
  article: Yup.string()
    .min(5, "l'article doit contenir aumoins 5 charactéres")
    .max(1024)
    .required("vous devez donner un nom à votre article"),
  prix: Yup.string()
    .min(1)
    .max(100)
    .required("vous devez spécifier le prix de l'article"),
  wilaya: Yup.string()
    .min(
      2,
      "la wilaya doit contenir aumoins deux lettres où bien deux chiffres"
    )
    .max(100)
    .required("veuillez indiquer votre wilaya"),
  storePics: Yup.array()
    .min(1, "veuiller séléctionner aumoins une photo svp")
    .max(5)
    .required("vous devez aumoins télécharger une image"),
  description: Yup.string().max(1024),
})

export default function StoreForm({ navigation }) {
  const [visible, setVisible] = useState(false)
  const [progressUpload, setProgressUpload] = useState(0)
  return (
    <View style={styles.container}>
      <AppText style={styles.titre}>
        <Fontisto name="shopping-bag-1" size={38} color={Colors.secondary} />{" "}
        Vendre un article
      </AppText>
      <UploadProgress visible={visible} progress={progressUpload} />
      <AppForm
        initialValues={{
          article: "",
          prix: "",
          wilaya: "",
          storePics: [],
          description: "",
        }}
        onSubmit={async (values) => {
          let formdata = new FormData()
          // itérer sur tous le tableau des photos seléctionner par l'utilisateur
          values.storePics.map((photo) =>
            formdata.append("storePics", {
              uri: photo,
              type: "image/jpg",
              name: photo,
            })
          )
          formdata.append("article", values.article)
          formdata.append("prix", values.prix)
          formdata.append("wilaya", values.wilaya)
          formdata.append("description", values.description)
         
          try {
            setProgressUpload(0)
            setVisible(true)
            await axios.post(`${BaseUrl}/dzevents/v1/store`, formdata, {
              onUploadProgress: (progress) =>
                setProgressUpload(progress.loaded / progress.total),
            })
            setVisible(false)
            navigation.navigate("WelcomeScreen")
          } catch (e) {
            console.log(e)
            alert("une erreure est survenue veuillez réessayer dans un moment")
            navigation.navigate("WelcomeScreen")
          }
        }}
        validationSchema={validationSchema}>
        <EventImages name="storePics" />
        <AppFormField
          name="article"
          icon="cart-arrow-right"
          placeholder="Nom de l'article"
        />
        <AppFormField
          name="prix"
          keyboardType="numeric"
          placeholder="Prix"
          icon="cash-register"
          style={styles.input}
        />
        <AppFormField
          name="wilaya"
          placeholder="Wilaya"
          style={styles.input}
          icon="map-marker-radius"
        />
        <AppFormField
          name="description"
          placeholder="description"
          style={styles.descriptionInput}
          icon="sort-descending"
        />
        <ButtonSubmit title="Publier" style={styles.button} />
      </AppForm>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  titre: {
    marginBottom: 20,
    marginTop: 50,
    fontSize: 30,
    color: "#787675",
    fontWeight: "bold",
    paddingBottom: 10,
  },
  input: {
    justifyContent: "center",
    alignItems: "center",
  },
  descriptionInput: {
    minHeight: 120,
    alignSelf: "center",
  },
  button: {
    marginTop: 30,
    width: 190,
    height: 40,
    backgroundColor: Colors.secondary,
  },
  images: {
    width: 200,
    height: 200,
    marginHorizontal: 15,
    marginVertical: 20,
    resizeMode: "contain",
    borderRadius: 25,
  },
})
