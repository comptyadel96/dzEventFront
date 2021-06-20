import React from "react"
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { Fontisto, AntDesign, FontAwesome } from "@expo/vector-icons"

export default function Test() {
  
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.titre}> Publications </Text>
        {/* store card */}
        <TouchableWithoutFeedback>
          <LinearGradient
            colors={["#051937", "#052d60", "#04438c", "#065aba", "#1271eb"]}
            style={styles.storePub}>
            <Fontisto name="shopping-store" size={54} color="white" />
            <Text style={styles.cardTitle}>Le store</Text>
            <Text style={styles.text}>
              Publier un article sur le store pour aider les organisateur à bien
              faire dérouler leurs évènements ...it's all about money 💰
            </Text>
            <AntDesign
              name="rightcircleo"
              size={36}
              color="white"
              style={styles.icon}
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
              possible et faite le briller , soyez de ceux qui apportent le fun
              au autres 😎
            </Text>
            <AntDesign
              name="rightcircleo"
              size={36}
              color="white"
              style={styles.icon}
            />
          </LinearGradient>
        </TouchableWithoutFeedback>
        {/* firstTime card */}
        <TouchableWithoutFeedback>
          <LinearGradient
            colors={["#051937", "#643365", "#c54d6a", "#ff8c4e", "#ffe53d"]}
            style={styles.storePub}>
            <FontAwesome name="fire" size={54} color="white" />
            <Text style={styles.cardTitle3}>FirstTime</Text>
            <Text style={styles.text}>
              Chaque chose a un début et une fin ....on s'en fous de la fin 😁
              faite leurs découvrir votre nouveau projet/ commerce / start-up 🔥
            </Text>
            <AntDesign
              name="rightcircleo"
              size={36}
              color="white"
              style={styles.icon}
            />
          </LinearGradient>
        </TouchableWithoutFeedback>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    padding: 20,
    flex: 1,
    backgroundColor: "black",
  },
  titre: {
    color: "white",
    fontSize: 25,
    alignSelf: "center",
    marginBottom: 10,
    padding: 4,
    borderBottomColor: "red",
    borderBottomWidth: 1,
  },
  storePub: {
    width: "100%",
    height: 260,
    alignItems: "center",
    padding: 10,
    position: "relative",
    borderRadius: 7,
    marginBottom: 14,
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
