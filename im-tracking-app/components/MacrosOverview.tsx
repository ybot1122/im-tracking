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
      <View style={styles.circlesRow}>
        <MacroCircle
          label="Sodium"
          value={SODIUM}
          goal={SODIUM_GOAL}
          unit="mg"
        />
        <MacroCircle
          label="Protein"
          value={PROTEIN}
          goal={PROTEIN_GOAL}
          unit="g"
        />
        <MacroCircle
          label="Calories"
          value={CALORIES}
          goal={CALORIES_GOAL}
          unit="kcal"
        />
      </View>
    </View>
  );
}

function MacroCircle({
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
    <View style={styles.circleContainer}>
      <View style={styles.circle}>
        <Text style={styles.circleValue}>
          {value} / {goal}
        </Text>
        <Text style={styles.circleUnit}>{unit}</Text>
      </View>
      <Text style={styles.circleLabel}>{label}</Text>
      <Text style={styles.circlePercent}>{percent}%</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "transparent",
  },
  circlesRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  circleContainer: {
    alignItems: "center",
    flex: 1,
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 60,
    backgroundColor: "#4f8cff",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  circleValue: {
    fontSize: 12,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  circleUnit: {
    fontSize: 12,
    color: "white",
    textAlign: "center",
    marginTop: 2,
  },
  circleLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
    marginBottom: 4,
  },
  circlePercent: {
    fontSize: 12,
    color: "#888",
    fontWeight: "500",
    textAlign: "center",
  },
});

export default MacrosOverview;
