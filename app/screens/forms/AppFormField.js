import React from "react"

import AppTextInput from "../../components/AppTextInput"
import FormMessageError from "./FormMessageError"
import { useFormikContext } from "formik"

export default function AppFormField({icon,icon2, style, name,iconColor, ...otherProps }) {
  const { handleChange, setFieldTouched, errors, touched } = useFormikContext()
  return (
    <>
      <AppTextInput
        onChangeText={handleChange(name)}
        onBlur={() => setFieldTouched(name)}
        {...otherProps}
        style={style}
        icon={icon}
        iconColor={iconColor}
        icon2={icon2}
      />
      <FormMessageError errors={errors[name]} visible={touched[name]} />
    </>
  )
}
