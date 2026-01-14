import React from "react";
import { StyleSheet, Text, View } from "react-native";

type Props = { text?: string };

export default function SyncStatus({ text }: Props) {
  if (!text) return null;
  return (
    <View style={styles.wrap}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingHorizontal: 6, marginBottom: 10 },
  text: { fontSize: 14, opacity: 0.75 },
});
