export type HabitFrequency = "daily" | "weekly";

export type Habit = {
  id: string;
  title: string;
  frequency: HabitFrequency;
  completedDates: string[]; // YYYY-MM-DD local
  createdAt: string; // ISO
  archived?: boolean;

  daysOfWeek?: number[];

};
