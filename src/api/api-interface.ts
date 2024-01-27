import camelcaseKeysDeep from 'camelcase-keys-deep';
import dayjs from 'dayjs';
import TimeSpent from './TimeSpent';
import { API_SERVER } from './config';

export type Goal = {
  goalId: number;
  goalName: string;
};

export type Activity = {
  activityId: number;
  goalId: number;
  activityName: string;
  targeting: boolean;
  weighting: number;
};

export type Entry = {
  entryId: number;
  date: Date;
  activityId: number;
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

export async function addNewEntry(entry: Entry) {
  const formData = new FormData();
  console.log(entry);

  formData.append('activity_id', entry.activityId.toString());
  // formData.append('activity_id', '2');
  // formData.append('date', '2024-01-19');
  // formData.append('task_description', 'From React');
  // formData.append('hours', '05:00:00');

  console.log(formData.get('activity_id'));
  const response = await fetch(
    `http://goal-tracker-backend/api/entry_process.php?mode=add`,
    {
      method: 'POST',
      body: formData,
    }
  );

  return await camelcaseKeysDeep(response.json());
}

export async function postActivity(activity: Activity) {}

export async function postGoal(goal: Goal) {}

export async function deleteEntry(entryId: number) {}

export async function deleteActivity(activityId: number) {}

export async function deleteGoal(goalId: number) {}
