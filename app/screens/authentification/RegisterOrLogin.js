import React, { useEffect, useState, useContext } from "react"
import { StyleSheet, TouchableOpacity, View } from "react-native"
import Colors from "../../assets/Colors"
import AppButton from "../../components/AppButton"
import AppText from "../../components/AppText"
import AppForm from "../forms/AppForm"
import AppFormField from "../forms/AppFormField"
import ButtonSubmit from "../forms/ButtonSubmit"
import FormMessageError from "../forms/FormMessageError"
import { useNavigation } from "@react-navigation/native"
import axios from "axios"
import BaseUrl from "../../assets/BaseUrl"
import jwtDecode from "jwt-decode"
import * as Yup from "yup"
import AuthContext from "./AuthContext"
require("yup-password")(Yup)

export default function RegisterOrLogin() {
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .min(10, "l'email doit étre d'une longueur minimale de 10 charactéres")
      .max(100)
      .email("l'email doit étre d'un format valide")
      .required("l'email est requie"),
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
  })
  const navigation = useNavigation()
  const [loginError, setLoginError] = useState(false)
  const authContext = useContext(AuthContext)

  return (
    <View style={styles.container}>
      <AppText style={styles.title}> Connexion </AppText>
      <AppForm
        onSubmit={async (values) => {
          try {
            const result = await axios.post(`${BaseUrl}/dzevents/v1/auth`, {
              email: values.email,
              password: values.password,
            })
            setLoginError(false)
            axios.defaults.headers.common["x-auth-token"] =result.headers["x-auth-token"]
              result.headers["x-auth-token"]
            const jwtToken = jwtDecode(result.headers["x-auth-token"])
            authContext.setUser(jwtToken)
            
          } catch (e) {
            console.log(e)
            setLoginError(true)
          }
        }}
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}>
        {/* message d'erreur en cas de mot de passe ou email invalide */}
        <FormMessageError
          errors="email ou mot de passe incorrecte"
          visible={loginError}
        />

        <AppFormField
          placeholder="Adresse e-mail"
          name="email"
          icon="email"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <AppFormField
          placeholder="Mot de passe"
          name="password"
          icon="key-variant"
          secureTextEntry
        />
        <TouchableOpacity style={{ alignSelf: "flex-end", marginRight: 75 }}>
          <AppText
            style={{
              color: Colors.primary,
              fontSize: 14,
              borderBottomWidth: 1,
              borderColor: Colors.primary,
            }}>
            mot de passe oublier ?
          </AppText>
        </TouchableOpacity>
        <ButtonSubmit title="Se connecter" style={styles.submitButton} />
      </AppForm>

      <View style={styles.newContainer}>
        <AppText style={{ color: Colors.grey, fontSize: 17 }}>
          vous n'avez pas encore de compte ?
        </AppText>
        <AppButton
          style={styles.newAccount}
          title="créer un compte"
          onPress={() => navigation.navigate("RegisterForm")}
          logo="account-multiple-plus"
          backColor="transparent"
          logoColor="white"
          size={54}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center" },
  title: {
    color: Colors.primary,
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 50,
  },
  submitButton: {
    height: 40,
    width: 200,
    backgroundColor: Colors.primary,
  },
  newContainer: {
    alignItems: "center",
    marginTop: 30,
  },
  newAccount: {
    height: 30,
    backgroundColor: Colors.secondary,
    borderRadius: 5,
  },
})
