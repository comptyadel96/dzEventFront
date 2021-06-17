import React, { useContext, useState } from "react"
import { Alert, Modal, ScrollView, StyleSheet, Text, View } from "react-native"
import * as Yup from "yup"
require("yup-password")(Yup)
import axios from "axios"
import AppForm from "./AppForm"
import AppFormField from "./AppFormField"
import ButtonSubmit from "./ButtonSubmit"
import AuthContext from "../authentification/AuthContext"
import Colors from "../../assets/Colors"
import BaseUrl from "../../assets/BaseUrl"
import { useNavigation } from "@react-navigation/core"
import AppButton from "../../components/AppButton"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import AppText from "../../components/AppText"
import FormMessageError from "./FormMessageError"

export default function UpdateAccountInfos() {
  const { user, setUser } = useContext(AuthContext)
  const navigation = useNavigation()
  const [showModal, setShowModal] = useState(false)
  const [loginError, setLoginError] = useState(false)
  const [hideNewPass, setHideNewPass] = useState(true)
  const updateDetails = async (data) => {
    try {
      await axios.put(`${BaseUrl}/dzevents/v1/users/updatedetails`, data)
      Alert.alert(
        "bravo",
        "vous avez bien mis à jour vos informations personnelles 😎 "
      )
      navigation.navigate("Profile")
    } catch (e) {
      console.log(e)
      alert(
        "une erreure est survenue vérifier votre connexion internet et réessayer dans un moment"
      )
      navigation.navigate("Profile")
    }
  }

  const updatePassword = async (data) => {
    try {
      await axios.put(`${BaseUrl}/dzevents/v1/users/updatepassword`, data)
      setShowModal(false)
      setLoginError(false)
      Alert.alert("bravo", "mot de passe mis à jour avec succée 😇 ")
    } catch (e) {
      setLoginError(true)
      console.log(e)
    }
  }

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(4, "votre nom doit étre d'au moins 4 lettres")
      .max(50)
      .label("nom"),
    email: Yup.string()
      .min(10, "l'email doit étre d'une longueur minimale de 10 charactéres")
      .max(100)
      .email("l'email doit étre d'un format valide"),

    phoneNumber: Yup.string()
      .min(10, "le numéro de téléphone doit étre d'un format valide")
      .max(50)
      .label("numéro de téléphone"),
  })

  const newPasswordSchema = Yup.object().shape({
    password: Yup.string()
      .minLowercase(
        1,
        "mot de passe doit contenir aumoins une lettre miniscule"
      )
      .minUppercase(
        1,
        "mot de passe doit contenir aumoins une lettre majuscule"
      )
      .minNumber(1, "mot de passe doit contenir aumoins un nombre")
      .minSymbol(
        1,
        "le mot de passe doit contenir aumoins un charactére special exmpl: ( ! / _ § | * $ . ; - )"
      )
      .required("le mot de passe et requie")
      .min(8, "mot de passe doit aumoins contenir 8 charactéres"),
    newPassword: Yup.string()
      .minLowercase(
        1,
        "mot de passe doit contenir aumoins une lettre miniscule"
      )
      .minUppercase(
        1,
        "mot de passe doit contenir aumoins une lettre majuscule"
      )
      .minNumber(1, "mot de passe doit contenir aumoins un nombre")
      .minSymbol(
        1,
        "le mot de passe doit contenir aumoins un charactére special exmpl: ( ! / _ § | * $ . ; - )"
      )
      .required("le mot de passe et requie")
      .min(8, "mot de passe doit aumoins contenir 8 charactéres"),
  })

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, width: "90%" }}>
        <Text style={styles.titre}> Modifier vos informations </Text>
        <AppForm
          validationSchema={validationSchema}
          initialValues={{
            _id: user._id,
            profilePicture: user.profilePicture,
            name: user.name,
            email: user.email,
            phoneNumber: user.phoneNumber,
          }}
          onSubmit={async (values) => {
            updateDetails(values)
            setUser(values)
          }}>
          <AppFormField name="name" placeholder={user.name.toString()} />
          <AppFormField name="email" placeholder={user.email.toString()} />
          <AppFormField
            name="phoneNumber"
            placeholder={user.phoneNumber.toString()}
          />
          <ButtonSubmit title="mettre à jour" style={styles.submitButton} />
        </AppForm>

        {/* modifier le mot de passe */}

        <AppButton
          title="modifier le mot de passe"
          style={styles.password}
          onPress={() => setShowModal(true)}
        />

        <Modal
          visible={showModal}
          style={{ alignItems: "center", justifyContent: "space-between" }}>
          <MaterialCommunityIcons
            name="close"
            size={27}
            color={Colors.grey}
            onPress={() => setShowModal(false)}
          />
          <AppText style={{ alignSelf: "center", color: Colors.primary }}>
            Modifier le mot de passe
          </AppText>

          <AppForm
            initialValues={{ password: "", newPassword: "" }}
            validationSchema={newPasswordSchema}
            onSubmit={async (values) => {
              updatePassword(values)
            }}>
            <AppFormField
              name="password"
              placeholder="entrer votre mot de passe actuelle"
            />
            <FormMessageError
              errors=" mot de passe incorrecte"
              visible={loginError}
            />
            <AppFormField
              name="newPassword"
              placeholder="nouveau mot de passe"
              secureTextEntry={hideNewPass}
            />

            <AppButton
              title="afficher"
              onPress={() => setHideNewPass(!hideNewPass)}
              style={styles.hideNewPass}
              logo="shield-lock"
              logoColor="white"
              backColor="transparent"
              size={40}
            />

            <ButtonSubmit title="Confirmer" style={styles.submitButton} />
          </AppForm>
        </Modal>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  titre: {
    alignSelf: "center",
    fontSize: 30,
    color: Colors.primary,
  },
  submitButton: {
    height: 35,
    width: 200,
    alignSelf: "center",
  },
  password: {
    height: 35,
    width: 240,
    alignSelf: "center",
    borderRadius: 10,
    backgroundColor: Colors.secondary,
  },
  hideNewPass: {
    width: 120,
    height: 27,
    marginLeft: 15,
    backgroundColor: "dodgerblue",
  },
})
