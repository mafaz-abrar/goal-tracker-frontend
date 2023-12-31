export interface WeeklyEntry {
  activityId: number;
  activityName: string;
  goalId: number;
  goalName: string;
  targeting: boolean;
  weighting: number;

  mondayHours: string | null;
  tuesdayHours: string | null;
  wednesdayHours: string | null;
  thursdayHours: string | null;
  fridayHours: string | null;
  saturdayHours: string | null;
  sundayHours: string | null;
}
