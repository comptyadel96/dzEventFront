import React, { useState } from "react"

import {
  FlatList,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native"

import { MaterialCommunityIcons } from "@expo/vector-icons"
import AppText from "./AppText"
import CategorieItem from "./CategorieItem"
import Colors from "../assets/Colors"

export default function AppPicker({
  icon = "apps",
  placeholder,
  categorie,
  selectedItem,
  onSelectItem,
  otherFunction,
  style,
  iconColor=Colors.grey
}) {
  const [model, setModel] = useState(false)

  return (
    <View style={style}>
      <TouchableWithoutFeedback onPress={() => setModel(true)}>
        <View style={styles.container}>
          {icon && (
            <MaterialCommunityIcons
              name={icon}
              size={27}
              style={{ marginRight: 1 }}
              color={iconColor}
            />
          )}
          <AppText style={styles.text}>
            {selectedItem ? selectedItem : placeholder}
          </AppText>

          <MaterialCommunityIcons
            name='chevron-down'
            size={27}
            color={Colors.grey}
          />
        </View>
      </TouchableWithoutFeedback>

      <Modal visible={model} animationType='slide'>
        <MaterialCommunityIcons
          name='close'
          size={27}
          color={Colors.grey}
          onPress={() => setModel(false)}
        />
        <FlatList
          data={categorie}
          keyExtractor={(categorie) => categorie.label}
          renderItem={({ item }) => (
            <CategorieItem
              item={item}
              onPress={() => {
                setModel(false)
                onSelectItem(item.label)
                {
                  otherFunction && otherFunction()
                }
              }}
            />
          )}
          numColumns={3}
        />
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: 160,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.textInput,
    margin: 9,
    marginHorizontal: 0,
    padding: 3,
    paddingRight: 0,
    borderRadius: 20,
  },
  text: {
    flex: 1,
    color: Colors.grey,
    fontSize: 14,
  },
})
