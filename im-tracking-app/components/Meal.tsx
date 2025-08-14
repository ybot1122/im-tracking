import { StyleSheet, FlatList } from "react-native";
import { ThemedText } from "./structure/ThemedText";
import { ThemedView } from "./structure/ThemedView";
import { PropsWithChildren } from "react";
import { FoodItem } from "@/data/foods";

type Props = PropsWithChildren<{
  mealName: string;
  foods: FoodItem[];
}>;

const renderFoodItem = ({ item }: { item: FoodItem }) => {
  const adjustedCalories = item.servings
    ? Math.round(item.calories * item.servings)
    : item.calories;
  const adjustedProtein = item.servings
    ? Math.round(item.protein * item.servings * 10) / 10
    : item.protein;
  const adjustedSodium = item.servings
    ? Math.round(item.sodium * item.servings)
    : item.sodium;
  const servingsText = item.servings ? ` ×${item.servings}` : "";

  return (
    <ThemedView style={styles.foodItemRow}>
      <ThemedView style={styles.foodNameCell}>
        <ThemedText style={styles.foodNameText}>
          {item.name}
          <ThemedText style={styles.servingsText}>{servingsText}</ThemedText>
        </ThemedText>
        <ThemedText style={styles.brandText}>{item.brand}</ThemedText>
      </ThemedView>
      <ThemedView style={styles.proteinCell}>
        <ThemedText style={styles.proteinText}>{adjustedProtein}g</ThemedText>
      </ThemedView>
      <ThemedView style={styles.sodiumCell}>
        <ThemedText style={styles.sodiumText}>{adjustedSodium}mg</ThemedText>
      </ThemedView>
      <ThemedView style={styles.caloriesCell}>
        <ThemedText style={styles.caloriesText}>{adjustedCalories}</ThemedText>
      </ThemedView>
    </ThemedView>
  );
};

const renderHeader = () => (
  <ThemedView style={styles.tableHeader}>
    <ThemedView style={styles.foodNameCell}>
      <ThemedText style={styles.headerText}>Food</ThemedText>
    </ThemedView>
    <ThemedView style={styles.proteinCell}>
      <ThemedText style={styles.headerText}>🥩</ThemedText>
    </ThemedView>
    <ThemedView style={styles.sodiumCell}>
      <ThemedText style={styles.headerText}>🧂</ThemedText>
    </ThemedView>
    <ThemedView style={styles.caloriesCell}>
      <ThemedText style={styles.headerText}>Cals</ThemedText>
    </ThemedView>
  </ThemedView>
);

export default function Meal({ children, mealName, foods }: Props) {
  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.mealCard}>
        <ThemedView style={styles.titleSection}>
          <ThemedText style={styles.mealName}>{mealName}</ThemedText>
          <ThemedView style={styles.actionButtons}>{children}</ThemedView>
        </ThemedView>

        <ThemedView style={styles.foodTableContainer}>
          {foods.length === 0 ? (
            <ThemedView style={styles.emptyState}>
              <ThemedText style={styles.emptyStateText}>
                No foods added yet
              </ThemedText>
            </ThemedView>
          ) : (
            <FlatList
              data={foods}
              renderItem={renderFoodItem}
              keyExtractor={(item) => item.id}
              ListHeaderComponent={renderHeader}
              showsVerticalScrollIndicator={false}
              scrollEnabled={foods.length > 5}
              style={styles.foodList}
            />
          )}
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  mealCard: {
    backgroundColor: "transparent",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  titleSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f5f5f5",
  },
  mealName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1a1a1a",
  },
  actionButtons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  foodTableContainer: {
    paddingVertical: 16,
    paddingHorizontal: 5,
  },
  tableHeader: {
    flexDirection: "row",
    paddingVertical: 12,
    backgroundColor: "transparent",
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  headerText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6c757d",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  foodItemRow: {
    flexDirection: "row",
    padding: 12,
    marginBottom: 4,
    backgroundColor: "transparent",
    borderRadius: 8,
  },
  foodNameCell: {
    flex: 2.5,
    paddingRight: 12,
  },
  proteinCell: {
    flex: 0.8,
    alignItems: "flex-end",
    paddingRight: 8,
  },
  sodiumCell: {
    flex: 0.8,
    alignItems: "flex-end",
    paddingRight: 8,
  },
  caloriesCell: {
    flex: 0.8,
    alignItems: "flex-end",
  },
  foodNameText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#2c3e50",
    lineHeight: 20,
  },
  servingsText: {
    fontSize: 13,
    color: "#6c757d",
    fontWeight: "400",
  },
  brandText: {
    fontSize: 12,
    color: "#6c757d",
    lineHeight: 16,
    marginTop: 2,
  },
  proteinText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#495057",
    textAlign: "right",
  },
  sodiumText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#495057",
    textAlign: "right",
  },
  caloriesText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#495057",
    textAlign: "right",
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: 32,
    paddingHorizontal: 20,
  },
  emptyStateText: {
    fontSize: 15,
    color: "#adb5bd",
    fontStyle: "italic",
    textAlign: "center",
  },
  foodList: {
    backgroundColor: "transparent",
  },
});
