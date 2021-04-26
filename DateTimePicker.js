import React, { useState } from "react"
import { View, StyleSheet } from "react-native"

import moment from "moment"
import momentConfig from "./app/config-momentJs/MomentJs"
import AppText from "./app/components/AppText"
import DateTimePicker from "@react-native-community/datetimepicker"
import AppButton from "./app/components/AppButton"

import { useFormikContext } from "formik"
import FormMessageError from "./app/screens/forms/FormMessageError"
import Colors from "./app/assets/Colors"

export default function DatePicker({ title, title2, name}) {
  const { setFieldValue, errors, touched, setFieldTouched, } = useFormikContext()

  const [date, setDate] = useState(new Date())
  const [mode, setMode] = useState("date")
  const [show, setShow] = useState(false)
  const [hasSetDate, setHasSetDate] = useState(false)

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate|| date
    setShow(Platform.OS === "ios")
    setDate(currentDate)
    setFieldValue(name,(currentDate).toUTCString())  
    setHasSetDate(true)
    setFieldTouched(name)
     
  }

  const showMode = (modeAffichage) => {
    setShow(true)
    setMode(modeAffichage)
  }

  const showDate = () => {
    showMode("date")
  }

  const showTime = () => {
    showMode("time")
  }

  return (
    <>
      <View style={styles.buttonContainer}>
        <AppButton
          onPress={showDate}
          title={title}
          style={styles.button}
          text={{ color: Colors.grey }}
        />
        {hasSetDate &&  (
          <AppText style={{ color: Colors.secondary }}>
            {moment(date).format("D/MMM/YYYY")}
          </AppText>
        )}

        <AppButton
          onPress={showTime}
          title={title2}
          style={styles.button}
          text={{ color: Colors.grey }}
        />
        {hasSetDate && (
          <AppText style={{ color: Colors.primary }}>
            {moment(date).format("H:mm")} h
          </AppText>
        )}
      </View>

      {/* <AppText>se déroulera dans {moment(date).toNow(true)} </AppText> */}
      {show && (
        <>
          <DateTimePicker
            testID='dateTimePicker'
            value={date}
            onChange={onChange}
            mode={mode}
            is24Hour={true}
            display='spinner'
            locale='fr-FR'
            minimumDate={new Date(Date.now())}
          />
        </>
      )}
      <FormMessageError errors={errors[name]} visible={touched[name]} />
    </>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    padding: 10,
    marginVertical: 5,
  },
  button: {
    maxWidth: "60%",
    height: 30,
    margin: 5,
    backgroundColor: Colors.textInput,
  },
})
