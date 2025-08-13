import { View, Text, StyleSheet } from "react-native";

const SODIUM = 1800; // mg
const SODIUM_GOAL = 2300; // mg

const PROTEIN = 90; // g
const PROTEIN_GOAL = 120; // g

const CALORIES = 1850; // kcal
const CALORIES_GOAL = 2200; // kcal

function getPercent(current: number, goal: number) {
  return Math.min(100, Math.round((current / goal) * 100));
}

export function MacrosOverview() {
  return (
    <View style={styles.container}>
      <MacroRow label="Sodium" value={SODIUM} goal={SODIUM_GOAL} unit="mg" />
      <MacroRow label="Protein" value={PROTEIN} goal={PROTEIN_GOAL} unit="g" />
      <MacroRow
        label="Calories"
        value={CALORIES}
        goal={CALORIES_GOAL}
        unit="kcal"
      />
    </View>
  );
}

function MacroRow({
  label,
  value,
  goal,
  unit,
}: {
  label: string;
  value: number;
  goal: number;
  unit: string;
}) {
  const percent = getPercent(value, goal);
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.values}>
        <Text style={styles.value}>
          {value} / {goal} {unit}
        </Text>
        <Text style={styles.percent}>{percent}%</Text>
      </View>
      <View style={styles.progressBarBackground}>
        <View style={[styles.progressBarFill, { width: `${percent}%` }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 18,
    padding: 16,
    backgroundColor: "transparent",
  },
  row: {
    marginBottom: 8,
  },
  label: {
    fontWeight: "600",
    fontSize: 16,
    marginBottom: 2,
    color: "#333",
  },
  values: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  value: {
    fontSize: 15,
    color: "#444",
  },
  percent: {
    fontSize: 15,
    color: "#888",
    fontWeight: "500",
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: "#e0e0e0",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressBarFill: {
    height: 8,
    backgroundColor: "#4f8cff",
    borderRadius: 4,
  },
});

export default MacrosOverview;
