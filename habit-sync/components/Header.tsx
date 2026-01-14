import React from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";

type HeaderProps = {
  name: string;
  onAdd?: () => void;
};

export default function Header({ name, onAdd }: HeaderProps) {
  return (
    <View style={styles.wrap}>
      <View style={styles.row}>
        <View style={{ flex: 1 }}>
          <Text style={styles.greeting}>Hola, {name}</Text>
          <Text style={styles.focus}>DEBUGG 777.</Text>
        </View>

        {onAdd ? (
          <Pressable onPress={onAdd} style={styles.addBtn}>
            <Text style={styles.addText}>+</Text>
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginTop: 8, marginBottom: 16 },
  row: { flexDirection: "row", alignItems: "center", gap: 12 },
  greeting: { fontSize: 16, opacity: 0.75 },
  focus: { fontSize: 26, fontWeight: "700", marginTop: 6, letterSpacing: -0.2 },
  addBtn: {
    width: 40,
    height: 40,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.12)",
  },
  addText: { fontSize: 24, fontWeight: "800" },
});
