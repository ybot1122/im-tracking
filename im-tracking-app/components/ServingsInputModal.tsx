import {
  TouchableOpacity,
  Modal,
  Pressable,
  StyleSheet,
  TextInput,
  Alert,
  View,
} from "react-native";
import { ThemedView } from "./structure/ThemedView";
import { ThemedText } from "./structure/ThemedText";
import { FoodItem } from "../data/foods";

interface ServingsInputModalProps {
  isVisible: boolean;
  selectedFood: FoodItem | null;
  servings: string;
  onServingsChange: (servings: string) => void;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ServingsInputModal({
  isVisible,
  selectedFood,
  servings,
  onServingsChange,
  onConfirm,
  onCancel,
}: ServingsInputModalProps) {
  const getMacroValues = (food: FoodItem, servingsNum: number) => {
    if (isNaN(servingsNum) || servingsNum <= 0)
      return { calories: 0, protein: 0, sodium: 0 };
    return {
      calories: Math.round(food.calories * servingsNum),
      protein: Math.round(food.protein * servingsNum * 10) / 10,
      sodium: Math.round(food.sodium * servingsNum),
    };
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onCancel}
    >
      <Pressable style={styles.modalOverlay} onPress={onCancel}>
        <Pressable onPress={(e) => e.stopPropagation()}>
          <ThemedView style={styles.servingModalContent}>
            <ThemedView style={styles.servingModalHeader}>
              <TouchableOpacity style={styles.backButton} onPress={onCancel}>
                <ThemedText style={styles.backButtonText}>←</ThemedText>
              </TouchableOpacity>
              <ThemedView style={styles.servingModalTitleContainer}>
                <ThemedText style={styles.servingModalTitle}>
                  {selectedFood?.name}
                </ThemedText>
                <ThemedText style={styles.servingModalSubtitle}>
                  {selectedFood?.brand}
                </ThemedText>
              </ThemedView>
            </ThemedView>

            <ThemedView style={styles.servingInputContainer}>
              <ThemedText style={styles.servingLabel}>
                Number of Servings
              </ThemedText>
              <TextInput
                style={styles.servingInput}
                value={servings}
                onChangeText={onServingsChange}
                keyboardType="decimal-pad"
                placeholder="1.00"
                placeholderTextColor="#999"
                autoFocus={true}
              />
            </ThemedView>

            {/* Macros Display */}
            {selectedFood && (
              <ThemedView style={styles.macrosContainer}>
                <View style={styles.macrosGrid}>
                  <ThemedView style={styles.macroCard}>
                    <ThemedText style={styles.macroValue}>
                      {
                        getMacroValues(selectedFood, parseFloat(servings))
                          .calories
                      }
                    </ThemedText>
                    <ThemedText style={styles.macroLabel}>Calories</ThemedText>
                  </ThemedView>
                  <ThemedView style={styles.macroCard}>
                    <ThemedText style={styles.macroValue}>
                      {
                        getMacroValues(selectedFood, parseFloat(servings))
                          .protein
                      }
                      g
                    </ThemedText>
                    <ThemedText style={styles.macroLabel}>Protein</ThemedText>
                  </ThemedView>
                  <ThemedView style={styles.macroCard}>
                    <ThemedText style={styles.macroValue}>
                      {
                        getMacroValues(selectedFood, parseFloat(servings))
                          .sodium
                      }
                      mg
                    </ThemedText>
                    <ThemedText style={styles.macroLabel}>Sodium</ThemedText>
                  </ThemedView>
                </View>
                <ThemedText style={styles.macrosNote}>
                  {parseFloat(servings) || 1} serving
                  {parseFloat(servings) !== 1 ? "s" : ""},{" "}
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

            <ThemedView style={styles.servingModalButtons}>
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={onConfirm}
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
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  servingModalContent: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 24,
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
    alignItems: "center",
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e9ecef",
    position: "relative",
    paddingTop: 20,
  },
  backButton: {
    position: "absolute",
    left: -14,
    top: -24,
    padding: 8,
    zIndex: 1,
  },
  backButtonText: {
    fontSize: 24,
    color: "#000",
  },
  servingModalTitleContainer: {
    alignItems: "center",
    width: "100%",
  },
  servingModalTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#333",
    marginBottom: 4,
  },
  servingModalSubtitle: {
    fontSize: 14,
    color: "#000",
    fontStyle: "italic",
  },
  servingInputContainer: {
    marginTop: 24,
    marginBottom: 24,
  },
  servingLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 12,
    textAlign: "center",
  },
  servingInput: {
    borderWidth: 2,
    borderColor: "#e9ecef",
    borderRadius: 12,
    padding: 16,
    fontSize: 20,
    color: "#333",
    textAlign: "center",
    backgroundColor: "#f8f9fa",
  },
  macrosContainer: {
    marginBottom: 24,
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#e9ecef",
  },
  macrosGrid: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 12,
  },
  macroCard: {
    alignItems: "center",
    flex: 1,
    paddingVertical: 8,
  },
  macroValue: {
    fontSize: 16,
    fontWeight: "700",
    color: "#007AFF",
    marginBottom: 4,
  },
  macroLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#000",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  macrosNote: {
    fontSize: 12,
    color: "#888",
    textAlign: "center",
    fontStyle: "italic",
  },
  servingModalButtons: {
    justifyContent: "center",
  },
  confirmButton: {
    backgroundColor: "#007AFF",
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 28,
    flex: 1,
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    textAlign: "center",
  },
});
