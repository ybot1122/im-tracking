import { StyleSheet, FlatList } from "react-native";
import { ThemedText } from "./structure/ThemedText";
import { ThemedView } from "./structure/ThemedView";
import { PropsWithChildren } from "react";
import { FoodItem } from "@/data/foods";

type Props = PropsWithChildren<{
  mealName: string;
  foods: FoodItem[];
}>;

const renderFoodItem = ({ item }: { item: FoodItem }) => (
  <ThemedView
    style={{
      flexDirection: "row",
      marginBottom: 2,
      backgroundColor: "#f8f9fa",
    }}
  >
    <ThemedText style={{ width: 100 }}>{item.name}</ThemedText>
    <ThemedText style={{ width: 120 }}>{item.brand}</ThemedText>
    <ThemedText style={{ width: 60 }}>{item.calories}</ThemedText>
  </ThemedView>
);

const renderHeader = () => (
  <ThemedView
    style={{
      flexDirection: "row",
      marginBottom: 4,
      backgroundColor: "#f8f9fa",
    }}
  >
    <ThemedText style={{ width: 100, fontWeight: "bold" }}>Food</ThemedText>
    <ThemedText style={{ width: 120, fontWeight: "bold" }}>Brand</ThemedText>
    <ThemedText style={{ width: 60, fontWeight: "bold" }}>Cals</ThemedText>
  </ThemedView>
);

export default function Meal({ children, mealName, foods }: Props) {
  return (
    <ThemedView style={styles.container}>
      <ThemedView style={[styles.title, { backgroundColor: "#f8f9fa" }]}>
        <ThemedText style={styles.mealName}>{mealName}</ThemedText>
        {children}
      </ThemedView>
      <ThemedView style={[styles.foodList, { backgroundColor: "#f8f9fa" }]}>
        {foods.length === 0 ? (
          <ThemedText style={{ color: "#888", fontStyle: "italic" }}>
            No foods added
          </ThemedText>
        ) : (
          <FlatList
            data={foods}
            renderItem={renderFoodItem}
            keyExtractor={(item) => item.id}
            ListHeaderComponent={renderHeader}
            showsVerticalScrollIndicator={false}
            scrollEnabled={foods.length > 5}
            style={{ backgroundColor: "#f8f9fa" }}
          />
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
  foodList: {
    flex: 1,
    marginLeft: 16,
  },
  mealName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
});
