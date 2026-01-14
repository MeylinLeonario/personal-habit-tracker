import AsyncStorage from "@react-native-async-storage/async-storage";
import { Habit } from "../models/Habit";

const KEY = "HABITS_V1";

export async function saveHabits(habits: Habit[]) {
  await AsyncStorage.setItem(KEY, JSON.stringify(habits));
}

export async function loadHabits(): Promise<Habit[]> {
  const raw = await AsyncStorage.getItem(KEY);
  return raw ? (JSON.parse(raw) as Habit[]) : [];
}
