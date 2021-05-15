import React, { useEffect, useState } from "react"
import { StyleSheet, View, Text, ScrollView, Image } from "react-native"
import * as ImagePicker from "expo-image-picker"

import * as Yup from "yup"
import AppFormField from "./AppFormField"
import ButtonSubmit from "./ButtonSubmit"
import AppForm from "./AppForm"
import axios from "axios"
import AppLogo from "../../components/AppLogo"
require("yup-password")(Yup)
// ici on met en relation la librairie Yup avec la librairie yup-password afin de pouvoir les intégrer dans le méme et unique Shéma de validation
import BaseUrl from "../../assets/BaseUrl"

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(4, "votre nom doit étre d'au moins 4 lettres")
    .max(50)
    .required("veuillez s'il vous plait entrer votre nom")
    .label("nom"),
  email: Yup.string()
    .min(10, "l'email doit étre d'une longueur minimale de 10 charactéres")
    .max(100)
    .email("l'email doit étre d'un format valide")
    .required("l'email est requie"),

  password: Yup.string()
    .minLowercase(1, "mot de passe doit contenir aumoins une lettre miniscule")
    .minUppercase(1, "mot de passe doit contenir aumoins une lettre majuscule")
    .minNumber(1, "mot de passe doit contenir aumoins un nombre")
    .minSymbol(
      1,
      "le mot de passe doit contenir aumoins un charactére special exmpl: ( ! / _ § | * $ . ; - )"
    )
    .required("le mot de passe et requie")
    .min(8, "mot de passe doit aumoins contenir 8 charactéres"),

  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "les mots de passe doivent étre identiques"
  ),

  phoneNumber: Yup.string()
    .min(10, "le numéro de téléphone doit contenir aumoins 10 nombres ")
    .max(50)
    .required("veuillez entrer votre numéro de téléphone proffessionnel")
    .label("numéro de téléphone"),
  profilePic: Yup.string(),
})

export default function RegisterForm() {
  const [imageUri, setImageUri] = useState()

  // avoir la permission
  const getPermission = async () => {
    const result = await ImagePicker.requestCameraPermissionsAsync()
    if (!result.granted) {
      alert(
        "nous avons besoin d'acceder a votre gallerie pour que vous puissiez telecharger votre photo de profile"
      )
    }
  }
  // select an image
  const handlePickImage = async () => {
    try {
      const img = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        quality: 0.7,
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
      })
      if (!img.cancelled) {
        Platform.OS === "android"
          ? setImageUri(img.uri)
          : setImageUri(img.uri.replace("file://", ""))
      }
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    getPermission()
  }, [])

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.titre}>Inscription</Text>
        <AppForm
          initialValues={{
            name: "",
            password: "",
            confirmPassword: "",
            phoneNumber: "",
            email: "",
            profilePic: "",
          }}
          onSubmit={async (values) => {
            let formdata = new FormData()
            formdata.append("profilePic", {
              uri: imageUri,
              type: "image/jpg",
              name: imageUri,
            })
            formdata.append("name", values.name)
            formdata.append("password", values.password)
            formdata.append("phoneNumber", values.phoneNumber)
            formdata.append("email", values.email)
            try {
              const data = await axios.post(
                `${BaseUrl}/dzevents/v1/users`,
                formdata
              )
              console.log(data.headers)
              return data
            } catch (e) {
              console.log(e)
            }
          }}
          validationSchema={validationSchema}>
            
          {imageUri && (
            <Image source={{ uri: imageUri }} style={styles.image} />
          )}
          {!imageUri && (
            <AppLogo
              logo="camera"
              onPress={handlePickImage}
              size={100}
              backColor={Colors.textInput}
              style={{ alignSelf: "center" }}
            />
          )}
          <AppFormField
            autoCapitalize="none"
            icon="star-face"
            placeholder="entrer votre nom..."
            style={styles.input}
            name="name"
          />
          <AppFormField
            autoCapitalize="none"
            icon="email"
            placeholder="entrer votre email"
            keyboardType="email-address"
            style={styles.input}
            name="email"
          />
          <AppFormField
            autoCapitalize="none"
            icon="key-variant"
            placeholder="entrer votre mot de passe"
            secureTextEntry
            style={styles.input}
            name="password"
          />
          <AppFormField
            placeholder="confirmer le mot de passe"
            name="confirmPassword"
            icon="key-variant"
            secureTextEntry
            style={styles.input}
          />
          <AppFormField
            icon="cellphone-iphone"
            placeholder="num de Tél proffessionnel"
            keyboardType="numeric"
            style={styles.input}
            name="phoneNumber"
          />
          <ButtonSubmit title="S'inscrire" />
        </AppForm>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  image: {
    height: 200,
    width: 200,
    borderRadius: 20,
    alignSelf: "center",
  },
  titre: {
    backgroundColor: "white",
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 40,
    color: "crimson",
    marginTop: 50,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 100,
    borderColor: "grey",
    padding: 20,
  },
  input: {
    height: 50,
    width: 300,
  },
})
