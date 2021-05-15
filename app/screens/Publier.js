import React, { useContext } from "react"
import { StyleSheet, View } from "react-native"
import Colors from "../assets/Colors"
import AppButton from "../components/AppButton"
import AppText from "../components/AppText"
import { FontAwesome } from "@expo/vector-icons"
import AuthContext from "./authentification/AuthContext"
import RegisterOrLogin from "./authentification/RegisterOrLogin"

export default function Publier({ navigation }) {
  const { user } = useContext(AuthContext)
  return (
    <View style={styles.container}>
      {user && <FontAwesome name="calendar-plus-o" size={50} color="grey" />}
      {user && <AppText style={styles.titre}>Publications</AppText>}

      {user ? (
        <View style={styles.publications}>
          <AppButton
            title=" Le store +"
            onPress={() => navigation.navigate("StoreForm")}
            style={styles.buttons}
            color={Colors.secondary}
            logo="cart-plus"
            logoColor="white"
            backColor="transparent"
          />
          <AppButton
            title=" Un évènement +"
            onPress={() => navigation.navigate("EventForm")}
            style={styles.buttons}
            color={Colors.primary}
            logo="airballoon-outline"
            logoColor="white"
            backColor="transparent"
          />
          <AppButton
            title="Section premiére fois +"
            onPress={() => navigation.navigate("FirstTimeForm")}
            style={styles.buttons}
            color={Colors.gold}
            logo="home-floor-1"
            logoColor="white"
            backColor="transparent"
          />
        </View>
      ) : (
        <RegisterOrLogin />
      )}
      {user && (
        <AppText style={styles.description}>
          <FontAwesome name="info-circle" size={20} color={Colors.primary} />{" "}
          Publier un évènement organisé ,un article à mettre en vente ,ou bien
          tous simplement une ouverture d'un nouveau commerce/ start-up etc...
        </AppText>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  titre: { color: Colors.primary, marginTop: 15, fontSize: 30 },
  publications: {
    backgroundColor: Colors.textInput,
    width: "100%",
    height: "40%",
    borderRadius: 20,
    marginBottom: 80,
    marginTop: 30,
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  buttons: {
    width: "auto",
    height: 35,
    borderRadius: 5,
    marginVertical: 5,
    // backgroundColor: Colors.primary,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    // justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
  description: {
    color: "grey",
    // textAlign: "center",
    backgroundColor: Colors.textInput,
    marginHorizontal: 15,
    borderRadius: 10,
    padding: 10,
  },
})
