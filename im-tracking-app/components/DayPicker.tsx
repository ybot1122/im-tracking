import React, { useState, useEffect } from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { ThemedText } from "./structure/ThemedText";
import { ThemedView } from "./structure/ThemedView";

function formatDate(date: Date) {
  // Format as "Mon, Jan 1, 2024"
  return date.toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function isToday(date: Date) {
  const today = new Date();
  return (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  );
}

interface DayPickerProps {
  onDateChange?: (date: Date) => void;
}

export function DayPicker({ onDateChange }: DayPickerProps) {
  const [selectedDate, setSelectedDate] = useState(() => {
    // Start with today's date (local time, no time component)
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate());
  });

  const changeDay = (delta: number) => {
    setSelectedDate((prev) => {
      const newDate = new Date(prev);
      newDate.setDate(prev.getDate() + delta);
      onDateChange?.(newDate);
      return newDate;
    });
  };

  const goToToday = () => {
    const now = new Date();
    const todayDate = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );
    setSelectedDate(todayDate);
    onDateChange?.(todayDate);
  };

  // Call onDateChange when component mounts with initial date
  useEffect(() => {
    onDateChange?.(selectedDate);
  }, []);

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.dateRow}>
        <TouchableOpacity
          onPress={() => changeDay(-1)}
          style={styles.arrowButton}
          accessibilityLabel="Previous day"
        >
          <ThemedText style={styles.arrowText}>{"‹"}</ThemedText>
        </TouchableOpacity>

        <ThemedText style={styles.dateText}>
          {formatDate(selectedDate)}
        </ThemedText>

        <TouchableOpacity
          onPress={() => changeDay(1)}
          style={styles.arrowButton}
          accessibilityLabel="Next day"
        >
          <ThemedText style={styles.arrowText}>{"›"}</ThemedText>
        </TouchableOpacity>
      </ThemedView>

      {!isToday(selectedDate) && (
        <TouchableOpacity
          onPress={goToToday}
          style={styles.todayButton}
          accessibilityLabel="Go to today"
        >
          <ThemedText style={styles.todayButtonText}>Go to Today</ThemedText>
        </TouchableOpacity>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column", // Changed from "row" to "column"
    alignItems: "center",
    justifyContent: "center",
    gap: 0,
    paddingVertical: 0,
  },
  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },
  arrowButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
  },
  arrowText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  todayButton: {
    paddingHorizontal: 12,
    paddingVertical: 0,
    borderRadius: 16,
    backgroundColor: "#007AFF",
  },
  todayButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  dateText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#222",
    minWidth: 160,
    textAlign: "center",
  },
});

export default DayPicker;
