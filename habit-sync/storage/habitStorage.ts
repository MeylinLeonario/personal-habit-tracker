import AsyncStorage from "@react-native-async-storage/async-storage";

const HABITS_KEY = "@habits";

export async function loadHabits() {
  const raw = await AsyncStorage.getItem(HABITS_KEY);
  return raw ? JSON.parse(raw) : [];
}

export async function persistHabits(habits: any[]) {
  await AsyncStorage.setItem(HABITS_KEY, JSON.stringify(habits));
}
