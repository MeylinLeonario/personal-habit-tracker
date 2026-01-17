import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/es";
import { loadHabits, persistHabits } from "./habitStorage";

dayjs.locale("es");

export type Frequency = "daily" | "weekly";

export type Habit = {
  id: string;
  title: string;
  frequency: Frequency;
  createdAt: string;
  completedDates: string[]; // "YYYY-MM-DD"
  archived?: boolean;
  daysOfWeek?: number[];
};

type HabitsContextValue = {
  habits: Habit[];
  active: Habit[];
  today: string;
  doneCount: number;
  addHabit: (title: string, frequency: Frequency, daysOfWeek?: number[]) => void;
  toggleHabitToday: (habitId: string) => void;
  archiveHabit?: (habitId: string) => void; // opcional
  getStreak: (habit: Habit) => number;
  deleteHabit: (habitId: string) => void;

};

const HabitsContext = createContext<HabitsContextValue | null>(null);

const todayKey = () => dayjs().format("YYYY-MM-DD");
const newId = () => (globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(16).slice(2)}`);

export function HabitsProvider({ children }: { children: React.ReactNode }) {
  const [habits, setHabits] = useState<Habit[]>([]);

  // Cargar al iniciar
  useEffect(() => {
    (async () => {
      const saved = await loadHabits();
      setHabits(saved);
    })();
  }, []);

  // Persistir cada vez que cambian
  useEffect(() => {
    persistHabits(habits);
  }, [habits]);

  const today = useMemo(() => todayKey(), []);

  const active = useMemo(
    () => habits.filter((h) => !h.archived),
    [habits]
  );

  const doneCount = useMemo(() => {
    return active.filter((h) => h.completedDates.includes(today)).length;
  }, [active, today]);

  function addHabit(title: string, frequency: Frequency, daysOfWeek?: number[]) {
  const t = title.trim();
  if (!t) return;

  const now = new Date().toISOString();

  const habit: Habit = {
    id: newId(),
    title: t,
    frequency,
    createdAt: now,
    completedDates: [],
    archived: false,
    daysOfWeek: frequency === "weekly" ? (daysOfWeek ?? []) : undefined,
  };

  setHabits((prev) => [habit, ...prev]);
}


  function toggleHabitToday(habitId: string) {
    const t = todayKey();

    setHabits((prev) =>
      prev.map((h) => {
        if (h.id !== habitId) return h;

        const done = h.completedDates.includes(t);
        return {
          ...h,
          completedDates: done
            ? h.completedDates.filter((d) => d !== t)
            : [...h.completedDates, t],
        };
      })
    );
  }

  function archiveHabit(habitId: string) {
    setHabits((prev) => prev.map((h) => (h.id === habitId ? { ...h, archived: true } : h)));
  }

  const value: HabitsContextValue = {
    habits,
    active,
    today,
    doneCount,
    addHabit,
    toggleHabitToday,
    archiveHabit,
    getStreak: (habit) => streakFromDates(habit.completedDates),
    deleteHabit: (habitId) => setHabits((prev) => prev.filter((h) => h.id !== habitId)),

  };

  return <HabitsContext.Provider value={value}>{children}</HabitsContext.Provider>;
}

export function useHabits() {
  const ctx = useContext(HabitsContext);
  if (!ctx) throw new Error("useHabits must be used inside <HabitsProvider>");
  return ctx;
}

function streakFromDates(completedDates: string[]) {
  const set = new Set(completedDates);
  let streak = 0;

  // hoy en formato YYYY-MM-DD
  let cursor = new Date();
  const toKey = (d: Date) => d.toISOString().slice(0, 10);

  // contamos hacia atrás: hoy, ayer, anteayer...
  while (set.has(toKey(cursor))) {
    streak++;
    cursor.setDate(cursor.getDate() - 1);
  }

  return streak;
}
