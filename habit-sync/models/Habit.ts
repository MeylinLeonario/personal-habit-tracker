export interface Habit {
  id: string;
  title: string;
  createdAt: number;
  completedDates: string[]; // "YYYY-MM-DD"
}
