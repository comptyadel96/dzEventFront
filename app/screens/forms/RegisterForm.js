import React, { useContext, useState } from "react"
import { StyleSheet, View, Text, ScrollView } from "react-native"
import * as Yup from "yup"
import AppFormField from "./AppFormField"
import ButtonSubmit from "./ButtonSubmit"
import AppForm from "./AppForm"
import axios from "axios"
require("yup-password")(Yup)
import BaseUrl from "../../assets/BaseUrl"
import AppImagePicker from "./AppImagePicker"
import AuthContext from "../authentification/AuthContext"
import jwtDecode from "jwt-decode"
import LoadingAnim from "../../components/LoadingAnim"

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
    .min(10, "le numéro de téléphone doit étre d'un format valide")
    .max(50)
    .required("veuillez entrer votre numéro de téléphone proffessionnel")
    .label("numéro de téléphone"),
  profilePic: Yup.string(),
})

export default function RegisterForm({ navigation }) {
  const { setUser } = useContext(AuthContext)
  const [loading, setLoading] = useState(false)
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.titre}>Inscription</Text>

        {/* ANIMATION loading */}

        {loading && (
          <View style={{ height: "100%", width: "100%" }}>
            <LoadingAnim
              visible={loading}
              source={require("../../assets/animations/registerAccount.json")}
            />
          </View>
        )}

        <AppForm
          initialValues={{
            name: "",
            password: "",
            confirmPassword: "",
            phoneNumber: "",
            email: "",
          }}
          onSubmit={async (values) => {
            console.log(values)
            try {
              const formdata = new FormData()
              formdata.append("name", values.name)
              formdata.append("password", values.password)
              formdata.append("phoneNumber", values.phoneNumber)
              formdata.append("email", values.email)
              setLoading(true)
              const data = await axios.post(
                `${BaseUrl}/dzevents/v1/users`,
                formdata
              )

              axios.defaults.headers.common["x-auth-token"] =
                data.headers["x-auth-token"]
              const jwtToken = jwtDecode(data.headers["x-auth-token"])
              setUser(jwtToken)
              setLoading(false)
              navigation.replace("RegisterCongrat")
            } catch (e) {
              console.log(e)
            }
          }}
          validationSchema={validationSchema}>
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
    // justifyContent: "flex-start",
  },
  image: {
    height: 200,
    width: 200,
    borderRadius: 20,
    alignSelf: "center",
  },
  titre: {
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 40,
    color: "crimson",
    marginTop: 50,
    marginBottom: 10,
    padding: 20,
  },
  input: {
    height: 50,
    width: 300,
  },
})
