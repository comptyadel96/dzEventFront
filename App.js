import "react-native-gesture-handler"
import React from "react"
import AppScreen from "./app/components/AppScreen"
import AppNavigation from "./navigation/AppNavigation"
import RegisterForm from "./app/screens/forms/RegisterForm"
import EventForm from "./app/screens/forms/EventForm"

import DatePicker from "./DateTimePicker"
import Test from "./Test"
import Test2 from "./Test2"

import StoreForm from "./app/screens/forms/StoreForm"
import ProfilPublication from "./app/components/ProfilPublication"
import EventImages from "./app/screens/forms/EventImages"
import AppImagePicker from "./app/screens/forms/AppImagePicker"
import FirstTimeForm from "./app/screens/forms/FirstTimeForm"
export default function App() {
  return (
    <AppScreen>
      <AppNavigation />
      {/* <RegisterForm/> */}
      {/* <EventForm/> */}
      {/* <PickerImage/> */}
      {/* <Test2/> */}
     {/* <FirstTimeForm/> */}
      {/* <StoreForm/> */}
     {/* <EventImages/> */}
    </AppScreen>
  )
}
