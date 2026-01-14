import React, { createContext, useContext, useMemo, useState } from "react";
import type { Habit, HabitFrequency } from "../models/Habit";
import { todayKey } from "../constants/date";

type HabitsContextValue = {
  habits: Habit[];
  active: Habit[];
  archived: Habit[];
  today: string;
  doneCount: number;
  addHabit: (title: string, frequency?: HabitFrequency) => void;
  toggleHabitToday: (habitId: string) => void;
  archiveHabit: (habitId: string) => void;
};

const HabitsContext = createContext<HabitsContextValue | null>(null);

const newId = () =>
  globalThis.crypto?.randomUUID?.() ??
  String(Date.now()) + Math.random().toString(16).slice(2);

function toggleDate(list: string[], date: string) {
  return list.includes(date) ? list.filter((d) => d !== date) : [...list, date];
}

export function HabitsProvider({ children }: { children: React.ReactNode }) {
  const [habits, setHabits] = useState<Habit[]>([]);

  const value = useMemo<HabitsContextValue>(() => {
    const today = todayKey();
    const active = habits.filter((h) => !h.archived);
    const archived = habits.filter((h) => h.archived);
    const doneCount = active.filter((h) => h.completedDates.includes(today)).length;

    return {
      habits,
      active,
      archived,
      today,
      doneCount,

      addHabit: (title, frequency = "daily") => {
        const t = title.trim();
        if (!t) return;

        const nowIso = new Date().toISOString();
        const habit: Habit = {
          id: newId(),
          title: t,
          frequency,
          completedDates: [],
          createdAt: nowIso,
          archived: false,
        };

        setHabits((prev) => [habit, ...prev]);
      },

      toggleHabitToday: (habitId) => {
        const t = todayKey();
        setHabits((prev) =>
          prev.map((h) =>
            h.id === habitId ? { ...h, completedDates: toggleDate(h.completedDates, t) } : h
          )
        );
      },

      archiveHabit: (habitId) => {
        setHabits((prev) => prev.map((h) => (h.id === habitId ? { ...h, archived: true } : h)));
      },
    };
  }, [habits]);

  return <HabitsContext.Provider value={value}>{children}</HabitsContext.Provider>;
}

export function useHabits() {
  const ctx = useContext(HabitsContext);
  if (!ctx) throw new Error("useHabits must be used within HabitsProvider");
  return ctx;
}
