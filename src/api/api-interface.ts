import camelcaseKeysDeep from 'camelcase-keys-deep';

const API_SERVER = new URL('http://goal-tracker-backend');

export interface Entry {
  entryId: number;
  date: string; // pushed from backend as string
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

// The backend may not push hour variables for hours that don't have entries, instead of pushing ''
// for those hours.
export interface WeeklyEntry {
  activityId: number;
  activityName: string;
  goalId: number;
  goalName: string;
  targeting: boolean;
  weighting: number;

  mondayHours?: string;
  tuesdayHours?: string;
  wednesdayHours?: string;
  thursdayHours?: string;
  fridayHours?: string;
  saturdayHours?: string;
  sundayHours?: string;
}

export interface EntryWithActivity {
  activityName: string;
  taskDescription: string;
  date: string;
  hoursSpent: string;
  startTime: string;
  endTime: string;
}

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
