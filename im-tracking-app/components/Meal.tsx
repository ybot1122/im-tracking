import { StyleSheet } from "react-native";
import { ThemedText } from "./structure/ThemedText";
import { ThemedView } from "./structure/ThemedView";
import { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  mealName: string;
}>;

export default function Meal({ children, mealName }: Props) {
  return (
    <ThemedView style={styles.mealItem}>
      <ThemedText style={styles.mealName}>{mealName}</ThemedText>
      {children}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  mealItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e9ecef",
  },
  mealName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
});
