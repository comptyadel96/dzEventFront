import axios from "axios"
import React, { useState } from "react"
import { Alert, StyleSheet, View, ScrollView } from "react-native"
import * as Yup from "yup"
import AppForm from "../../screens/forms/AppForm"
import AppFormField from "../forms/AppFormField"
import AppImagePicker from "./../forms/AppImagePicker"
import ButtonSubmit from "./../forms/ButtonSubmit"
import AppText from "./../../components/AppText"
import BaseUrl from "./../../assets/BaseUrl"
import Colors from "../../assets/Colors"
import LoadingAnim from "../../components/LoadingAnim"
import AppFormPicker from "../forms/AppFormPicker"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import DatePicker from "../../../DateTimePicker"

export default function PutEvent({ route, navigation }) {
  const { _id, event } = route.params
  const dateDebut = (Date.now() + 1000 * 60 * 60 * 1).valueOf()
  const [showLoadingAnim, setShowLoadingAnim] = useState(false)
  const validationSchema = Yup.object().shape({
    titre: Yup.string()
      .min(6, "le titre doit contenir au moins 6 lettres")
      .max(255)
      .required("vous devez spécifier le titre de cet évènement"),
    categorie: Yup.string().required("vous devez selectionner une catégorie"),
    region: Yup.string()
      .min(2, "la wilaya doit contenir aumoins deux lettres/chiffres ")
      .max(50)
      .required("vous devez spécifier la wilaya exmple: alger ou 16"),
    adresse: Yup.string()
      .min(10, "l'adresse doit contenir aumoins 10 lettres")
      .max(1024)
      .required("veuillez donner une adresse à cet évènement"),
    description: Yup.string()
      .min(20, "la description doit contenir aumoins 20 lettres")
      .max(1024),

    dateDebut: Yup.date()
      .min(
        new Date(dateDebut),
        "l'heure du début de l'évènement doit étre supérieur à l'heure actuel d'au moins 1 heure "
      )
      .required("vous devez spécifier une date pour le début de l'évènement"),

    dateFin: Yup.date()
      .min(
        Yup.ref("dateDebut"),
        "la date de fin ne peut pas étre inférieure à la date du début"
      )
      .required("vous devez spécifier une date de fin pour cet évènement"),
  })
  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <AppText style={styles.titre}>Modifier mon évènement</AppText>
      {showLoadingAnim && (
        <View style={styles.loadingAnim}>
          <LoadingAnim
            visible={showLoadingAnim}
            source={require("../../assets/animations/loading-event.json")}
          />
        </View>
      )}
      <ScrollView style={{ width: "100%" }}>
        {/* changer la photo de l'évènement */}
        <AppForm
          initialValues={{ eventPic: null }}
          onSubmit={async (value) => {
            const formdata = new FormData()
            formdata.append("eventPic", {
              uri: value.eventPic,
              type: "image/jpg",
              name: value.eventPic,
            })
            console.log(value)
            try {
              setShowLoadingAnim(true)
              await axios.patch(
                `${BaseUrl}/dzevents/v1/posts/${_id}/updatepicture`,
                formdata
              )
              setShowLoadingAnim(false)
              Alert.alert(
                "bravo",
                "vous avez mis à jour votre photo d'évènement avec succées 😃 "
              )
              navigation.navigate("WelcomeScreen")
            } catch (e) {
              console.log(e)
              Alert.alert(
                "oopss",
                "une erreure est survenue veuillez réessayer dans un moment"
              )
            }
          }}>
          {!showLoadingAnim && (
            <AppImagePicker isProfilPicture={true} name="eventPic" />
          )}
        </AppForm>

        {/* le deuxieme formulaire pour modifier le reste des informations  */}
        <AppForm
          validationSchema={validationSchema}
          onSubmit={(values) => updateEventDetails(values)}
          initialValues={{
            titre: event.titre,
            categorie: event.categorie,
            region: event.region,
            adresse: event.adresse,
            description: event.description,
            dateDebut: new Date(Date.now() + 1000 * 60 * 60 * 1),
            dateFin: new Date(Date.now() + 1000 * 60 * 60 * 2),
            geometry: [],
          }}>
          <AppFormField
            name="titre"
            placeholder={event.titre}
            autoCapitalize="none"
            icon="balloon"
            style={{ alignSelf: "center", margin: 10 }}
            iconColor={Colors.primary}
          />
          <AppFormPicker
            items={Categorie}
            placeholder="Catégorie"
            name="categorie"
            style={{ alignSelf: "flex-start", marginLeft: 10 }}
            iconColor={Colors.secondary}
          />
          <AppFormField
            name="region"
            placeholder={event.region}
            autoCapitalize="none"
            icon="google-maps"
            style={{ alignSelf: "center", marginLeft: 10 }}
            iconColor={Colors.gold}
          />
          <AppFormField
            name="adresse"
            placeholder={event.adresse}
            autoCapitalize="none"
            icon="map-marker-question"
            style={{ alignSelf: "center", marginLeft: 10, minHeight: 80 }}
            multiline
            iconColor={Colors.pistach}
          />
          <AppFormField
            multiline
            name="description"
            style={styles.description}
            placeholder={event.description}
            autoCapitalize="none"
            icon="sort-descending"
            iconColor={Colors.pink}
          />
          <View>
            <AppText style={{ marginLeft: 8 }}>
              Quand est ce que cet évènement aura lieu ?
            </AppText>

            <MaterialCommunityIcons
              name="calendar-clock"
              size={34}
              color="black"
              style={{ alignSelf: "center" }}
            />
            <View>
              <DatePicker title="Du" name="dateDebut" title2=" à " />
              <DatePicker title="Au" name="dateFin" title2=" à " />
            </View>
          </View>

          <View
            style={{
              height: 200,
              alignSelf: "center",
              marginTop: 20,
              width: 80,
            }}>
            <ButtonSubmit
              title="Mettre à jour "
              style={{
                backgroundColor: Colors.primary,
                width: 200,
                alignSelf: "center",
                height: 39,
              }}
            />
          </View>
        </AppForm>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  description: {
    minHeight: 120,
    alignSelf: "center",
  },
  loadingAnim: {
    width: "100%",
    height: "100%",
  },
})
