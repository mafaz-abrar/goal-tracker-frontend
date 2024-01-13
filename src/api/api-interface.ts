import camelcaseKeysDeep from 'camelcase-keys-deep';
import dayjs from 'dayjs';
import TimeSpent from './TimeSpent';
import { API_SERVER } from './config';

export type Id = number | null; // This way, Id can be used for both insert and update.

export type Goal = {
  goalId: Id;
  goalName: string;
};

export type Activity = {
  activityId: Id;
  goalId: number; // Can't be an Id, since Id can be null.
  activityName: string;
  targeting: boolean;
  weighting: number;
};

export type Entry = {
  entryId: Id;
  date: Date;
  activityId: number; // Can't be an Id, since Id can be null.
  taskDescription: string;
  timeSpent: TimeSpent;
  startTime: Date | null;
  endTime: Date | null;
};

export type GoalWithActivities = {
  goal: Goal;
  activities: Activity[];
};

export type ExpandedEntry = {
  goalName: string;
  activityName: string;
  entry: Entry;
};

export type DayWithExpandedEntries = {
  date: Date; // Included for ease of access by developer.
  expandedEntries: ExpandedEntry[];
};

export type WeeklyEntry = {
  goalName: string;
  activity: Activity;

  mondayHours: TimeSpent;
  tuesdayHours: TimeSpent;
  wednesdayHours: TimeSpent;
  thursdayHours: TimeSpent;
  fridayHours: TimeSpent;
  saturdayHours: TimeSpent;
  sundayHours: TimeSpent;
};

export async function getWeeklyEntriesForDate(
  date: Date
): Promise<WeeklyEntry[]> {
  const response = await fetch(
    new URL(
      API_SERVER,
      `/api/get_weekly_entries_for_date.php?date=${dayjs(date).format(
        'YYYY-MM-DD'
      )}`
    ).href
  );
  return camelcaseKeysDeep(await response.json());
}

export async function getAllGoalsAndActivities(): Promise<
  GoalWithActivities[]
> {
  const response = await fetch(
    new URL(API_SERVER, '/api/get_all_goals_and_activities.php').href
  );
  return camelcaseKeysDeep(await response.json());
}

export async function getAllEntriesForDate(date: Date): Promise<Entry[]> {
  const response = await fetch(
    new URL(
      API_SERVER,
      `/api/get_all_entries_for_date.php?date=${dayjs(date).format(
        'YYYY-MM-DD'
      )}`
    ).href
  );
  return camelcaseKeysDeep(await response.json());
}

export async function getAllEntriesForActivity(
  activityId: number
): Promise<Entry[]> {
  const response = await fetch(
    new URL(
      API_SERVER,
      `/api/get_all_entries_for_activity.php?activity_id=${activityId}`
    ).href
  );
  return camelcaseKeysDeep(await response.json());
}

export async function postEntry(entry: Entry) {}

export async function postActivity(activity: Activity) {}

export async function postGoal(goal: Goal) {}

export async function deleteEntry(entryId: Id) {}

export async function deleteActivity(activityId: Id) {}

export async function deleteGoal(goalId: Id) {}
