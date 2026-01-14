import React from "react";
import { StyleSheet, Text, View } from "react-native";

type HeaderProps = {
  name: string;
};

export default function Header({ name }: HeaderProps) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.greeting}>Hola, {name}</Text>
      <Text style={styles.focus}>Hoy solo importa esto.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginTop: 8, marginBottom: 16 },
  greeting: { fontSize: 16, opacity: 0.75 },
  focus: { fontSize: 26, fontWeight: "700", marginTop: 6, letterSpacing: -0.2 },
});
