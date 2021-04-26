import { useFormikContext } from 'formik'
import React from 'react'
import { StyleSheet} from 'react-native'
import AppButton from '../../components/AppButton'

export default function ButtonSubmit({title,style}) {
  const{handleSubmit} = useFormikContext()
    return (
      <AppButton title={title} onPress={handleSubmit} style={[styles.button,style]} />
    )
}

const styles = StyleSheet.create({
    button:{
        backgroundColor:'crimson',
        width:'100%',
        alignItems:'center',
        justifyContent:'center'
    }
})
