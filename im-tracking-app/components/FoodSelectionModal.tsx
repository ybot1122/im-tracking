import { TouchableOpacity, Modal, Pressable, StyleSheet } from "react-native";
import { ThemedView } from "./structure/ThemedView";
import { ThemedText } from "./structure/ThemedText";

export default function FoodSelectionModal({
  isVisible,
  onRequestClose,
}: {
  isVisible: boolean;
  onRequestClose: (val: boolean) => void;
}) {
  return (
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
            <ThemedText style={styles.modalTitle}>Choose Food Item</ThemedText>
            <TouchableOpacity
              onPress={() => onRequestClose(false)}
              style={styles.closeButton}
            >
              <ThemedText style={styles.closeButtonText}>×</ThemedText>
            </TouchableOpacity>
          </ThemedView>
        </ThemedView>
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
});
