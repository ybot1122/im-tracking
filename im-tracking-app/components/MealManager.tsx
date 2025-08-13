import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { ThemedView } from "./structure/ThemedView";
import { ThemedText } from "./structure/ThemedText";

export interface Meal {
  id: string;
  name: string;
}

interface MealManagerProps {
  meals: Meal[];
  onAddMeal: () => void;
  onDeleteMeal: (mealId: string) => void;
}

export function MealManager({
  meals,
  onAddMeal,
  onDeleteMeal,
}: MealManagerProps) {
  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText style={styles.title}>Meals</ThemedText>
        <TouchableOpacity
          onPress={onAddMeal}
          style={styles.addButton}
          accessibilityLabel="Add new meal"
        >
          <ThemedText style={styles.addButtonText}>+ Add Meal</ThemedText>
        </TouchableOpacity>
      </ThemedView>

      {meals.length === 0 ? (
        <ThemedView style={styles.emptyState}>
          <ThemedText style={styles.emptyStateText}>
            No meals added yet
          </ThemedText>
        </ThemedView>
      ) : (
        <ThemedView style={styles.mealsList}>
          {meals.map((meal, index) => (
            <ThemedView key={meal.id} style={styles.mealItem}>
              <ThemedText style={styles.mealName}>{meal.name}</ThemedText>
              <TouchableOpacity
                onPress={() => onDeleteMeal(meal.id)}
                style={styles.deleteButton}
                accessibilityLabel={`Delete ${meal.name}`}
              >
                <ThemedText style={styles.deleteButtonText}>×</ThemedText>
              </TouchableOpacity>
            </ThemedView>
          ))}
        </ThemedView>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "transparent",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
  },
  addButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#007AFF",
  },
  addButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: 32,
  },
  emptyStateText: {
    fontSize: 16,
    color: "#888",
    fontStyle: "italic",
  },
  mealsList: {
    gap: 12,
  },
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
  deleteButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#dc3545",
    justifyContent: "center",
    alignItems: "center",
  },
  deleteButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
});

export default MealManager;
