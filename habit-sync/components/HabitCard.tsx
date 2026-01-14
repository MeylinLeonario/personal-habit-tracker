import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  title: string;
  subtitle?: string;
  doneToday: boolean;
  onToggleDone: () => void;
};

export default function HabitCard({
  title,
  subtitle,
  doneToday,
  onToggleDone,
}: Props) {
  const [toast, setToast] = useState("");

  useEffect(() => {
    if (!doneToday) return;
    setToast("Hecho. Un paso cuenta.");
    const t = setTimeout(() => setToast(""), 1400);
    return () => clearTimeout(t);
  }, [doneToday]);

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      {!!subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}

      <Pressable
        onPress={onToggleDone}
        style={({ pressed }) => [
          styles.button,
          doneToday && styles.buttonDone,
          pressed && { opacity: 0.9, transform: [{ scale: 0.99 }] },
        ]}
      >
        <Text style={[styles.buttonText, doneToday && styles.buttonTextDone]}>
          {doneToday ? "✓ Hecho hoy" : "Marcar como hecho"}
        </Text>
      </Pressable>

      {!!toast && <Text style={styles.toast}>{toast}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 18,
    padding: 18,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
    marginBottom: 14,
  },
  title: { fontSize: 22, fontWeight: "700", letterSpacing: -0.2 },
  subtitle: { marginTop: 6, fontSize: 15, opacity: 0.75 },
  button: {
    marginTop: 14,
    borderRadius: 999,
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: "#2F6E5B",
    alignItems: "center",
  },
  buttonDone: {
    backgroundColor: "#E9F3EF",
    borderWidth: 1,
    borderColor: "#CFE6DD",
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "700" },
  buttonTextDone: { color: "#2F6E5B" },
  toast: { marginTop: 12, fontSize: 14, opacity: 0.8 },
});
