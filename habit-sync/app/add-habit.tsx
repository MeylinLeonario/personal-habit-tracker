import { View, Text, TextInput, StyleSheet, Pressable, Alert } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { useHabits } from "../storage/habitsProvider";

export default function AddHabitScreen() {
  const router = useRouter();
  const [title, setTitle] = useState("");

  const { addHabit } = useHabits();

  const onSave = () => {
    const clean = title.trim();
    if (!clean) {
      Alert.alert("Oops", "Escribe un nombre para el hábito.");
      return;
    }

    addHabit(clean, "daily"); // ✅ store maneja id, createdAt, etc.
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nuevo hábito</Text>

      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Ej: 10 min de estiramiento"
        style={styles.input}
        autoFocus
      />

      <Pressable style={styles.primaryButton} onPress={onSave}>
        <Text style={styles.primaryText}>Guardar</Text>
      </Pressable>

      <Pressable style={styles.secondaryButton} onPress={() => router.back()}>
        <Text style={styles.secondaryText}>Cancelar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "600", marginBottom: 16 },

  input: {
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    marginBottom: 16,
  },

  primaryButton: {
    backgroundColor: "#7C4DFF",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 10,
  },
  primaryText: { color: "#fff", fontSize: 16, fontWeight: "600" },

  secondaryButton: { padding: 14, borderRadius: 12, alignItems: "center" },
  secondaryText: { fontSize: 16, opacity: 0.7 },
});
