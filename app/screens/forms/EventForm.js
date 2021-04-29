import React, { useState } from "react"
import { ScrollView, StyleSheet, View } from "react-native"
import * as Yup from "yup"
import AppFormField from "./AppFormField"
import ButtonSubmit from "./ButtonSubmit"
import AppForm from "./AppForm"
import Categorie from "../../components/Categorie"
import AppFormPicker from "./AppFormPicker"
import DatePicker from "../../../DateTimePicker"
import AppText from "../../components/AppText"
import Colors from "../../assets/Colors"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import axios from "axios"
import BaseUrl from "../../assets/BaseUrl"
import AppImagePicker from "./AppImagePicker"
import UploadProgress from "../../components/UploadProgress"

export default function EventForm({ navigation }) {
  const [visible, setVisible] = useState(false)
  const [progressUpload, setProgressUpload] = useState(0)

  const dateDebut = (Date.now() + 1000 * 60 * 60 * 1).valueOf()

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
      <AppText style={styles.titre}>Créer un évènement</AppText>

      <UploadProgress
        visible={visible}
        progress={progressUpload}
        color={Colors.primary}
      />

      <ScrollView style={{ width: "100%" }}>
        <AppForm
          initialValues={{
            titre: "",
            categorie: "",
            region: "",
            adresse: "",
            description: "",
            dateDebut: new Date(Date.now() + 1000 * 60 * 60 * 1),
            dateFin: new Date(Date.now() + 1000 * 60 * 60 * 2),
            eventPic: null,
          }}
          onSubmit={async (values) => {
            let formdata = new FormData()
            formdata.append("eventPic", {
              uri: values.eventPic,
              type: "image/jpg",
              name: values.eventPic,
            })
            formdata.append("titre", values.titre)
            formdata.append("categorie", values.categorie)
            formdata.append("region", values.region)
            formdata.append("adresse", values.adresse)
            formdata.append("description", values.description)
            formdata.append("dateDebut", values.dateDebut)
            formdata.append("dateFin", values.dateFin)
            try {
              setProgressUpload(0)
              setVisible(true)
              await axios.post(`${BaseUrl}/dzevents/v1/posts`, formdata, {
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
          }}
          validationSchema={validationSchema}>
          <AppImagePicker name="eventPic" />
          <AppFormField
            name="titre"
            placeholder="quel est cet évènement ?"
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
            placeholder="dans quelle wilaya ?"
            autoCapitalize="none"
            icon="google-maps"
            style={{ alignSelf: "center", marginLeft: 10 }}
            iconColor={Colors.gold}
          />
          <AppFormField
            name="adresse"
            placeholder="adresse....?"
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
            placeholder="une bréve description ?"
            autoCapitalize="none"
            icon="sort-descending"
            iconColor={Colors.pink}
          />
          <View>
            <AppText style={styles.text}>
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
              title="Valider"
              style={{ backgroundColor: Colors.primary }}
            />
          </View>
        </AppForm>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  titre: {
    fontSize: 25,
    margin: 15,
  },
  description: {
    minHeight: 120,
    alignSelf: "center",
  },
  text: {
    color: Colors.grey,
    alignSelf: "center",
  },
  image: {
    height: 200,
    width: 200,
    borderRadius: 20,
    alignSelf: "center",
  },
})
