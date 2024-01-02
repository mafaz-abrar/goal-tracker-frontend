import camelcaseKeysDeep from 'camelcase-keys-deep';

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

export interface Entry {
  entryId: number;
  date: Date;
  activityId: number;
  taskDescription: string;
  hoursSpent: string; // pushed from backend as string
  startTime: string; // pushed from backend as string
  endTime: string; // pushed from backend as string
}

export interface Activity {
  activityId: number;
  goalId: number;
  activityName: string;
  targeting: boolean;
  weighting: number;
}

export interface Goal {
  goalId: number;
  goalName: string;
  activities: Activity[];
}

const API_SERVER = new URL('http://goal-tracker-backend');

export async function getWeeklyEntries(): Promise<WeeklyEntry[]> {
  const response = await fetch(
    new URL(API_SERVER, '/api/get_weekly_entries.php').href
  );
  return camelcaseKeysDeep(await response.json());
}

export async function getAllGoalsAndActivities(): Promise<Goal[]> {
  const response = await fetch(
    new URL(API_SERVER, '/api/get_all_goals_and_activities.php').href
  );
  return camelcaseKeysDeep(await response.json());
}

export async function getAllEntriesByDate(date: Date): Promise<Entry[]> {
  const formData = new FormData();
  formData.append('date', date.toISOString().slice(0, 10));

  const response = await fetch(
    new URL(API_SERVER, '/api/get_all_entries_by_date.php').href,
    {
      method: 'post',
      body: formData,
    }
  );
  return camelcaseKeysDeep(await response.json());
}

export async function getAllEntriesForActivity(
  activityId: number
): Promise<Entry[]> {
  const formData = new FormData();
  formData.append('activity_id', activityId.toString());

  const response = await fetch(
    new URL(API_SERVER, '/api/get_all_entries_for_activity.php').href,
    {
      method: 'post',
      body: formData,
    }
  );
  return camelcaseKeysDeep(await response.json());
}
