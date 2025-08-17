import { View, Image } from "react-native";

export default function () {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Image
        source={require("../../assets/images/spinner.gif")}
        style={{ width: 32, height: 32 }}
        accessibilityLabel="Loading"
      />
    </View>
  );
}
