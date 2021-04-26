import { useFormikContext } from "formik"
import React from "react"
import AppPicker from "../../components/AppPicker"
import FormMessageError from "./FormMessageError"

export default function AppFormPicker({ placeholder, items, name,style,iconColor }) {
  const { setFieldValue, values, errors, touched } = useFormikContext()
  return (
    <>
      <AppPicker
        categorie={items}
        placeholder={placeholder}
        onSelectItem={(item) => setFieldValue(name, item)}
        selectedItem={values[name]}
        style={style}
        iconColor={iconColor}
      />
      <FormMessageError errors={errors[name]} visible={touched[name]} />
    </>
  )
}

