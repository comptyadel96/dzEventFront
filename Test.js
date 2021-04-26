import React, { useState, useEffect } from "react"
import {
  Button,
  StyleSheet,
  View,
  Image,
  ScrollView,
  Dimensions,
} from "react-native"
import AppTextInput from "./app/components/AppTextInput"
import MapView, { Marker } from "react-native-maps"
import AppLogo from "./app/components/AppLogo"
import axios from "axios"
import * as Location from "expo-location"
import { LocationAccuracy } from "expo-location"

export default function Test() {
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
    setLatitudes(latitude)
    setLongitudes(longitude)
  }
  useEffect(() => {
    getPermission()
    console.log(latitudes, longitudes)
  }, [])

  return (
    <>
      <MapView
        style={styles.map}
        region={{
          latitude: latitudes,
          longitude: longitudes,
          latitudeDelta: 0.14679076282407522,
          longitudeDelta: 0.09999979287385985,
        }}
        showsMyLocationButton={true}
        loadingEnabled

        onRegionChange={(region) => console.log(region)}
        provider="google">
        <Marker
          coordinate={{
            latitude: latitudes,
            longitude: longitudes,
          }}
          title="votre position actuelle"
        />
      </MapView>
    </>
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
