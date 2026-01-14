import { View, Text, StyleSheet, Pressable, FlatList } from "react-native";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "expo-router";
import { Habit } from "../../models/Habit";
import { loadHabits, saveHabits } from "../../storage/habitStorage";

const todayStr = () => new Date().toISOString().slice(0, 10);
const newId = () => `${Date.now()}-${Math.random().toString(16).slice(2)}`;

export default function HomeScreen() {
  const router = useRouter();
  const [habits, setHabits] = useState<Habit[]>([]);
  const today = useMemo(() => todayStr(), []);

  // 1) cargar al abrir
  useEffect(() => {
    (async () => {
      const loaded = await loadHabits();

      // seed (solo si está vacío)
      if (loaded.length === 0) {
        const seed: Habit[] = [
          { id: newId(), title: "Tomar agua", createdAt: Date.now(), completedDates: [] },
          { id: newId(), title: "Estudiar ruso", createdAt: Date.now(), completedDates: [] },
        ];
        setHabits(seed);
        await saveHabits(seed);
        return;
      }

      setHabits(loaded);
    })();
  }, []);

  // 2) guardar cuando cambie
  useEffect(() => {
    if (habits.length > 0) saveHabits(habits);
  }, [habits]);

  const toggleToday = (id: string) => {
    setHabits((prev) =>
      prev.map((h) => {
        if (h.id !== id) return h;

        const done = h.completedDates.includes(today);
        return {
          ...h,
          completedDates: done
            ? h.completedDates.filter((d) => d !== today)
            : [...h.completedDates, today],
        };
      })
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mis hábitos</Text>

      <FlatList
        data={habits}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 100 }}
        renderItem={({ item }) => {
          const done = item.completedDates.includes(today);
          return (
            <Pressable
              onPress={() => toggleToday(item.id)}
              style={[styles.habitCard, done && styles.habitCardDone]}
            >
              <Text style={styles.habitText}>
                {done ? "✔️" : "⭕"} {item.title}
              </Text>
              <Text style={styles.subText}>{done ? "Hecho hoy" : "Pendiente hoy"}</Text>
            </Pressable>
          );
        }}
      />

      <Pressable style={styles.addButton} onPress={() => router.push("/add-habit")}>
        <Text style={styles.addButtonText}>＋</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: "#fff" },
  title: { fontSize: 28, fontWeight: "600", marginBottom: 16 },

  habitCard: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#F2F2F2",
    marginBottom: 12,
  },
  habitCardDone: {
    backgroundColor: "#E9E2FF",
  },
  habitText: { fontSize: 18, fontWeight: "500" },
  subText: { marginTop: 6, fontSize: 12, opacity: 0.6 },

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
  addButtonText: { color: "#fff", fontSize: 32, lineHeight: 32 },
});
