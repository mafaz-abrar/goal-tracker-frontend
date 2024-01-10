import camelcaseKeysDeep from 'camelcase-keys-deep';
import { TimeSpent } from './TimeSpent';

const API_SERVER = new URL('http://goal-tracker-backend');

export type Id = number | null;

// The start time and end time, though nullable, should be sent as empty strings (?)
export type Entry = {
  entryId: Id;
  date: Date;
  activityId: number;
  taskDescription: string;
  timeSpent: TimeSpent;
  startTime: Date;
  endTime: Date;
};

export type Activity = {
  activityId: Id;
  goalId: number;
  activityName: string;
  targeting: boolean;
  weighting: number;
};

export type Goal = {
  goalId: Id;
  goalName: string;
};

export type GoalWithActivities = {
  goalId: number;
  goalName: string;
  activities: Activity[];
};

export type ExpandedEntry = {
  goal: Goal;
  activity: Activity;
  entry: Entry;
};

export type DayWithExpandedEntries = {
  date: Date;
  entries: ExpandedEntry[];
};

// The backend will not push hour variables for hours that don't have entries, instead of pushing ''
// for those hours.
export type ExpandedEntryWithWeeklyHours = {
  expandedEntry: ExpandedEntry;

  mondayHours: TimeSpent;
  tuesdayHours: TimeSpent;
  wednesdayHours: TimeSpent;
  thursdayHours: TimeSpent;
  fridayHours: TimeSpent;
  saturdayHours: TimeSpent;
  sundayHours: TimeSpent;
};

export async function getWeeklyEntries(): Promise<
  ExpandedEntryWithWeeklyHours[]
> {
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

export async function createNewEntry(entry: Entry) {}
