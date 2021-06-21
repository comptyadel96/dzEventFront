import React, { useContext } from "react"
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native"
import AppText from "../components/AppText"
import { LinearGradient } from "expo-linear-gradient"
import { Fontisto, AntDesign, FontAwesome } from "@expo/vector-icons"
import AuthContext from "./authentification/AuthContext"
import RegisterOrLogin from "./authentification/RegisterOrLogin"
import Colors from "../assets/Colors"

export default function Publier({ navigation }) {
  const { user } = useContext(AuthContext)
  return (
    <LinearGradient
      colors={["#dee8ff", "#e9e6fc", "#f3e4f7", "#fbe3f0", "#ffe3e9"]}
      style={styles.container}>
      {user ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ width: "100%" }}>
          <AppText style={styles.titre}>Publications</AppText>
          {/* store card */}
          <TouchableWithoutFeedback>
            <LinearGradient
              colors={["#051937", "#052d60", "#04438c", "#065aba", "#1271eb"]}
              style={styles.storePub}>
              <Fontisto name="shopping-store" size={54} color="white" />
              <Text style={styles.cardTitle}>Le store</Text>
              <Text style={styles.text}>
                Publier un article sur le store pour aider les organisateur à
                bien faire dérouler leurs évènements ...it's all about money 💰
              </Text>
              <AntDesign
                name="rightcircleo"
                size={36}
                color="white"
                style={styles.icon}
                onPress={() => navigation.navigate("StoreForm")}
              />
            </LinearGradient>
          </TouchableWithoutFeedback>

          {/*  events card */}
          <TouchableWithoutFeedback>
            <LinearGradient
              colors={["#051937", "#3c2458", "#7d2165", "#ba195a", "#e53838"]}
              style={styles.storePub}>
              <AntDesign name="calendar" size={54} color="white" />
              <Text style={styles.cardTitle2}>Evènement</Text>
              <Text style={styles.text}>
                Publier votre propre évènement,attirez le plus de monde que
                possible et faite le briller , soyez de ceux qui apportent le
                fun au autres 😎
              </Text>
              <AntDesign
                name="rightcircleo"
                size={36}
                color="white"
                style={styles.icon}
                onPress={() => navigation.navigate("EventForm")}
              />
            </LinearGradient>
          </TouchableWithoutFeedback>
          {/* firstTime card */}
          {!user.firstTimePublished && (
            <TouchableWithoutFeedback>
              <LinearGradient
                colors={["#051937", "#593160", "#ae496b", "#ec785b", "#ffc04a"]}
                style={styles.storePub}>
                <FontAwesome name="fire" size={54} color="white" />
                <Text style={styles.cardTitle3}>FirstTime</Text>
                <Text style={styles.text}>
                  Chaque chose a un début et une fin ....on s'en fous de la fin
                  😁 faite leurs découvrir votre nouveau projet/ commerce /
                  start-up 🔥
                </Text>
                <AntDesign
                  name="rightcircleo"
                  size={36}
                  color="white"
                  style={styles.icon}
                  onPress={() => navigation.navigate("FirstTimeForm")}
                />
              </LinearGradient>
            </TouchableWithoutFeedback>
          )}
        </ScrollView>
      ) : (
        <RegisterOrLogin />
      )}
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    padding: 20,
    flex: 1,
    height: "100%",
    // backgroundColor: "#f2f2f2",
    backgroundColor: Colors.primary,
  },
  titre: {
    color: Colors.primary,
    fontSize: 25,
    fontWeight: "bold",
    alignSelf: "center",
    marginBottom: 15,
  },
  storePub: {
    width: "100%",
    height: 260,
    alignItems: "center",
    padding: 10,
    position: "relative",
    borderRadius: 7,
    marginBottom: 24,
  },
  cardTitle: {
    color: "#4eb1ff",
    fontSize: 22,
    marginVertical: 7,
  },
  cardTitle2: {
    fontSize: 22,
    marginVertical: 7,
    color: "#ff6b6b",
  },
  cardTitle3: {
    color: "#ffcf7b",
    fontSize: 22,
    marginVertical: 7,
  },
  text: {
    color: "white",
    padding: 8,
    backgroundColor: "rgba(255, 255, 255,0.15)",
    borderRadius: 7,
    fontSize: 17,
  },

  icon: {
    position: "absolute",
    bottom: 14,
  },
})
