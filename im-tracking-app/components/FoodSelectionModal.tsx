import {
  TouchableOpacity,
  Modal,
  Pressable,
  StyleSheet,
  FlatList,
  Alert,
} from "react-native";
import { ThemedView } from "./structure/ThemedView";
import { ThemedText } from "./structure/ThemedText";
import { foodItems, FoodItem } from "../data/foods";
import { useState } from "react";
import ServingsInputModal from "./ServingsInputModal";

export default function FoodSelectionModal({
  isVisible,
  onRequestClose,
  onFoodSelect,
}: {
  isVisible: boolean;
  onRequestClose: (val: boolean) => void;
  onFoodSelect: (food: FoodItem, servings: number) => void;
}) {
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [servings, setServings] = useState("1.00");
  const [isServingModalVisible, setIsServingModalVisible] = useState(false);

  const handleFoodSelect = (food: FoodItem) => {
    setSelectedFood(food);
    setServings("1.00");
    setIsServingModalVisible(true);
  };

  const handleConfirmServings = () => {
    if (selectedFood) {
      const servingsNum = parseFloat(servings);
      if (isNaN(servingsNum) || servingsNum <= 0) {
        Alert.alert(
          "Invalid Servings",
          "Please enter a valid number of servings greater than 0."
        );
        return;
      }
      onFoodSelect(selectedFood, servingsNum);
      setSelectedFood(null);
      setServings("1.00");
      setIsServingModalVisible(false);
      onRequestClose(false);
    }
  };

  const handleCancelServings = () => {
    setSelectedFood(null);
    setServings("1.00");
    setIsServingModalVisible(false);
  };

  const renderFoodItem = ({ item }: { item: FoodItem }) => (
    <TouchableOpacity
      style={styles.foodItem}
      onPress={() => handleFoodSelect(item)}
      activeOpacity={0.7}
    >
      <ThemedView style={styles.foodItemContent}>
        <ThemedView style={styles.foodInfo}>
          <ThemedText style={styles.foodName}>{item.name}</ThemedText>
          <ThemedText style={styles.foodBrand}>{item.brand}</ThemedText>
          <ThemedText style={styles.foodMacros}>
            Protein: {item.protein}g | Sodium: {item.sodium}mg
          </ThemedText>
        </ThemedView>
        <ThemedText style={styles.foodCalories}>{item.calories} cal</ThemedText>
      </ThemedView>
    </TouchableOpacity>
  );

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isVisible}
        onRequestClose={() => onRequestClose(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => onRequestClose(false)}
        >
          <ThemedView style={styles.modalContent}>
            <ThemedView style={styles.modalHeader}>
              <ThemedText style={styles.modalTitle}>
                Choose Food Item
              </ThemedText>
              <TouchableOpacity
                onPress={() => onRequestClose(false)}
                style={styles.closeButton}
              >
                <ThemedText style={styles.closeButtonText}>×</ThemedText>
              </TouchableOpacity>
            </ThemedView>

            <FlatList
              data={foodItems}
              renderItem={renderFoodItem}
              keyExtractor={(item) => item.id}
              style={styles.foodList}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.foodListContent}
            />
          </ThemedView>
        </Pressable>
      </Modal>

      <ServingsInputModal
        isVisible={isServingModalVisible}
        selectedFood={selectedFood}
        servings={servings}
        onServingsChange={setServings}
        onConfirm={handleConfirmServings}
        onCancel={handleCancelServings}
      />
    </>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 0,
    width: "90%",
    maxHeight: "80%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e9ecef",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#f8f9fa",
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
  foodList: {
    flex: 1,
  },
  foodListContent: {
    padding: 16,
  },
  foodItem: {
    borderRadius: 12,
    marginBottom: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#e9ecef",
  },
  foodItemContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  foodInfo: {
    flex: 1,
  },
  foodName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  foodBrand: {
    fontSize: 12,
    color: "#000",
    marginBottom: 2,
  },
  foodMacros: {
    fontSize: 11,
    color: "#888",
    marginBottom: 2,
  },
  foodCategory: {
    fontSize: 14,
    color: "#000",
  },
  foodCalories: {
    fontSize: 16,
    fontWeight: "600",
    color: "#007AFF",
  },
});
