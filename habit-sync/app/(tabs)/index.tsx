import React, { useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";

import Header from "../../components/Header";
import HabitCard from "../../components/HabitCard";
import SyncStatus from "../../components/SyncStatus";
import StreakInfo from "../../components/StreakInfo";

type SyncMode = "paired" | "solo";

export default function HomeScreen() {
  const [doneToday, setDoneToday] = useState(false);

  const [syncMode, setSyncMode] = useState<SyncMode>("paired"); // 👈 cambio
  const partnerDone = true;

  const statusText = useMemo(() => {
    if (syncMode === "solo") return "Modo personal activado";
    return partnerDone ? "Tu persona ya marcó hoy 🌱" : "Van juntas esta semana";
  }, [syncMode, partnerDone]);

  return (
    <View style={styles.container}>
      <Header name="Mey" />

      <HabitCard
        title="Mover mi cuerpo"
        subtitle="Aunque sea 5 minutos."
        doneToday={doneToday}
        onToggleDone={() => setDoneToday((p) => !p)}
      />

      <SyncStatus text={statusText} />

      <View style={{ flex: 1 }} />

      <StreakInfo text="3 días seguidos" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAF7F2",
    paddingHorizontal: 18,
    paddingTop: 10,
    paddingBottom: 18,
  },
});
