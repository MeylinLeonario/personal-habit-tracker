import { View, Text, StyleSheet, Pressable } from "react-native";
import { useState } from "react";

export default function HomeScreen() {
  const [habits, setHabits] = useState<string[]>([
    "Tomar agua",
    "Estudiar ruso",
  ]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mis hábitos</Text>

      {habits.map((habit, index) => (
        <View key={index} style={styles.habitCard}>
          <Text style={styles.habitText}>⭕ {habit}</Text>
        </View>
      ))}

      <Pressable style={styles.addButton}>
        <Text style={styles.addButtonText}>＋</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "600",
    marginBottom: 24,
  },
  habitCard: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#F2F2F2",
    marginBottom: 12,
  },
  habitText: {
    fontSize: 18,
  },
  addButton: {
    position: "absolute",
    right: 24,
    bottom: 24,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#7C4DFF",
    alignItems: "center",
    justifyContent: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 32,
    lineHeight: 32,
  },
});
