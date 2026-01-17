import { View, Text, TextInput, StyleSheet, Pressable, Alert } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { useHabits } from "../storage/habitsProvider";

const DAYS = [
  { label: "Dom", value: 0 },
  { label: "Lun", value: 1 },
  { label: "Mar", value: 2 },
  { label: "Mié", value: 3 },
  { label: "Jue", value: 4 },
  { label: "Vie", value: 5 },
  { label: "Sáb", value: 6 },
];

export default function AddHabitScreen() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [frequency, setFrequency] = useState<"daily" | "weekly">("daily");
  const [daysOfWeek, setDaysOfWeek] = useState<number[]>([1, 2, 3, 4, 5]); // Lun-Vie por defecto

  const { addHabit } = useHabits();

  const toggleDay = (day: number) => {
    setDaysOfWeek((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day].sort((a, b) => a - b)
    );
  };

  const onSave = () => {
    const clean = title.trim();
    if (!clean) {
      Alert.alert("Oops", "Escribe un nombre para el hábito.");
      return;
    }

    if (frequency === "weekly" && daysOfWeek.length === 0) {
      Alert.alert("Faltan días", "Elige al menos un día para un hábito semanal.");
      return;
    }

    addHabit(clean, frequency, frequency === "weekly" ? daysOfWeek : undefined);
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

      {/* ✅ FRECUENCIA */}
      <Text style={styles.label}>Frecuencia</Text>

      <View style={styles.row}>
        <Pressable
          onPress={() => setFrequency("daily")}
          style={[styles.pill, frequency === "daily" && styles.pillActive]}
        >
          <Text style={[styles.pillText, frequency === "daily" && styles.pillTextActive]}>
            Diario
          </Text>
        </Pressable>

        <Pressable
          onPress={() => setFrequency("weekly")}
          style={[styles.pill, frequency === "weekly" && styles.pillActive]}
        >
          <Text style={[styles.pillText, frequency === "weekly" && styles.pillTextActive]}>
            Semanal
          </Text>
        </Pressable>
      </View>

      {/* ✅ DÍAS (solo si es semanal) */}
      {frequency === "weekly" && (
        <>
          <Text style={styles.label}>Días de la semana</Text>

          <View style={styles.daysRow}>
            {DAYS.map((d) => {
              const selected = daysOfWeek.includes(d.value);
              return (
                <Pressable
                  key={d.value}
                  onPress={() => toggleDay(d.value)}
                  style={[styles.day, selected && styles.dayActive]}
                >
                  <Text style={[styles.dayText, selected && styles.dayTextActive]}>
                    {d.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          <Text style={styles.hint}>Elige 1+ días. Ej: Lun/Mié/Vie.</Text>
        </>
      )}

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

  // ✅ estilos para Frecuencia / Días
  label: { marginTop: 4, marginBottom: 8, fontWeight: "700", opacity: 0.8 },
  row: { flexDirection: "row", gap: 10, marginBottom: 16 },

  pill: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#DDD",
  },
  pillActive: { borderColor: "#7C4DFF" },
  pillText: { fontWeight: "700", opacity: 0.7 },
  pillTextActive: { opacity: 1, color: "#7C4DFF" },

  daysRow: { flexDirection: "row", flexWrap: "wrap", gap: 10, marginBottom: 10 },
  day: {
    width: 46,
    height: 46,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#DDD",
  },
  dayActive: { borderColor: "#7C4DFF", backgroundColor: "rgba(124, 77, 255, 0.12)" },
  dayText: { fontWeight: "800", opacity: 0.7 },
  dayTextActive: { opacity: 1, color: "#7C4DFF" },

  hint: { marginBottom: 16, opacity: 0.6 },

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
