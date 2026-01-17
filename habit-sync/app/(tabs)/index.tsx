import React, { useState } from "react";
import { Alert, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { useHabits } from "../../storage/habitsProvider"; // OJO: desde (tabs) son 2 niveles

export default function HomeScreen() {
  const [title, setTitle] = useState("");
  const router = useRouter();
  const { active, today, addHabit, toggleHabitToday, doneCount, getStreak, deleteHabit } = useHabits();
  

  return (
    <View style={styles.container}>
      <Text style={styles.h1}>Habit</Text>
      <Text style={styles.sub}>Hoy: {today} · Completados: {doneCount}/{active.length}</Text>

      <TouchableOpacity
        style={styles.primaryBtn}
        onPress={() => router.push("/add-habit")}
      >
        <Text style={styles.primaryBtnText}>+ Agregar hábito</Text>
      </TouchableOpacity>

      <FlatList
        data={active}
        keyExtractor={(h) => h.id}
        renderItem={({ item }) => {
          const done = item.completedDates.includes(today);
          const streak = getStreak(item);

          return (
            <TouchableOpacity
              style={[
                styles.card,
                done && styles.cardDone,
              ]}
              onPress={() => toggleHabitToday(item.id)}
              onLongPress={() => {
                Alert.alert(
                  "Eliminar hábito",
                  `¿Eliminar "${item.title}"?`,
                  [
                    { text: "Cancelar", style: "cancel" },
                    { text: "Eliminar", style: "destructive", onPress: () => deleteHabit(item.id) },
                  ]
                );
              }}
            >
              <Text
                style={[
                  styles.cardTitle,
                  done && styles.cardTitleDone,
                ]}
              >
                {item.title}
              </Text>

              <Text style={styles.cardSub}>
                {done ? "🌱 Completado hoy" : "Toca para marcar"}
              </Text>

              <Text style={styles.streak}>
                🔥 Racha: {streak} {streak === 1 ? "día" : "días"}
              </Text>
            </TouchableOpacity>
          );
        }}
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
  cardDone: { backgroundColor: "rgba(76, 175, 80, 0.12)", borderColor: "rgba(76, 175, 80, 0.4)",},
  cardTitleDone: { textDecorationLine: "line-through", opacity: 0.7,},
  streak: { marginTop: 6, fontSize: 12, opacity: 0.75 },
  primaryBtn: {
  marginHorizontal: 16,
  marginVertical: 12,
  paddingVertical: 14,
  borderRadius: 14,
  alignItems: "center",
  justifyContent: "center",
  borderWidth: 1,
  borderColor: "rgba(0,0,0,0.12)",
},
primaryBtnText: {
  fontSize: 16,
  fontWeight: "800",
},

});
