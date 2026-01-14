import { useMemo, useState } from "react";
import type { Habit, HabitFrequency } from "../models/Habit";
import { todayKey } from "../constants/date";

const newId = () =>
  globalThis.crypto?.randomUUID?.() ??
  String(Date.now()) + Math.random().toString(16).slice(2);

function toggleDate(list: string[], date: string) {
  return list.includes(date) ? list.filter((d) => d !== date) : [...list, date];
}

export function useHabitsStore() {
  const [habits, setHabits] = useState<Habit[]>([]);

  const actions = useMemo(
    () => ({
      addHabit: (title: string, frequency: HabitFrequency = "daily") => {
        const t = title.trim();
        if (!t) return;

        const now = new Date().toISOString();
        const habit: Habit = {
          id: newId(),
          title: t,
          frequency,
          completedDates: [],
          createdAt: now,
          archived: false,
        };

        setHabits((prev) => [habit, ...prev]);
      },

      toggleHabitToday: (habitId: string) => {
        const t = todayKey();
        setHabits((prev) =>
          prev.map((h) =>
            h.id === habitId
              ? { ...h, completedDates: toggleDate(h.completedDates, t) }
              : h
          )
        );
      },

      archiveHabit: (habitId: string) => {
        setHabits((prev) =>
          prev.map((h) => (h.id === habitId ? { ...h, archived: true } : h))
        );
      },
    }),
    []
  );

  const derived = useMemo(() => {
    const t = todayKey();
    const active = habits.filter((h) => !h.archived);
    const archived = habits.filter((h) => h.archived);
    const doneCount = active.filter((h) => h.completedDates.includes(t)).length;
    return { today: t, active, archived, doneCount };
  }, [habits]);

  return { habits, ...derived, ...actions };
}
