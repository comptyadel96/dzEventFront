import React, { useState, useEffect } from "react"
import {
  Button,
  StyleSheet,
  View,
  Dimensions,
  Modal,
  Alert,
} from "react-native"

import MapView, { Marker } from "react-native-maps"
import * as Location from "expo-location"
import { LocationAccuracy } from "expo-location"
import { useFormikContext } from "formik"

export default function AppFormMap({ name, showMap = false, onPress }) {
  const { setFieldValue } = useFormikContext()
  const [latitudes, setLatitudes] = useState(0)
  const [longitudes, setLongitudes] = useState(0)

  const getPermission = async () => {
    const location = await Location.requestPermissionsAsync()
    if (!location.granted) {
      alert(
        "vous devez nous donner la permission d'acceder à votre position afin d'utiliser le service de localisation  "
      )
    }

    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({
      accuracy: LocationAccuracy.BestForNavigation,
    })
    setFieldValue(name, [longitude, latitude])
    setLongitudes(longitude)
    setLatitudes(latitude)
  }

  useEffect(() => {
    getPermission()
  }, [])

  return (
    <Modal visible={showMap}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 27.410663779951236,
          longitude: 2.651911787688732,
          latitudeDelta: 23.166497716637654,
          longitudeDelta: 14.408208578824997,
        }}
        showsUserLocation
        loadingEnabled
        // onRegionChange={(region) => console.log(region)}
        onMarkerDragEnd={(e) => {
          setFieldValue(
            name,

            [
              e.nativeEvent.coordinate.longitude,
              e.nativeEvent.coordinate.latitude,
            ]
          )
         
          console.log(e.nativeEvent.coordinate)
        }}
        provider="google">
        <Marker
          coordinate={{
            latitude: latitudes,
            longitude: longitudes,
          }}
          title="Position actuelle"
          draggable
          onPress={() =>
            Alert.alert(
              "info",
              "maintenez le marker pour le déplacer dans la position souhaiter 😉 ",
              [{ text: "ok" }]
            )
          }
        />
      </MapView>
      <View style={{ position: "absolute", bottom: 20, right: 8 }}>
        <Button
          title="confirmer"
          onPress={() => {
            Alert.alert(
              "Confirmation",
              "confirmez la position pour cet évènement ?",
              [{ text: "oui", onPress }, { text: "non" }]
            )
          }}
          color="crimson"
        />
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
})
