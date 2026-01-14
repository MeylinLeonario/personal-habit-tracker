import React, { useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { useHabits  } from "../../storage/habitsProvider"; // OJO: desde (tabs) son 2 niveles

export default function HomeScreen() {
  const [title, setTitle] = useState("");
  const router = useRouter();
  const { active, today, addHabit, toggleHabitToday, doneCount } = useHabits();

  return (
    <View style={styles.container}>
      <Text style={styles.h1}>Habit</Text>
      <Text style={styles.sub}>Hoy: {today} · Completados: {doneCount}/{active.length}</Text>

      <View style={styles.row}>
        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder="Nuevo hábito (ej: Agua)"
          style={styles.input}
          onSubmitEditing={() => {
            addHabit(title, "daily");
            setTitle("");
          }}
          returnKeyType="done"
        />
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => router.push("/add-habit")}>
          <Text style={styles.addText}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={active}
        keyExtractor={(h) => h.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => toggleHabitToday(item.id)}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardSub}>{item.frequency === "daily" ? "Diario" : "Semanal"}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={{ opacity: 0.6, padding: 16 }}>Crea tu primer hábito arriba ✨</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 48 },
  h1: { fontSize: 28, fontWeight: "800", paddingHorizontal: 16 },
  sub: { opacity: 0.6, paddingHorizontal: 16, marginTop: 4, marginBottom: 10 },
  row: { flexDirection: "row", gap: 10, paddingHorizontal: 16, paddingVertical: 10, alignItems: "center" },
  input: { flex: 1, borderWidth: 1, borderColor: "rgba(0,0,0,0.15)", borderRadius: 12, paddingHorizontal: 12, paddingVertical: 10 },
  addBtn: { width: 44, height: 44, borderRadius: 12, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: "rgba(0,0,0,0.15)" },
  addText: { fontSize: 22, fontWeight: "800" },
  card: { marginHorizontal: 16, marginVertical: 6, padding: 14, borderRadius: 16, borderWidth: 1, borderColor: "rgba(0,0,0,0.08)" },
  cardTitle: { fontSize: 16, fontWeight: "700" },
  cardSub: { marginTop: 2, opacity: 0.6, fontSize: 12 },
});
