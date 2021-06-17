import React from "react"
import { StyleSheet, View } from "react-native"
import AppText from "../../components/AppText"
import Colors from "../../assets/Colors"
import AppForm from "../forms/AppForm"
import EventImages from "../forms/EventImages"
import AppFormField from "../forms/AppFormField"
import ButtonSubmit from "../forms/ButtonSubmit"
import * as Yup from "yup"
import axios from "axios"
import BaseUrl from "../../assets/BaseUrl"

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

  description: Yup.string().max(1024),
})
export default function PutStore({ route }) {
  const { _id, article } = route.params

  const putStorePublication = async (data) => {
    try {
      await axios.put(`${BaseUrl}/dzevents/v1/store/${_id}`, data)
    } catch (e) {
      console.log(e)
      alert(
        "une erreure est survenue veuillez s'il vous plait réessayer dans un moment "
      )
    }
  }

  return (
    <View style={styles.container}>
      <AppText style={styles.title}>modifier ma publication</AppText>

      {/* form */}
      <AppForm
        validationSchema={validationSchema}
        initialValues={{
          article: article.article,
          prix: article.prix,
          wilaya: article.wilaya,
          storePics: [],
          description: article.description,
        }}
        onSubmit={(values) => {
          try {
            putStorePublication(values)
          } catch (e) {
            console.log(e)
          }
        }}>
        <AppFormField
          name="article"
          icon="cart-arrow-right"
          placeholder={article.article}
        />
        <AppFormField
          name="prix"
          keyboardType="numeric"
          placeholder={article.prix}
          icon="cash-register"
          style={styles.input}
        />
        <AppFormField
          name="wilaya"
          placeholder={article.wilaya}
          style={styles.input}
          icon="map-marker-radius"
        />
        <AppFormField
          name="description"
          placeholder={article.description}
          style={{ minHeight: 120 }}
          icon="sort-descending"
        />
        <ButtonSubmit title="mettre à jour" style={styles.button} />
      </AppForm>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
  },
  title: {
    marginBottom: 15,
    color: Colors.primary,
  },
  button: {
    width: 200,
    height: 37,
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
