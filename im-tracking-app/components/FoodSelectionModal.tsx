import {
  TouchableOpacity,
  Modal,
  Pressable,
  StyleSheet,
  FlatList,
  TextInput,
  Alert,
} from "react-native";
import { ThemedView } from "./structure/ThemedView";
import { ThemedText } from "./structure/ThemedText";
import { foodItems, FoodItem } from "../data/foods";
import { useState } from "react";

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

      {/* Servings Input Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isServingModalVisible}
        onRequestClose={handleCancelServings}
      >
        <Pressable style={styles.modalOverlay} onPress={handleCancelServings}>
          <Pressable onPress={(e) => e.stopPropagation()}>
            <ThemedView style={styles.servingModalContent}>
              <ThemedView style={styles.servingModalHeader}>
                <ThemedText style={styles.servingModalTitle}>
                  {selectedFood?.name}
                </ThemedText>
              </ThemedView>

              <ThemedView style={styles.servingInputContainer}>
                <ThemedText style={styles.servingLabel}>
                  Number of Servings:
                </ThemedText>
                <TextInput
                  style={styles.servingInput}
                  value={servings}
                  onChangeText={setServings}
                  keyboardType="decimal-pad"
                  placeholder="1.00"
                  placeholderTextColor="#999"
                  autoFocus={true}
                />
                {selectedFood && (
                  <ThemedView style={styles.servingAmountContainer}>
                    <ThemedText style={styles.servingAmountText}>
                      Total Amount:{" "}
                      {(() => {
                        const servingsNum = parseFloat(servings);
                        if (isNaN(servingsNum) || servingsNum <= 0) return "0";
                        const totalValue = (
                          servingsNum * selectedFood.servingSize.value
                        ).toFixed(1);
                        return `${totalValue} ${selectedFood.servingSize.unit}`;
                      })()}
                    </ThemedText>
                  </ThemedView>
                )}
              </ThemedView>

              <ThemedView style={styles.servingModalButtons}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={handleCancelServings}
                >
                  <ThemedText style={styles.cancelButtonText}>
                    Cancel
                  </ThemedText>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.confirmButton}
                  onPress={handleConfirmServings}
                >
                  <ThemedText style={styles.confirmButtonText}>
                    Add Food
                  </ThemedText>
                </TouchableOpacity>
              </ThemedView>
            </ThemedView>
          </Pressable>
        </Pressable>
      </Modal>
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
    color: "#666",
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
  foodCategory: {
    fontSize: 14,
    color: "#666",
  },
  foodCalories: {
    fontSize: 16,
    fontWeight: "600",
    color: "#007AFF",
  },
  servingModalContent: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    width: "90%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },
  servingModalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#e9ecef",
  },
  servingModalTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
  },
  servingInputContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  servingLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  servingInput: {
    borderWidth: 1,
    borderColor: "#e9ecef",
    borderRadius: 10,
    padding: 12,
    fontSize: 18,
    color: "#333",
  },

  servingAmountContainer: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#e9ecef",
  },
  servingAmountText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  servingModalButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  cancelButton: {
    backgroundColor: "#f8f9fa",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderWidth: 1,
    borderColor: "#e9ecef",
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#666",
  },
  confirmButton: {
    backgroundColor: "#007AFF",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 25,
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
});
