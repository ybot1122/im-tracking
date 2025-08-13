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
    <ThemedView style={styles.mealItem}>
      <ThemedText style={styles.mealName}>{mealName}</ThemedText>
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
