import { StyleSheet } from "react-native";
import { ThemedText } from "./structure/ThemedText";
import { ThemedView } from "./structure/ThemedView";
import { PropsWithChildren } from "react";
import { FoodItem } from "@/data/foods";

type Props = PropsWithChildren<{
  mealName: string;
  foods: FoodItem[];
}>;

export default function Meal({ children, mealName, foods }: Props) {
  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.title}>
        <ThemedText style={styles.mealName}>{mealName}</ThemedText>
        {children}
      </ThemedView>
      <ThemedView style={{ flex: 1, marginLeft: 16 }}>
        {foods.length === 0 ? (
          <ThemedText style={{ color: "#888", fontStyle: "italic" }}>
            No foods added
          </ThemedText>
        ) : (
          <ThemedView>
            <ThemedView style={{ flexDirection: "row", marginBottom: 4 }}>
              <ThemedText style={{ width: 100, fontWeight: "bold" }}>
                Food
              </ThemedText>
              <ThemedText style={{ width: 60, fontWeight: "bold" }}>
                Cals
              </ThemedText>
            </ThemedView>
            {foods.map((food) => (
              <ThemedView
                key={food.id}
                style={{ flexDirection: "row", marginBottom: 2 }}
              >
                <ThemedText style={{ width: 100 }}>{food.name}</ThemedText>
                <ThemedText style={{ width: 60 }}>{food.calories}</ThemedText>
              </ThemedView>
            ))}
          </ThemedView>
        )}
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f8f9fa",
  },
  title: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  mealName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
});
