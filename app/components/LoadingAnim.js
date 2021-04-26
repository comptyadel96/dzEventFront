import React from "react"
import LottieView from "lottie-react-native"
export default function LoadingAnim({ visible = false }) {
  if (!visible) return null
  return (
    <LottieView
      loop
      autoPlay
      source={require("../assets/animations/lf30_editor_w6jbp9gj.json")}
    />
  )
}
